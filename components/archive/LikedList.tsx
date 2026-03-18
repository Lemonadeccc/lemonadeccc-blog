"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import type { LikedVideo } from "@/lib/liked-videos";
import type { SiteLocale } from "@/lib/site-locale";

type Props = {
  locale: SiteLocale;
  videos: LikedVideo[];
};

function withTrailingPeriod(label: string) {
  return label.endsWith(".") ? label : `${label}.`;
}

export function LikedList({ locale, videos }: Props) {
  const [activeTag, setActiveTag] = useState("all");

  const tagOptions: { key: string; label: string }[] = [];

  videos.forEach((video) => {
    video.tags.forEach((tag) => {
      if (tagOptions.some((option) => option.key === tag.key)) return;
      tagOptions.push(tag);
    });
  });

  const filteredVideos =
    activeTag === "all"
      ? videos
      : videos.filter((video) => video.tags.some((tag) => tag.key === activeTag));

  const allLabel = locale === "zh" ? "全部" : "All";
  const emptyLabel = locale === "zh" ? "暂时还没有视频" : "No liked videos yet";

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-10 lg:gap-x-0 mb-[20px]">
        <div className="hidden lg:block lg:col-span-5" />
        <div className="lg:col-span-5">
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-bold leading-[1.4]">
            <button
              type="button"
              onClick={() => setActiveTag("all")}
              className={`cursor-pointer transition-colors ${
                activeTag === "all"
                  ? "text-white"
                  : "text-[#565656e6] hover:text-[#8a8a8ae6]"
              }`}
            >
              {withTrailingPeriod(allLabel)}
            </button>
            {tagOptions.map((tag) => (
              <button
                key={tag.key}
                type="button"
                onClick={() => setActiveTag(tag.key)}
                className={`cursor-pointer transition-colors ${
                  activeTag === tag.key
                    ? "text-white"
                    : "text-[#565656e6] hover:text-[#8a8a8ae6]"
                }`}
              >
                {withTrailingPeriod(tag.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-white/20">{emptyLabel}</p>
        </div>
      ) : (
        <div className="portfolio-wall mt-0" data-thumbnails="justify">
          {filteredVideos.map((video) => {
            const style = {
              "--portfolio-aspect-ratio": video.aspectRatio,
              "--portfolio-width-sm": "calc(50% - 0.2rem)",
              "--portfolio-width-lg": "calc(33.3333% - 0.2rem)",
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
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
