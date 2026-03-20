"use client";

import type { CSSProperties } from "react";
import UnicornScene from "unicornstudio-react/next";
import {
  buildWidthMap,
  DESKTOP_ROW_LAYOUT,
  splitIntoRows,
  TABLET_ROW_LAYOUT,
} from "@/lib/archive-media-layout";
import { replicaItems } from "@/lib/replica-items";

export function ReplicaList() {
  const desktopRows = splitIntoRows(replicaItems, DESKTOP_ROW_LAYOUT);
  const tabletWidthMap = buildWidthMap(replicaItems, TABLET_ROW_LAYOUT);
  const desktopWidthMap = buildWidthMap(replicaItems, DESKTOP_ROW_LAYOUT);

  return (
    <div className="py-5">
      <div className="portfolio-wall" data-thumbnails="justify">
        {desktopRows.flatMap((row) =>
          row.map((item) => {
            const style = {
              "--portfolio-width-sm": tabletWidthMap.get(item.href),
              "--portfolio-width-lg": desktopWidthMap.get(item.href),
              "--portfolio-aspect-ratio": item.aspectRatio,
            } as CSSProperties & Record<string, string | undefined>;

            if (item.mediaType === "video") {
              style["--portfolio-width-sm"] = "calc(50% - 0.2rem)";
              style["--portfolio-width-lg"] = "calc(50% - 0.2rem)";
            }

            const media =
              item.mediaType === "video" ? (
                <video
                  className="h-full w-full object-cover"
                  src={item.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="absolute inset-0 pointer-events-none">
                  <UnicornScene
                    projectId={item.projectId}
                    width="100%"
                    height="100%"
                    scale={item.scale}
                    dpi={item.dpi}
                    fps={item.fps}
                    sdkUrl={item.sdkUrl}
                    lazyLoad={false}
                    placeholderClassName="bg-[#111111]"
                    showPlaceholderWhileLoading
                    className="portfolio-thumbnail-scene"
                    altText={item.project}
                    ariaLabel={item.project}
                  />
                </div>
              );

            const content = (
              <>
                <div className="portfolio-thumbnail-media">{media}</div>
                <div className="portfolio-thumbnail-copy">
                  <p className="portfolio-thumbnail-title">{item.project}</p>
                  <p className="portfolio-thumbnail-meta">
                    {item.label} {"\u2014"}
                  </p>
                </div>
              </>
            );

            const hasExternalHref =
              item.mediaType === "video" &&
              Boolean(item.href) &&
              /^https?:\/\//.test(item.href);

            if (hasExternalHref) {
              return (
                <a
                  key={item.project}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-thumbnail group"
                  style={style}
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={item.projectId ?? item.project} className="portfolio-thumbnail group" style={style}>
                {content}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
