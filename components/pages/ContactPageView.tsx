import type { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { contactItems, friendLinks } from "@/lib/contact-links";
import { getSiteCopy } from "@/lib/site-copy";
import { localizeHref, type SiteLocale } from "@/lib/site-locale";

function SectionSeparator({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs uppercase tracking-[0.18em] text-white/40">{label}</p>
      <div className="h-px w-full bg-white/20" />
    </div>
  );
}

function ExternalAnchor({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function ContactPageView({ locale }: { locale: SiteLocale }) {
  const copy = getSiteCopy(locale);
  const siteLinks = [
    {
      label: copy.nav.archive,
      href: "/archive",
      description: copy.contact.siteLinks.archive,
    },
    {
      label: locale === "zh" ? "项目" : "Work",
      href: "/work",
      description: copy.contact.siteLinks.work,
    },
    {
      label: copy.nav.info,
      href: "/info",
      description: copy.contact.siteLinks.info,
    },
  ];

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-[#0d0d0d] pb-16 pt-24 text-white">
        <div className="mx-auto max-w-[1100px] px-6">
          <section className="mb-24">
            <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-16">
              <SectionSeparator label={copy.contact.sections.introLeft} />
              <SectionSeparator label={copy.contact.sections.introRight} />
            </div>

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-5">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {copy.contact.heroTitle}
                </h1>
                <p className="text-sm leading-relaxed text-white/70">
                  {copy.contact.heroLead}
                </p>
                <p className="text-sm leading-relaxed text-white/50">
                  {copy.contact.heroBody}
                </p>
              </div>

              <div className="space-y-5 text-sm leading-relaxed text-white/65">
                <p>{copy.contact.heroAsideLead}</p>
                <p className="text-white/50">{copy.contact.heroAsideBody}</p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <div className="mb-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
              <SectionSeparator label={copy.contact.sections.channels} />
              <SectionSeparator label={copy.contact.sections.friends} />
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="divide-y divide-white/10 border-y border-white/20">
                {contactItems.map((item) => (
                  <ExternalAnchor
                    key={item.label}
                    href={item.href}
                    className="grid gap-3 py-5 transition-colors hover:text-white sm:grid-cols-[112px_minmax(0,1fr)]"
                  >
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      {item.label}
                    </span>
                    <div className="min-w-0">
                      <p className="text-2xl font-bold tracking-tight text-white">
                        {item.value}
                      </p>
                      <p className="mt-1 text-sm text-white/45">
                        {copy.contact.notes[item.noteKey]}
                      </p>
                    </div>
                  </ExternalAnchor>
                ))}
              </div>

              <div className="divide-y divide-white/10 border-y border-white/20">
                {friendLinks.map((friend) => (
                  <article key={friend.github} className="py-5 text-sm">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <ExternalAnchor
                        href={friend.website ?? friend.github}
                        className="text-lg font-bold tracking-tight text-white hover:underline"
                      >
                        {friend.name}
                      </ExternalAnchor>
                      <span className="text-white/50">{friend.description}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.18em] text-white/40">
                      <ExternalAnchor href={friend.github} className="hover:text-white">
                        GitHub
                      </ExternalAnchor>
                      {friend.website && (
                        <ExternalAnchor href={friend.website} className="hover:text-white">
                          Website
                        </ExternalAnchor>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
              <SectionSeparator label={copy.contact.sections.site} />
              <SectionSeparator label={copy.contact.sections.notes} />
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="divide-y divide-white/10 border-y border-white/20">
                {siteLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={localizeHref(item.href, locale)}
                    className="grid gap-3 py-5 transition-colors hover:text-white sm:grid-cols-[112px_minmax(0,1fr)]"
                  >
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      {item.label}
                    </span>
                    <div>
                      <p className="text-lg font-bold tracking-tight text-white">{item.label}</p>
                      <p className="mt-1 text-sm text-white/45">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="space-y-5 text-sm leading-relaxed text-white/65">
                <p>{copy.contact.closingLead}</p>
                <p className="text-white/50">{copy.contact.closingBody}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
