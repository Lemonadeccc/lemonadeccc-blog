import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  DEFAULT_POST_LOCALE,
  getPostsDirForLocale,
  type PostLocale,
} from "./postLocale";

export type PostMeta = {
  slug: string;
  title: string;
  type: string;
  date: string;
  summary: string;
  image?: string;
};

export type PostDetail = PostMeta & { content: string };

function normalizeDate(value: unknown): string {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim()) {
    const t = Date.parse(value.trim());
    if (!isNaN(t)) return new Date(t).toISOString().slice(0, 10);
  }
  return "1970-01-01";
}

const isMdx = (name: string) => /\.(md|mdx)$/i.test(name);

async function readEntries(locale: PostLocale) {
  const dir = getPostsDirForLocale(locale);
  return fs.readdir(dir, { withFileTypes: true }).catch(() => []);
}

export async function getAllPosts(
  locale: PostLocale = DEFAULT_POST_LOCALE
): Promise<PostMeta[]> {
  let entries = await readEntries(locale);
  let activeLocale = locale;
  if (entries.length === 0 && locale !== DEFAULT_POST_LOCALE) {
    entries = await readEntries(DEFAULT_POST_LOCALE);
    activeLocale = DEFAULT_POST_LOCALE;
  }
  const dir = getPostsDirForLocale(activeLocale);
  const posts = await Promise.all(
    entries
      .filter((e) => e.isFile() && isMdx(e.name))
      .map(async (e) => {
        const src = await fs.readFile(path.join(dir, e.name), "utf8");
        const { data } = matter(src);
        const slug = e.name.replace(/\.(md|mdx)$/i, "");
        return {
          slug,
          title: typeof data.title === "string" ? data.title : slug,
          type: typeof data.type === "string" ? data.type : "Article",
          date: normalizeDate(data.date),
          summary: typeof data.summary === "string" ? data.summary : "",
          image: typeof data.image === "string" ? data.image : undefined,
        };
      })
  );
  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugSet = new Set<string>();
  await Promise.all(
    (["en", "zh"] as PostLocale[]).map(async (locale) => {
      const entries = await readEntries(locale);
      entries
        .filter((e) => e.isFile() && isMdx(e.name))
        .forEach((e) => slugSet.add(e.name.replace(/\.(md|mdx)$/i, "")));
    })
  );
  return Array.from(slugSet).sort();
}

export async function getPostBySlug(
  slug: string,
  locale: PostLocale = DEFAULT_POST_LOCALE
): Promise<PostDetail | null> {
  for (const loc of [locale, DEFAULT_POST_LOCALE] as PostLocale[]) {
    const dir = getPostsDirForLocale(loc);
    for (const ext of [".mdx", ".md"]) {
      try {
        const src = await fs.readFile(path.join(dir, `${slug}${ext}`), "utf8");
        const { data, content } = matter(src);
        return {
          slug,
          title: typeof data.title === "string" ? data.title : slug,
          type: typeof data.type === "string" ? data.type : "Article",
          date: normalizeDate(data.date),
          summary: typeof data.summary === "string" ? data.summary : "",
          image: typeof data.image === "string" ? data.image : undefined,
          content,
        };
      } catch {
        continue;
      }
    }
    if (loc === locale && locale === DEFAULT_POST_LOCALE) break;
  }
  return null;
}
