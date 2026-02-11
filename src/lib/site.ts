export const siteConfig = {
  name: "Lemonadeccc",
  shortName: "Lemonadeccc",
  description:
    "A frontend learning library with posts on AI, animation, and deployment.",
  authorName: "Lemonadeccc",
  authorUrl: "https://github.com/Lemonadeccc",
  creatorHandle: "@Lemonadecccc",
} as const;

const FALLBACK_SITE_URL = "https://lemonadec.cc";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getSiteUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!envUrl) return FALLBACK_SITE_URL;

  try {
    const normalized =
      envUrl.startsWith("http://") || envUrl.startsWith("https://")
        ? envUrl
        : `https://${envUrl}`;
    const parsed = new URL(normalized);
    return trimTrailingSlash(parsed.toString());
  } catch {
    return FALLBACK_SITE_URL;
  }
};

export const withSiteUrl = (pathname: string) => {
  return new URL(pathname, `${getSiteUrl()}/`).toString();
};
