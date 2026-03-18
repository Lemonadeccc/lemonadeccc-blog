import path from "node:path";
import {
  DEFAULT_LOCALE,
  SITE_LOCALES,
  type SiteLocale,
} from "./site-locale";

export type PostLocale = SiteLocale;
export const DEFAULT_POST_LOCALE: PostLocale = DEFAULT_LOCALE;
export const POST_LOCALES: PostLocale[] = SITE_LOCALES;

export function resolvePostLocale(lang?: string): PostLocale {
  return lang === "zh" ? "zh" : "en";
}

export function getPostsDirForLocale(locale: PostLocale): string {
  return path.join(process.cwd(), "content", "posts", locale);
}

export function getDateLocaleForPosts(locale: PostLocale): string {
  return locale === "zh" ? "zh-CN" : "en-US";
}
