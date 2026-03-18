import type { Metadata } from "next";
import { ArchivePageView } from "@/components/pages/ArchivePageView";
import { getInspirationVideos } from "@/lib/inspiration-videos";
import { getLikedVideos } from "@/lib/liked-videos";
import { getAllPosts } from "@/lib/posts";
import { portfolioItems } from "@/lib/portfolio-items";
import { getPageMetadata } from "@/lib/site-copy";

export const metadata: Metadata = getPageMetadata("zh", "archive");

export default async function ZhArchivePage() {
  const [posts, likedVideos, inspirationVideos] = await Promise.all([
    getAllPosts("zh"),
    getLikedVideos("zh"),
    getInspirationVideos("zh"),
  ]);

  return (
    <ArchivePageView
      locale="zh"
      posts={posts}
      portfolioItems={portfolioItems}
      likedVideos={likedVideos}
      inspirationVideos={inspirationVideos}
    />
  );
}
