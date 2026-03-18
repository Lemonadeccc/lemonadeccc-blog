import { DeferredVimeo } from "@/components/ui/DeferredVimeo";
import { getSiteCopy } from "@/lib/site-copy";
import type { SiteLocale } from "@/lib/site-locale";

export function HeroSection({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = getSiteCopy(locale);
  const hasRoleB = Boolean(copy.home.hero.roleB.trim());

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "#333333",
        }}
      />

      <DeferredVimeo videoId="916142886" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10">
          <div className="flex flex-col gap-2">
            <div className="h-px w-full bg-white/25" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {copy.home.hero.eyebrow}
            </p>
            <h1 className="text-7xl font-bold leading-none tracking-tighter text-white">
              {copy.home.hero.title}
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
