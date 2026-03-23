"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getSiteCopy } from "@/lib/site-copy";
import { localizeHref, type SiteLocale } from "@/lib/site-locale";

type Props = {
  posts: PostMeta[];
  locale: SiteLocale;
};

function withTrailingPeriod(label: string) {
  return label.endsWith(".") ? label : `${label}.`;
}

export function PostsList({ posts, locale }: Props) {
  const copy = getSiteCopy(locale);
  const [activeYear, setActiveYear] = useState("all");

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
  };

  const yearOptions = Array.from(
    new Set(
      posts
        .map((post) => post.date.slice(0, 4))
        .filter((year) => /^\d{4}$/.test(year)),
    ),
  ).sort((a, b) => Number(b) - Number(a));

  const effectiveYear =
    activeYear === "all" || yearOptions.includes(activeYear) ? activeYear : "all";
  const filteredPosts =
    effectiveYear === "all"
      ? posts
      : posts.filter((post) => post.date.startsWith(effectiveYear));
  const allLabel = locale === "zh" ? "全部" : "All";

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-white/20">
          {copy.archive.emptyState.noPosts}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 grid grid-cols-1 gap-y-8 lg:grid-cols-10 lg:gap-x-0">
        <div className="hidden lg:block lg:col-span-5" />
        <div className="lg:col-span-5">
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-bold leading-[1.4]">
            <button
              type="button"
              onClick={() => setActiveYear("all")}
              className={`cursor-pointer transition-colors ${
                effectiveYear === "all"
                  ? "text-white"
                  : "text-[#565656e6] hover:text-[#8a8a8ae6]"
              }`}
            >
              {withTrailingPeriod(allLabel)}
            </button>
            {yearOptions.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setActiveYear(year)}
                className={`cursor-pointer transition-colors ${
                  effectiveYear === year
                    ? "text-white"
                    : "text-[#565656e6] hover:text-[#8a8a8ae6]"
                }`}
              >
                {withTrailingPeriod(year)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-y border-white/10">
        {filteredPosts.map((post) => {
          return (
            <Link
              key={post.slug}
              href={localizeHref(`/archive/posts/${post.slug}`, locale)}
              className="group flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 transition-colors last:border-b-0 sm:gap-6 sm:px-5 sm:py-5 lg:px-6"
            >
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold leading-tight tracking-tight text-white underline-offset-4 group-hover:underline sm:text-lg lg:text-xl">
                  {post.title}
                </p>
                {post.summary && (
                  <p className="mt-1 text-sm leading-snug text-white/45 line-clamp-1">
                    {post.summary}
                  </p>
                )}
              </div>
              <div className="flex w-[76px] shrink-0 self-stretch flex-col justify-between text-right sm:w-[88px]">
                <p className="text-[11px] uppercase leading-none tracking-[0.18em] text-white/30">
                  {post.type}
                </p>
                <time
                  dateTime={post.date}
                  className="block text-[11px] leading-none text-white/25 tabular-nums"
                >
                  {formatDate(post.date)}
                </time>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
