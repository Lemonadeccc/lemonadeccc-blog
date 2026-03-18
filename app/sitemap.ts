import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/posts";
import { allProjects } from "@/lib/data";

const SITE_URL = "https://lemonadec.cc";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPostSlugs();

  const postUrls = slugs.flatMap((slug) => [
    {
      url: `${SITE_URL}/archive/posts/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/zh/archive/posts/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  const workUrls = allProjects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const staticPages = [
    { url: SITE_URL, priority: 1.0 },
    { url: `${SITE_URL}/archive`, priority: 0.9 },
    { url: `${SITE_URL}/info`, priority: 0.8 },
    { url: `${SITE_URL}/contact`, priority: 0.7 },
    { url: `${SITE_URL}/work`, priority: 0.8 },
    { url: `${SITE_URL}/zh`, priority: 1.0 },
    { url: `${SITE_URL}/zh/archive`, priority: 0.9 },
    { url: `${SITE_URL}/zh/info`, priority: 0.8 },
    { url: `${SITE_URL}/zh/contact`, priority: 0.7 },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  return [...staticPages, ...postUrls, ...workUrls];
}
