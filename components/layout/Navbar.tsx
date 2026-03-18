import Link from "next/link";
import { getSiteCopy } from "@/lib/site-copy";
import { localizeHref, type SiteLocale } from "@/lib/site-locale";
import { LangToggle } from "./LangToggle";

export function Navbar({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = getSiteCopy(locale);
  const navLinks = [
    {
      href: localizeHref("/archive", locale),
      label: copy.nav.archive,
    },
    {
      href: localizeHref("/info", locale),
      label: copy.nav.info,
    },
  ] as const;

  return (
    <div className="relative h-0 w-full flex-[1_0_auto]">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 overflow-visible">
        <div className="w-full px-4 pb-4 pt-5 sm:px-10 sm:pt-7 lg:px-[93px] lg:pb-[13px] lg:pt-[87px]">
          <div className="flex items-start justify-between gap-6 lg:hidden">
            <Link
              href={localizeHref("/", locale)}
              className="pointer-events-auto shrink-0 text-sm font-bold tracking-[-0.02em] text-white transition-opacity hover:opacity-65 hover:underline"
            >
              Lemon
            </Link>

            <nav className="pointer-events-auto flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm leading-[2] text-white">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-opacity hover:opacity-65 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
              <LangToggle className="cursor-pointer transition-opacity hover:opacity-65 hover:underline" />
            </nav>
          </div>

          <div className="hidden lg:grid lg:grid-cols-8 lg:items-start lg:gap-x-0 lg:text-[0.95rem] lg:leading-[2] lg:text-white">
            <div className="col-span-4 px-3">
              <Link
                href={localizeHref("/", locale)}
                className="pointer-events-auto inline-block font-bold tracking-[-0.02em] text-white transition-opacity hover:opacity-65 hover:underline"
              >
                <b>Lemon</b>
              </Link>
            </div>

              {navLinks.map((link) => (
                <div key={link.href} className="col-span-1">
                  <Link
                    href={link.href}
                    className="pointer-events-auto inline-block text-white transition-opacity hover:opacity-65 hover:underline"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}

            <div className="col-span-1">
              <LangToggle className="pointer-events-auto cursor-pointer transition-opacity hover:opacity-65 hover:underline" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
