import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArchiveClient } from "@/components/archive/ArchiveClient";
import { ArchiveTabs } from "@/components/archive/ArchiveTabs";
import type { PostMeta } from "@/lib/posts";
import type { PortfolioItem } from "@/lib/portfolio-items";
import type { LikedVideo } from "@/lib/liked-videos";
import { getSiteCopy } from "@/lib/site-copy";
import type { SiteLocale } from "@/lib/site-locale";

export function ArchivePageView({
  locale,
  posts,
  portfolioItems,
  likedVideos,
  inspirationVideos,
}: {
  locale: SiteLocale;
  posts: PostMeta[];
  portfolioItems: PortfolioItem[];
  likedVideos: LikedVideo[];
  inspirationVideos: LikedVideo[];
}) {
  const copy = getSiteCopy(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-[#0d0d0d] pb-16 pt-[9.9rem] text-white sm:pt-[10.4rem]">
        <div className="px-4 sm:px-10 lg:px-[93px]">
          <section
            className="mb-2.5 text-[1.05rem] leading-[1.4] text-white/90 sm:text-[1.1rem] lg:mb-4"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-10 lg:gap-x-0">
              <div className="hidden lg:block lg:col-span-5" />
              <div className="lg:col-span-5">
                <h1 className="text-[2.35rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.7rem]">
                  {copy.archive.title}
                </h1>
                <div className="mt-5 space-y-5 text-[1.05rem] leading-[1.4] text-white/82 sm:text-[1.1rem]">
                  {copy.archive.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <ArchiveTabs locale={locale} />
          </section>

          <ArchiveClient
            locale={locale}
            posts={posts}
            portfolioItems={portfolioItems}
            likedVideos={likedVideos}
            inspirationVideos={inspirationVideos}
          />
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
