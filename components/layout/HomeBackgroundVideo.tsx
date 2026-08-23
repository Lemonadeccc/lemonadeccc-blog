"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { stripLocalePrefix } from "@/lib/site-locale";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";
const HOVER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const HOME_VIDEO_WEBM_SRC = "/media/home-desktop.webm";
const HOME_VIDEO_MP4_SRC = "/media/home-desktop.mp4";

export function HomeBackgroundVideo() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const [allowsMotion, setAllowsMotion] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const isHome = stripLocalePrefix(pathname) === "/";
  const shouldRenderVideo = isHome && isDesktop && allowsMotion;
  const shouldRenderEffect = shouldRenderVideo && supportsHover && isReady;

  useEffect(() => {
    const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const hoverMedia = window.matchMedia(HOVER_MEDIA_QUERY);
    const motionMedia = window.matchMedia(REDUCED_MOTION_QUERY);

    function syncPreferences() {
      setIsDesktop(desktopMedia.matches);
      setSupportsHover(hoverMedia.matches);
      setAllowsMotion(!motionMedia.matches);
    }

    syncPreferences();
    desktopMedia.addEventListener("change", syncPreferences);
    hoverMedia.addEventListener("change", syncPreferences);
    motionMedia.addEventListener("change", syncPreferences);

    return () => {
      desktopMedia.removeEventListener("change", syncPreferences);
      hoverMedia.removeEventListener("change", syncPreferences);
      motionMedia.removeEventListener("change", syncPreferences);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldRenderVideo) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
  }, [shouldRenderVideo]);

  useEffect(() => {
    if (!isHome) {
      setIsReady(false);
    }
  }, [isHome]);

  useEffect(() => {
    if (!shouldRenderEffect) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let cancelled = false;
    let disposeEffect: (() => void) | undefined;

    void import("./home-video-effect")
      .then(({ mountPixelatedVideoEffect }) => {
        if (cancelled) return;
        disposeEffect = mountPixelatedVideoEffect({ container, video });
      })
      .catch(() => {
        // The original video remains visible when WebGL is unavailable.
      });

    return () => {
      cancelled = true;
      disposeEffect?.();
    };
  }, [shouldRenderEffect]);

  if (!isHome) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen overflow-hidden bg-[#050505]"
    >
      {shouldRenderVideo ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          onLoadStart={() => {
            setIsReady(false);
          }}
          onEmptied={() => {
            setIsReady(false);
          }}
          onLoadedData={() => {
            setIsReady(true);
          }}
        >
          <source src={HOME_VIDEO_MP4_SRC} type="video/mp4" />
          <source src={HOME_VIDEO_WEBM_SRC} type="video/webm" />
        </video>
      ) : null}
    </div>
  );
}
