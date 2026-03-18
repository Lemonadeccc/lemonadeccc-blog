import Link from "next/link";
import { getSiteCopy } from "@/lib/site-copy";
import type { SiteLocale } from "@/lib/site-locale";

export function HeroSection({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = getSiteCopy(locale);
  const hasRoleB = Boolean(copy.home.hero.roleB.trim());
  const rssZhHref = "/zh/rss.xml";
  const rssEnHref = "/rss.xml";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            {copy.home.hero.introLineA}
            <br />
            {copy.home.hero.introLineB}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base">
            {copy.home.hero.subscribeLineA}
            <br />
            {copy.home.hero.subscribeLineB}
          </p>

          <div className="mt-4 flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href={rssEnHref}
              className="font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              {copy.home.hero.rssFeedEnLabel}
            </Link>
            <span className="text-white/30">{copy.home.hero.rssDividerLabel}</span>
            <Link
              href={rssZhHref}
              className="font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              {copy.home.hero.rssFeedZhLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom corners */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:pb-10">
        <div className="mx-auto grid max-w-300 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
          <div className="flex flex-col gap-2">
            <div className="h-px w-full bg-white/25" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {copy.home.hero.eyebrow}
            </p>
            <h1 className="text-4xl font-medium leading-tight text-white lg:text-5xl">
              <span className="cursor-pointer transition-opacity hover:opacity-70">
                {copy.home.hero.title}
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-px w-full bg-white/25" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {copy.home.hero.byline}
            </p>
            <p className="text-4xl font-medium leading-tight text-white lg:text-5xl">
              <span className="cursor-pointer transition-opacity hover:opacity-70">
                {copy.home.hero.roleA}
              </span>
              {hasRoleB ? (
                <>
                  {" "}
                  <span className="font-light">✕</span>{" "}
                  <span className="cursor-pointer transition-opacity hover:opacity-70">
                    {copy.home.hero.roleB}
                  </span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
