import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { recentProjects } from "@/lib/data";
import { getSiteCopy } from "@/lib/site-copy";
import type { SiteLocale } from "@/lib/site-locale";

const SHOW_HOME_RECENT_WORKS = false;

export function HomePageView({ locale }: { locale: SiteLocale }) {
  const copy = getSiteCopy(locale);

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <HeroSection locale={locale} />
        {SHOW_HOME_RECENT_WORKS ? (
          <ProjectsGrid
            id="work"
            locale={locale}
            title={copy.home.recentTitle}
            projects={recentProjects.slice(0, 1)}
          />
        ) : null}
      </main>
    </>
  );
}
