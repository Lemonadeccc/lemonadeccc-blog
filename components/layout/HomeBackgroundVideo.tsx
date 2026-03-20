"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { stripLocalePrefix } from "@/lib/site-locale";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const HOME_VIDEO_BASE_URL = "https://imgbed.lemonadec.cc";
const HOME_VIDEO_WEBM_SRC = `${HOME_VIDEO_BASE_URL}/home-desktop.webm`;
const HOME_VIDEO_MP4_SRC = `${HOME_VIDEO_BASE_URL}/home-desktop.mp4`;

export function HomeBackgroundVideo() {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [allowsMotion, setAllowsMotion] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const isHome = stripLocalePrefix(pathname) === "/";
  const shouldRenderVideo = isHome && isDesktop && allowsMotion;

  useEffect(() => {
    const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const motionMedia = window.matchMedia(REDUCED_MOTION_QUERY);

    function syncPreferences() {
      setIsDesktop(desktopMedia.matches);
      setAllowsMotion(!motionMedia.matches);
    }

    syncPreferences();
    desktopMedia.addEventListener("change", syncPreferences);
    motionMedia.addEventListener("change", syncPreferences);

    return () => {
      desktopMedia.removeEventListener("change", syncPreferences);
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

  if (!isHome) {
    return null;
  }

  return (
    <div
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
