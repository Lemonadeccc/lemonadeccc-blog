"use client";

import { useState, useEffect } from "react";

interface DeferredVimeoProps {
  videoId: string;
}

export function DeferredVimeo({ videoId }: DeferredVimeoProps) {
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = requestIdleCallback(() => setEnabled(true), { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, []);

  if (!enabled) return null;

  return (
    <iframe
      src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1&quality=auto`}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        border: "none",
        opacity: loaded ? 1 : 0,
        transition: "opacity 1.2s ease",
        objectFit: "cover",
        // Scale up slightly to fill viewport and avoid letterboxing
        width: "177.78vh",
        minWidth: "100%",
        height: "56.25vw",
        minHeight: "100%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      allow="autoplay; fullscreen; picture-in-picture"
      aria-hidden="true"
      onLoad={() => setLoaded(true)}
    />
  );
}
