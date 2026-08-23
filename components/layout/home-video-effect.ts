import * as THREE from "three";

const GRID_SIZE = 25;
const MOUSE_RADIUS = 0.25;
const STRENGTH = 0.1;
const RELAXATION = 0.925;
const POINTER_RELAXATION = 0.9;
const DISPLACEMENT = 0.015;
const ABERRATION = 0.15;
const MAX_PIXEL_RATIO = 1.5;
const MAX_RENDER_FPS = 30;
const REFERENCE_FRAME_DURATION_MS = 1000 / 60;
const MIN_RENDER_INTERVAL_MS = 1000 / MAX_RENDER_FPS;
const MAX_FRAME_DELTA_MS = 100;
const FRAME_INTERVAL_TOLERANCE_MS = 1;

const VERTEX_SHADER = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uTexture;
  uniform sampler2D uDataTexture;
  varying vec2 vUv;

  void main() {
    vec4 offset = texture2D(uDataTexture, vUv);
    vec2 shift = ${DISPLACEMENT} * offset.rg;
    vec2 split = shift * ${ABERRATION};

    float red = texture2D(uTexture, vUv - shift + split).r;
    float green = texture2D(uTexture, vUv - shift).g;
    float blue = texture2D(uTexture, vUv - shift - split).b;

    gl_FragColor = vec4(red, green, blue, 1.0);
  }
`;

type DisplacementField = {
  columns: number;
  data: Float32Array;
  rows: number;
  texture: THREE.DataTexture;
};

type PixelatedVideoEffectOptions = {
  container: HTMLDivElement;
  video: HTMLVideoElement;
};

function createDisplacementField(width: number, height: number) {
  const aspect = width / height;
  const columns = aspect >= 1 ? Math.round(GRID_SIZE * aspect) : GRID_SIZE;
  const rows = aspect >= 1 ? GRID_SIZE : Math.round(GRID_SIZE / aspect);
  const data = new Float32Array(columns * rows * 4);
  const texture = new THREE.DataTexture(
    data,
    columns,
    rows,
    THREE.RGBAFormat,
    THREE.FloatType,
  );

  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return { columns, data, rows, texture } satisfies DisplacementField;
}

export function mountPixelatedVideoEffect({
  container,
  video,
}: PixelatedVideoEffectOptions) {
  let width = Math.max(1, container.clientWidth);
  let height = Math.max(1, container.clientHeight);
  let field = createDisplacementField(width, height);
  let hasRenderedFrame = false;
  let isRendering = false;
  let videoFrameRequestId: number | null = null;
  let animationFrameRequestId: number | null = null;
  let lastRenderedAt = Number.NEGATIVE_INFINITY;

  const initialRect = container.getBoundingClientRect();
  let isInViewport =
    initialRect.bottom > 0 &&
    initialRect.right > 0 &&
    initialRect.top < window.innerHeight &&
    initialRect.left < window.innerWidth;

  const pointer = {
    initialized: false,
    velocityX: 0,
    velocityY: 0,
    lastMovedAt: 0,
    x: 0.5,
    y: 0.5,
  };

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: false,
    powerPreference: "default",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setSize(width, height, false);
  renderer.domElement.className = "home-video-effect-canvas";
  container.appendChild(renderer.domElement);

  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.colorSpace = THREE.SRGBColorSpace;
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.generateMipmaps = false;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uDataTexture: { value: field.texture },
      uTexture: { value: videoTexture },
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
  });

  function getCoverScale() {
    const videoAspect =
      (video.videoWidth || 16) / Math.max(1, video.videoHeight || 9);
    const containerAspect = width / height;
    const scaleX =
      containerAspect < videoAspect ? videoAspect / containerAspect : 1;
    const scaleY =
      containerAspect > videoAspect ? containerAspect / videoAspect : 1;

    return [2 * scaleX, 2 * scaleY] as const;
  }

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(...getCoverScale()),
    material,
  );
  scene.add(mesh);

  function handlePointerMove(event: PointerEvent) {
    const rect = container.getBoundingClientRect();

    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      return;
    }

    const nextX = (event.clientX - rect.left) / rect.width;
    const nextY = (event.clientY - rect.top) / rect.height;

    if (!pointer.initialized) {
      pointer.initialized = true;
      pointer.lastMovedAt = event.timeStamp;
      pointer.x = nextX;
      pointer.y = nextY;
      return;
    }

    const elapsedSincePointerMove = Math.min(
      MAX_FRAME_DELTA_MS,
      Math.max(1, event.timeStamp - pointer.lastMovedAt),
    );
    const velocityScale =
      REFERENCE_FRAME_DURATION_MS / elapsedSincePointerMove;

    pointer.velocityX = (nextX - pointer.x) * velocityScale;
    pointer.velocityY = (nextY - pointer.y) * velocityScale;
    pointer.lastMovedAt = event.timeStamp;
    pointer.x = nextX;
    pointer.y = nextY;
  }

  function updateDisplacementField(elapsedMs: number) {
    const { columns, data, rows, texture } = field;
    const frameScale =
      Math.min(MAX_FRAME_DELTA_MS, Math.max(0, elapsedMs)) /
      REFERENCE_FRAME_DURATION_MS;
    const displacementRelaxation = RELAXATION ** frameScale;
    const pointerRelaxation = POINTER_RELAXATION ** frameScale;
    const injectionScale =
      (displacementRelaxation - pointerRelaxation) /
      (RELAXATION - POINTER_RELAXATION);

    for (let index = 0; index < data.length; index += 4) {
      data[index] *= displacementRelaxation;
      data[index + 1] *= displacementRelaxation;
    }

    if (pointer.initialized) {
      const pointerColumn = columns * pointer.x;
      const pointerRow = rows * (1 - pointer.y);
      const maxDistance = GRID_SIZE * MOUSE_RADIUS;
      const maxDistanceSquared = maxDistance * maxDistance;

      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          const distanceSquared =
            (pointerColumn - column) ** 2 + (pointerRow - row) ** 2;

          if (distanceSquared >= maxDistanceSquared) continue;

          const dataIndex = 4 * (column + columns * row);
          const power = Math.min(
            10,
            maxDistance / Math.sqrt(distanceSquared),
          );

          data[dataIndex] +=
            STRENGTH * 100 * pointer.velocityX * power * injectionScale;
          data[dataIndex + 1] -=
            STRENGTH * 100 * pointer.velocityY * power * injectionScale;
        }
      }
    }

    pointer.velocityX *= pointerRelaxation;
    pointer.velocityY *= pointerRelaxation;
    texture.needsUpdate = true;
  }

  function renderFrame(now: number, force = false) {
    const elapsedSinceRender = now - lastRenderedAt;

    if (
      !force &&
      Number.isFinite(lastRenderedAt) &&
      elapsedSinceRender <
        MIN_RENDER_INTERVAL_MS - FRAME_INTERVAL_TOLERANCE_MS
    ) {
      return;
    }

    const elapsedMs = Number.isFinite(lastRenderedAt)
      ? elapsedSinceRender
      : REFERENCE_FRAME_DURATION_MS;
    lastRenderedAt = now;

    updateDisplacementField(elapsedMs);
    renderer.render(scene, camera);

    if (!hasRenderedFrame) {
      hasRenderedFrame = true;
      renderer.domElement.dataset.ready = "true";
    }
  }

  function scheduleNextFrame() {
    if (!isRendering) return;

    if (typeof video.requestVideoFrameCallback === "function") {
      videoFrameRequestId = video.requestVideoFrameCallback((now) => {
        videoFrameRequestId = null;
        if (!isRendering) return;

        renderFrame(now);
        scheduleNextFrame();
      });
      return;
    }

    animationFrameRequestId = window.requestAnimationFrame((now) => {
      animationFrameRequestId = null;
      if (!isRendering) return;

      renderFrame(now);
      scheduleNextFrame();
    });
  }

  function startRendering() {
    if (isRendering || document.hidden || !isInViewport) return;

    isRendering = true;
    lastRenderedAt = Number.NEGATIVE_INFINITY;
    scheduleNextFrame();
  }

  function stopRendering() {
    isRendering = false;

    if (videoFrameRequestId !== null) {
      video.cancelVideoFrameCallback(videoFrameRequestId);
      videoFrameRequestId = null;
    }

    if (animationFrameRequestId !== null) {
      window.cancelAnimationFrame(animationFrameRequestId);
      animationFrameRequestId = null;
    }

    pointer.initialized = false;
    pointer.velocityX = 0;
    pointer.velocityY = 0;
    field.data.fill(0);
    field.texture.needsUpdate = true;
    lastRenderedAt = Number.NEGATIVE_INFINITY;
  }

  function resize() {
    const nextWidth = Math.max(1, container.clientWidth);
    const nextHeight = Math.max(1, container.clientHeight);

    if (nextWidth === width && nextHeight === height) return;

    width = nextWidth;
    height = nextHeight;

    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneGeometry(...getCoverScale());

    const previousField = field;
    field = createDisplacementField(width, height);
    material.uniforms.uDataTexture.value = field.texture;
    previousField.texture.dispose();

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO),
    );
    renderer.setSize(width, height, false);

    if (isRendering) {
      renderFrame(performance.now(), true);
    }
  }

  function syncRendering() {
    if (document.hidden || !isInViewport) {
      stopRendering();
      return;
    }

    startRendering();
  }

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      isInViewport = entry?.isIntersecting ?? false;
      syncRendering();
    },
    { rootMargin: "100px 0px" },
  );

  resizeObserver.observe(container);
  intersectionObserver.observe(container);
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  document.addEventListener("visibilitychange", syncRendering);
  syncRendering();

  return () => {
    stopRendering();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    window.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("visibilitychange", syncRendering);

    mesh.geometry.dispose();
    material.dispose();
    field.texture.dispose();
    videoTexture.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
