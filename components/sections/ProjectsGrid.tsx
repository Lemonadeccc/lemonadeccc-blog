import Link from "next/link";
import type { Project } from "@/lib/types";
import { localizeHref, type SiteLocale } from "@/lib/site-locale";
import { ProjectCard } from "./ProjectCard";
import { AnimateIn } from "@/components/ui/AnimateIn";

interface ProjectsGridProps {
  id?: string;
  title: string;
  projects: Project[];
  footerLink?: { href: string; label: string };
  locale?: SiteLocale;
}

export function ProjectsGrid({
  id,
  title,
  projects,
  footerLink,
  locale = "en",
}: ProjectsGridProps) {
  return (
    <section id={id} className="px-4 py-12 sm:px-10 sm:py-16 lg:px-[93px]">
      <div className="">
        <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-4 sm:mb-10">
          <h2 className="text-base font-bold uppercase tracking-[0.2em] text-white">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-2 md:gap-y-0">
          {projects.map((project, idx) => (
            <AnimateIn key={project.slug} delay={idx % 2 === 1 ? 120 : 0}>
              <ProjectCard project={project} locale={locale} />
            </AnimateIn>
          ))}
        </div>

        {footerLink && (
          <div className="mt-12 border-t border-white/10 pt-8 text-center sm:mt-16 sm:pt-10">
            <Link
              href={localizeHref(footerLink.href, locale)}
              className="text-lg font-bold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-60 sm:text-xl"
            >
              {footerLink.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
