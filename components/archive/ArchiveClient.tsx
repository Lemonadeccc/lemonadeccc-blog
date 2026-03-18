"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { PostsList } from "./PostsList";
import { PortfolioList } from "./PortfolioList";
import type { PostMeta } from "@/lib/posts";
import type { PortfolioItem } from "@/lib/portfolio-items";
import type { LikedVideo } from "@/lib/liked-videos";
import type { SiteLocale } from "@/lib/site-locale";
import { LikedList } from "./LikedList";
import { InspirationList } from "./InspirationList";

type Tab = "posts" | "portfolio" | "replica" | "liked" | "inspiration";

type Props = {
  locale: SiteLocale;
  posts: PostMeta[];
  portfolioItems: PortfolioItem[];
  likedVideos: LikedVideo[];
  inspirationVideos: LikedVideo[];
};

const ReplicaList = dynamic(
  () => import("./ReplicaList").then((mod) => mod.ReplicaList),
  {
    ssr: false,
    loading: () => (
      <div className="pt-6 text-sm tracking-[-0.01em] text-white/45">
        Loading replica scenes...
      </div>
    ),
  },
);

function ArchiveClientInner({
  locale,
  posts,
  portfolioItems,
  likedVideos,
  inspirationVideos,
}: Props) {
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get("tab") as Tab | null) ?? "posts";

  return (
    <div>
      <div>
        {activeTab === "posts" && <PostsList posts={posts} locale={locale} />}
        {activeTab === "portfolio" && <PortfolioList items={portfolioItems} />}
        {activeTab === "replica" && <ReplicaList />}
        {activeTab === "liked" && <LikedList locale={locale} videos={likedVideos} />}
        {activeTab === "inspiration" && (
          <InspirationList locale={locale} videos={inspirationVideos} />
        )}
      </div>
    </div>
  );
}

export function ArchiveClient(props: Props) {
  return (
    <Suspense fallback={null}>
      <ArchiveClientInner {...props} />
    </Suspense>
  );
}
