import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { contactItems, friendLinks } from "@/lib/contact-links";
import type { SiteLocale } from "@/lib/site-locale";

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

export function InfoPageView({ locale }: { locale: SiteLocale }) {
  const contactLabel = locale === "zh" ? "我的联系方式" : "My Contact";
  const friendsLabel = locale === "zh" ? "友链" : "Friend Links";

  return (
    <>
      <Navbar locale={locale} />
      <main className="flex min-h-screen items-center bg-[#0d0d0d] text-white">
        <div className="w-full px-4 py-24 sm:px-10 lg:px-[93px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                {contactLabel}
              </p>
              <div className="h-full">
                {contactItems.map((item) => (
                  <ExternalAnchor
                    key={item.label}
                    href={item.href}
                    className="group grid gap-3 border-b border-white/20 py-5 first:border-t transition-colors hover:text-white sm:grid-cols-[112px_minmax(0,1fr)]"
                  >
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      {item.label}
                    </span>
                    <div className="min-w-0">
                      <p className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:underline">
                        {item.value}
                      </p>
                    </div>
                  </ExternalAnchor>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                {friendsLabel}
              </p>
              <div className="h-full divide-y divide-white/10 border-y border-white/20">
                {friendLinks.map((friend) => (
                  <ExternalAnchor
                    key={friend.github}
                    href={friend.website ?? friend.github}
                    className="group block cursor-pointer py-5 text-sm"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-lg font-bold tracking-tight text-white transition-colors group-hover:underline">
                        {friend.name}
                      </span>
                      <span className="text-white/50">{friend.description}</span>
                    </div>
                  </ExternalAnchor>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
