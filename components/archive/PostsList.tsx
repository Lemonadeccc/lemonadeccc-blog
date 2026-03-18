"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getSiteCopy } from "@/lib/site-copy";
import { localizeHref, type SiteLocale } from "@/lib/site-locale";

type Props = {
  posts: PostMeta[];
  locale: SiteLocale;
};

export function PostsList({ posts, locale }: Props) {
  const copy = getSiteCopy(locale);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
  };

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
    <div className="border-y border-white/10">
      {posts.map((post) => {
        return (
          <Link
            key={post.slug}
            href={localizeHref(`/archive/posts/${post.slug}`, locale)}
            className="group flex items-start justify-between gap-6 border-b border-white/10 px-4 py-5 transition-colors last:border-b-0 sm:px-5 lg:px-6"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xl font-bold tracking-tight text-white group-hover:underline underline-offset-4 sm:text-2xl lg:text-3xl">
                {post.title}
              </p>
              {post.summary && (
                <p className="mt-1.5 text-sm text-white/45 line-clamp-1">{post.summary}</p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs uppercase tracking-widest text-white/30">{post.type}</p>
              <time
                dateTime={post.date}
                className="mt-0.5 block text-xs text-white/25 tabular-nums"
              >
                {formatDate(post.date)}
              </time>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
