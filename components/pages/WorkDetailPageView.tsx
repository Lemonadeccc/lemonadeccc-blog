import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import {
  ChapteredProjectPage,
  DefaultProjectPage,
  NarrativeProjectPage,
} from "@/components/work/detail/ProjectDetailTemplates";
import { allProjects, getProjectBySlug } from "@/lib/data";
import { getMdxProjectPage } from "@/lib/mdx-project-pages";
import { getProjectDetailTemplate } from "@/lib/project-detail-pages";
import { getSiteCopy } from "@/lib/site-copy";
import type { SiteLocale } from "@/lib/site-locale";

export function generateWorkDetailStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateWorkDetailMetadata(
  locale: SiteLocale,
  slug: string
): Promise<Metadata> {
  const copy = getSiteCopy(locale);
  const project = getProjectBySlug(slug);
  if (!project) return { title: `${copy.workDetail.projectNotFound} | Lemonadeccc` };

  return {
    title: `${project.title} | Lemonadeccc`,
    description: `${project.category} — ${project.dateLabel}`,
  };
}

export async function WorkDetailPageView({
  slug,
  locale,
}: {
  slug: string;
  locale: SiteLocale;
}) {
  const copy = getSiteCopy(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const mdxProjectPage = await getMdxProjectPage(project.slug);

  if (mdxProjectPage) {
    const { Page, backgroundClassName } = mdxProjectPage;

    return (
      <>
        <div className="project-detail">
          <Navbar locale={locale} />
          <main className={`min-h-screen text-white ${backgroundClassName}`}>
            <Page />
          </main>
        </div>
        <Footer locale={locale} />
      </>
    );
  }

  const detailTemplate = getProjectDetailTemplate(project);

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-bg-primary text-white">
        {detailTemplate?.layout === "narrative" && (
          <NarrativeProjectPage
            project={project}
            detail={detailTemplate}
            creditListLabel={copy.workDetail.creditList}
          />
        )}
        {detailTemplate?.layout === "chaptered" && (
          <ChapteredProjectPage
            project={project}
            detail={detailTemplate}
            creditListLabel={copy.workDetail.creditList}
          />
        )}
        {!detailTemplate && <DefaultProjectPage project={project} />}
      </main>
      <Footer locale={locale} />
    </>
  );
}
