import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import type { SiteLocale } from "./site-locale";

const LIKED_VIDEOS_DIR = path.join(process.cwd(), "content", "resources", "videos");
const LIKED_VIDEO_ORDER = [
  "cloudflare-nextjs-slop-fork-syntax",
  "i-did-not-expect-this-theo",
  "webMCP",
  "cheat-code-for-design-codevolution",
  "AI-SDK-v5-Full-Course-Beginner-to-Advanced-Codevolution",
] as const;

const TAG_LABELS = {
  zh: {
    ai: "AI",
    design: "设计",
    developer: "开发",
    art: "艺术",
  },
} as const;

type LocalizedField = {
  en?: unknown;
  zh?: unknown;
};

type LikedVideoJson = {
  id?: unknown;
  title?: LocalizedField;
  summary?: LocalizedField;
  author?: unknown;
  duration?: unknown;
  tags?: unknown;
  embedUrl?: unknown;
};

export type LikedVideoTag = {
  key: string;
  label: string;
};

export type LikedVideo = {
  id: string;
  title: string;
  summary: string;
  author: string;
  duration: string;
  tags: LikedVideoTag[];
  embedUrl?: string;
  sourceUrl?: string;
  aspectRatio: string;
};

function toStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toTagKey(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveLocalizedField(value: unknown, locale: SiteLocale, fallback: string) {
  if (!isRecord(value)) return fallback;

  const localized = toStringValue(value[locale]);
  if (localized) return localized;

  const english = toStringValue(value.en);
  if (english) return english;

  const chinese = toStringValue(value.zh);
  if (chinese) return chinese;

  return fallback;
}

function localizeTagLabel(label: string, locale: SiteLocale) {
  if (locale === "en") return label;
  const localized = TAG_LABELS.zh[toTagKey(label) as keyof typeof TAG_LABELS.zh];
  return localized ?? label;
}

function toSourceUrl(embedUrl: string) {
  try {
    const parsed = new URL(embedUrl);
    const segments = parsed.pathname.split("/").filter(Boolean);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = segments[0] === "embed" ? segments[1] : parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}` : undefined;
    }

    if (parsed.hostname === "youtu.be") {
      return `https://youtu.be/${segments[0] ?? ""}`;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function normalizeTags(value: unknown, locale: SiteLocale) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => toStringValue(item))
    .filter(Boolean)
    .map((label) => {
      const key = toTagKey(label);
      return {
        key,
        label: localizeTagLabel(label, locale),
      };
    });
}

function normalizeVideo(value: unknown, locale: SiteLocale, index: number): LikedVideo | null {
  if (!isRecord(value)) return null;

  const video = value as LikedVideoJson;
  const embedUrl = toStringValue(video.embedUrl);

  return {
    id: toStringValue(video.id) || `liked-video-${index + 1}`,
    title: resolveLocalizedField(video.title, locale, `Liked Video ${index + 1}`),
    summary: resolveLocalizedField(video.summary, locale, ""),
    author: toStringValue(video.author) || (locale === "zh" ? "未知作者" : "Unknown author"),
    duration: toStringValue(video.duration) || "--",
    tags: normalizeTags(video.tags, locale),
    embedUrl: embedUrl || undefined,
    sourceUrl: embedUrl ? toSourceUrl(embedUrl) : undefined,
    aspectRatio: "16 / 9",
  };
}

export async function getLikedVideos(locale: SiteLocale): Promise<LikedVideo[]> {
  const entries = await fs.readdir(LIKED_VIDEOS_DIR).catch(() => []);
  const filenames = entries.filter((entry) => entry.endsWith(".json")).sort();

  const videos = await Promise.all(
    filenames.map(async (filename, index) => {
      const filePath = path.join(LIKED_VIDEOS_DIR, filename);

      try {
        const source = await fs.readFile(filePath, "utf8");
        return normalizeVideo(JSON.parse(source) as unknown, locale, index);
      } catch {
        return null;
      }
    }),
  );

  return videos
    .filter((video): video is LikedVideo => video !== null)
    .toSorted((left, right) => {
      const leftIndex = LIKED_VIDEO_ORDER.indexOf(left.id as (typeof LIKED_VIDEO_ORDER)[number]);
      const rightIndex = LIKED_VIDEO_ORDER.indexOf(right.id as (typeof LIKED_VIDEO_ORDER)[number]);
      const leftOrder = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
      const rightOrder = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

      if (leftOrder !== rightOrder) return leftOrder - rightOrder;
      return left.title.localeCompare(right.title);
    });
}
