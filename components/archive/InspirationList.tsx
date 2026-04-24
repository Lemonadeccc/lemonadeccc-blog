"use client";

import type { CSSProperties } from "react";
import type { LikedVideo } from "@/lib/liked-videos";
import type { SiteLocale } from "@/lib/site-locale";

type Props = {
  locale: SiteLocale;
  videos: LikedVideo[];
};

export function InspirationList({ locale, videos }: Props) {
  const emptyLabel = locale === "zh" ? "暂时还没有灵感视频" : "No inspiration videos yet";

  return (
    <div className="py-5">
      {videos.length === 0 ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-white/20">{emptyLabel}</p>
        </div>
      ) : (
        <div className="portfolio-wall" data-thumbnails="justify">
          {videos.toReversed().map((video) => {
            const style = {
              "--portfolio-aspect-ratio": video.aspectRatio,
              "--portfolio-width-sm": "calc(50% - 0.2rem)",
              "--portfolio-width-lg": "calc(50% - 0.2rem)",
            } as CSSProperties & Record<string, string>;

            return (
              <article key={video.id} className="portfolio-thumbnail liked-video-card group" style={style}>
                <div className="portfolio-thumbnail-media">
                  {video.embedUrl ? (
                    <iframe
                      className="h-full w-full border-0"
                      src={video.embedUrl}
                      title={video.title}
                      loading="lazy"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-white/25">
                      Video
                    </div>
                  )}
                </div>

                <div className="portfolio-thumbnail-copy liked-video-copy">
                  <div className="liked-video-tags">
                    {video.tags.map((tag) => (
                      <span key={`${video.id}-${tag.key}`} className="liked-video-chip">
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <p className="portfolio-thumbnail-title liked-video-title">{video.title}</p>

                  {video.summary ? (
                    <p className="liked-video-summary">{video.summary}</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
