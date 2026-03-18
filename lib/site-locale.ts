export type SiteLocale = "en" | "zh";

export const DEFAULT_LOCALE: SiteLocale = "en";
export const SITE_LOCALES: SiteLocale[] = ["en", "zh"];

export function isSiteLocale(value: string | undefined): value is SiteLocale {
  return value === "en" || value === "zh";
}

export function getLocalePrefix(locale: SiteLocale): string {
  return locale === "zh" ? "/zh" : "";
}

export function getLocaleFromPathname(pathname: string): SiteLocale {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/zh") return "/";
  if (pathname.startsWith("/zh/")) {
    return pathname.slice(3);
  }
  return pathname;
}

export function localizeHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/")) return href;

  const bareHref = stripLocalePrefix(href);
  if (locale === "en") return bareHref;
  return bareHref === "/" ? "/zh" : `/zh${bareHref}`;
}
