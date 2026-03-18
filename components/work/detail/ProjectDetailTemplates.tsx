import Image from "next/image";
import type { Project } from "@/lib/types";
import type {
  ChapteredProjectDetail,
  DetailCredits,
  DetailImage,
  NarrativeProjectDetail,
} from "@/lib/project-detail-pages";

const imageSizes = {
  landscape: { width: 1200, height: 800 },
  portrait: { width: 900, height: 1350 },
  wide: { width: 1600, height: 900 },
};

function DetailIntro({
  title,
  dateLabel,
  paragraphs,
}: {
  title: string;
  dateLabel: string;
  paragraphs: string[];
}) {
  return (
    <section className="px-4 pt-24 sm:px-10 sm:pt-28 lg:px-[93px]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-4">
        <div className="md:col-span-6">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-3 text-xs tracking-[0.32em] text-white/45">
            {dateLabel} - -
          </p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-white/72 md:col-span-5">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailImageWall({
  images,
  className = "",
}: {
  images: DetailImage[];
  className?: string;
}) {
  return (
    <div
      className={`columns-1 gap-1 sm:columns-2 lg:columns-4 ${className}`.trim()}
      style={{ columnGap: "0.25rem" }}
    >
      {images.map((image) => {
        const size = imageSizes[image.orientation];

        return (
          <div key={image.src} className="mb-1 break-inside-avoid overflow-hidden bg-[#181818]">
            <Image
              src={image.src}
              alt={image.alt}
              width={size.width}
              height={size.height}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="block h-auto w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

function DetailCreditsBlock({
  credits,
  creditListLabel,
}: {
  credits: DetailCredits;
  creditListLabel: string;
}) {
  return (
    <section className="px-4 pb-24 sm:px-10 lg:px-[93px]">
      <div className="grid grid-cols-1 gap-8 border-t border-white/15 pt-12 md:grid-cols-12 md:gap-4">
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            {credits.roleTitle}
          </p>
          <div className="mt-4 h-px bg-white/20" />
          <div className="mt-4 space-y-1 text-sm text-white/65">
            {credits.roleLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            {creditListLabel}
          </p>
          <div className="mt-4 h-px bg-white/20" />
          <div className="mt-4 space-y-1.5 text-sm text-white/65">
            {credits.items.map((item) => (
              <p key={`${item.label}-${item.value}`}>
                {item.label}: <span className="text-white">{item.value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NarrativeHeroMedia({ images }: { images: DetailImage[] }) {
  return (
    <section className="px-4 sm:px-10 lg:px-[93px]">
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
        {images.map((image) => {
          const size = imageSizes[image.orientation];

          return (
            <div key={image.src} className="overflow-hidden bg-[#181818]">
              <Image
                src={image.src}
                alt={image.alt}
                width={size.width}
                height={size.height}
                unoptimized
                className="block h-auto w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function NarrativeQuote({ quote }: { quote: string }) {
  return (
    <section className="px-4 sm:px-10 lg:px-[93px]">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-6" />
        <blockquote className="text-2xl font-medium leading-tight text-white md:col-span-5 lg:text-4xl">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}

function NarrativeSectionBlock({
  title,
  index,
  paragraphs,
  quote,
}: {
  title: string;
  index: string;
  paragraphs: string[];
  quote?: string;
}) {
  return (
    <section className="px-4 sm:px-10 lg:px-[93px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-4">
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-xs tracking-[0.32em] text-white/35">- - {index}</p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-white/72 md:col-span-5">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {quote && (
            <blockquote className="pt-4 text-2xl font-medium leading-tight text-white lg:text-3xl">
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}
        </div>
        <div className="hidden md:block md:col-span-4">
          <div className="text-right text-xs tracking-[0.32em] text-white/25">
            - - {index}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NarrativeProjectPage({
  project,
  detail,
  creditListLabel = "Credit List",
}: {
  project: Project;
  detail: NarrativeProjectDetail;
  creditListLabel?: string;
}) {
  return (
    <div className="space-y-14 pb-10">
      <DetailIntro
        title={detail.displayTitle ?? project.title}
        dateLabel={project.dateLabel}
        paragraphs={detail.introParagraphs}
      />
      <NarrativeHeroMedia images={detail.heroMedia} />
      <NarrativeQuote quote={detail.leadQuote} />
      {detail.sections.map((section) => (
        <div key={section.index} className="space-y-10">
          <NarrativeSectionBlock
            title={section.title}
            index={section.index}
            paragraphs={section.paragraphs}
            quote={section.quote}
          />
          <section className="px-4 sm:px-10 lg:px-[93px]">
            <DetailImageWall images={section.gallery} />
          </section>
        </div>
      ))}
      <DetailCreditsBlock credits={detail.credits} creditListLabel={creditListLabel} />
    </div>
  );
}

function ChapterHeading({ heading }: { heading: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="hidden md:block md:col-span-3" />
      <div className="md:col-span-5">
        <h2 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">
          {heading}
        </h2>
        <div className="mt-4 h-px bg-white/20" />
      </div>
    </div>
  );
}

function ChapterText({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-12 md:gap-4">
      <div className="hidden md:block md:col-span-3" />
      <div className="space-y-4 text-sm leading-relaxed text-white/72 md:col-span-5">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export function ChapteredProjectPage({
  project,
  detail,
  creditListLabel = "Credit List",
}: {
  project: Project;
  detail: ChapteredProjectDetail;
  creditListLabel?: string;
}) {
  return (
    <div className="space-y-14 pb-10">
      <DetailIntro
        title={detail.displayTitle ?? project.title}
        dateLabel={project.dateLabel}
        paragraphs={detail.introParagraphs}
      />
      {detail.leadGalleries.map((images, index) => (
        <section key={`lead-${index}`} className="px-4 sm:px-10 lg:px-[93px]">
          <DetailImageWall images={images} className="lg:columns-3" />
        </section>
      ))}
      {detail.sections.map((section) => (
        <div key={section.heading} className="space-y-10 px-4 sm:px-10 lg:px-[93px]">
          <ChapterHeading heading={section.heading} />
          <ChapterText paragraphs={section.paragraphs} />
          <DetailImageWall images={section.gallery} />
        </div>
      ))}
      <DetailCreditsBlock credits={detail.credits} creditListLabel={creditListLabel} />
    </div>
  );
}

export function DefaultProjectPage({ project }: { project: Project }) {
  return (
    <div className="px-4 pt-24 pb-24 sm:px-10 sm:pt-28 lg:px-[93px]">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-4">
        <div className="space-y-6 lg:col-span-5">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.32em] text-white/40">
              {project.category}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </div>
          <p className="text-xs tracking-[0.32em] text-white/45">
            {project.dateLabel} - -
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-white/72">
            {project.summary}
          </p>
        </div>
        <div className="space-y-4 lg:col-span-7">
          <div className="overflow-hidden bg-[#181818]">
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="block h-auto w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            <div className="overflow-hidden bg-[#181818]">
              <Image
                src={project.hoverImage}
                alt=""
                width={1200}
                height={800}
                unoptimized
                aria-hidden
                className="block h-auto w-full object-cover"
              />
            </div>
            <div className="overflow-hidden bg-[#181818]">
              <Image
                src={`https://picsum.photos/seed/${project.slug}-detail/1200/800`}
                alt=""
                width={1200}
                height={800}
                unoptimized
                aria-hidden
                className="block h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
