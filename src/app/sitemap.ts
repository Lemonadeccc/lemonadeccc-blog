import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/posts'
import { getSiteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()
  const slugs = await getAllPostSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/rss.xml`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/rss-zh.xml`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = slugs.flatMap((slug) => [
    {
      url: `${siteUrl}/posts/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/posts/${slug}?lang=zh`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ])

  return [...staticRoutes, ...postRoutes]
}
