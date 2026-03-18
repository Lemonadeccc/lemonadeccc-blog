import type { ReactNode } from "react";

type QuoteAlign = "intro" | "section";
type TextSectionVariant = "intro" | "section";

export function DetailBodyCopy({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`rich-copy ${className}`.trim()}>{children}</div>;
}

export function DetailLeadQuote({
  children,
  align = "intro",
}: {
  children: ReactNode;
  align?: QuoteAlign;
}) {
  return (
    <section className="px-4 sm:px-8 lg:px-[7rem]">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {align === "intro" ? (
          <>
            <div className="hidden md:block md:col-span-6" />
            <div className="md:col-span-5 md:px-4">
              <blockquote className="text-[1.85rem] leading-[1.2] font-bold text-white/90 lg:text-[2.2rem]">
                &ldquo;{children}&rdquo;
              </blockquote>
            </div>
            <div className="hidden md:block md:col-span-1 md:px-4" />
          </>
        ) : (
          <>
            <div className="hidden md:block md:col-span-3 md:px-4" />
            <div className="md:col-span-5 md:px-4">
              <blockquote className="text-[1.85rem] leading-[1.2] font-bold text-white/90 lg:text-[2.2rem]">
                &ldquo;{children}&rdquo;
              </blockquote>
            </div>
            <div className="hidden md:block md:col-span-4 md:px-4" />
          </>
        )}
      </div>
    </section>
  );
}

export function DetailTextSection({
  title,
  meta,
  variant = "section",
  headingAs = "h2",
  children,
}: {
  title: ReactNode;
  meta: ReactNode;
  variant?: TextSectionVariant;
  headingAs?: "h1" | "h2";
  children: ReactNode;
}) {
  const Heading = headingAs;

  if (variant === "intro") {
    return (
      <section className="px-4 sm:px-8 lg:px-[7rem]">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-6 md:px-4">
            <Heading className="text-[1.95rem] leading-none font-bold text-white/90">
              {title}
            </Heading>
            <p className="mt-2 text-[1rem] leading-[1.5] text-white/90">{meta}</p>
          </div>
          <div className="mt-8 md:col-span-5 md:mt-0 md:px-4">
            <DetailBodyCopy>{children}</DetailBodyCopy>
          </div>
          <div className="hidden md:block md:col-span-1 md:px-4" />
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-8 lg:px-[7rem]">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-3 md:px-4">
          <Heading className="text-[1.8rem] leading-none font-bold text-white/90">
            {title}
          </Heading>
          <p className="mt-2 text-[1rem] leading-[1.5] text-white/90">{meta}</p>
        </div>
        <div className="mt-8 md:col-span-5 md:mt-0 md:px-4">
          <DetailBodyCopy>{children}</DetailBodyCopy>
        </div>
        <div className="hidden md:block md:col-span-4 md:px-4">
          <div className="text-right text-[1rem] leading-[1.5] text-white/90">
            {meta}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DetailCreditsColumns({
  roleTitle,
  roleChildren,
  creditsTitle = "Credit List",
  creditsChildren,
}: {
  roleTitle: ReactNode;
  roleChildren: ReactNode;
  creditsTitle?: ReactNode;
  creditsChildren: ReactNode;
}) {
  return (
    <section className="mt-16 px-4 sm:px-8 lg:px-[7rem]">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-3 md:px-4">
          <p className="text-[1rem] leading-[1.5] text-white/90">
            <strong>{roleTitle}</strong>
          </p>
          <hr className="my-4 border-white/80" />
          <DetailBodyCopy className="text-[1rem]">{roleChildren}</DetailBodyCopy>
        </div>
        <div className="mt-10 md:col-span-3 md:mt-0 md:px-4">
          <p className="text-[1rem] leading-[1.5] text-white/90">
            <strong>{creditsTitle}</strong>
          </p>
          <hr className="my-4 border-white/80" />
          <DetailBodyCopy className="text-[1rem]">
            {creditsChildren}
          </DetailBodyCopy>
        </div>
        <div className="hidden md:block md:col-span-6 md:px-4" />
      </div>
    </section>
  );
}

export function DetailChapterSection({
  heading,
  children,
}: {
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="px-4 sm:px-8 lg:px-[7rem]">
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4">
        <div className="hidden md:block md:col-span-3" />
        <div className="md:col-span-5">
          <h2 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">
            {heading}
          </h2>
          <div className="mt-4 h-px bg-white/20" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 md:gap-4">
        <div className="hidden md:block md:col-span-3" />
        <div className="space-y-4 text-sm leading-relaxed text-white/72 md:col-span-5">
          {children}
        </div>
      </div>
    </section>
  );
}

export const projectDetailMdxComponents = {
  DetailBodyCopy,
  DetailChapterSection,
  DetailLeadQuote,
  DetailTextSection,
  DetailCreditsColumns,
};
