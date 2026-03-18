import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { localizeHref, type SiteLocale } from "@/lib/site-locale";

export function ProjectCard({
  project,
  locale = "en",
}: {
  project: Project;
  locale?: SiteLocale;
}) {
  return (
    <Link
      href={localizeHref(`/work/${project.slug}`, locale)}
      className="group block w-full text-white/90 no-underline focus-visible:outline-none"
    >
      <div className="overflow-hidden bg-transparent p-1 transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:bg-white group-focus-visible:bg-white">
        <div className="grid grid-cols-1 gap-0 bg-[#181818] sm:grid-cols-2">
          <div className="overflow-hidden bg-[#181818]">
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={600}
              priority
              sizes="(min-width: 640px) 50vw, 100vw"
              className="block h-auto w-full object-cover"
            />
          </div>
          <div className="overflow-hidden bg-[#181818]">
            <Image
              src={project.hoverImage}
              alt=""
              width={800}
              height={600}
              unoptimized
              aria-hidden
              className="block h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 px-0.5 pt-3 pb-8 md:grid-cols-2 md:gap-4 md:pt-4 md:pb-12">
        <h3 className="text-base font-semibold leading-tight text-white decoration-2 underline-offset-4 transition-decoration duration-200 group-hover:underline group-focus-visible:underline">
          {project.title}
        </h3>
        <div className="text-sm leading-relaxed text-white/70">
          <span className="block">{project.category}</span>
          <span className="mt-0.5 block text-xs text-white/45">{project.dateLabel} ——</span>
        </div>
      </div>
    </Link>
  );
}
