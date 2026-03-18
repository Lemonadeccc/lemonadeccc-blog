import type { SiteLocale } from "@/lib/site-locale";

export function Footer({ locale = "en" }: { locale?: SiteLocale }) {
  void locale;
  return null;
}
