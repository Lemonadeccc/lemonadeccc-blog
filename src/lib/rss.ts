import { Feed } from 'feed'
import { getAllPosts } from '@/lib/posts'
import { DEFAULT_POST_LOCALE, type PostLocale, withPostLocale } from '@/lib/postLocale'
import { siteConfig } from '@/lib/site'

type BuildPostRssXmlOptions = {
  locale?: PostLocale
  origin: string
}

const toSafeDate = (value: string) => {
  const timestamp = Date.parse(value)
  if (Number.isNaN(timestamp)) return new Date()
  return new Date(timestamp)
}

const getFeedMeta = (locale: PostLocale) => {
  if (locale === 'zh') {
    return {
      title: `${siteConfig.name} 文章`,
      description: `${siteConfig.name} 的中文文章订阅`,
      language: 'zh-CN',
      rssPath: '/rss-zh.xml',
    }
  }

  return {
    title: `${siteConfig.name} Posts`,
    description: `Subscribe to the latest posts from ${siteConfig.name}.`,
    language: 'en-US',
    rssPath: '/rss.xml',
  }
}

export const buildPostRssXml = async ({
  locale = DEFAULT_POST_LOCALE,
  origin,
}: BuildPostRssXmlOptions) => {
  const feedMeta = getFeedMeta(locale)
  const posts = await getAllPosts(locale)
  const updated = posts.length > 0 ? toSafeDate(posts[0].date) : new Date()

  const feed = new Feed({
    id: `${origin}/`,
    link: `${origin}/`,
    title: feedMeta.title,
    description: feedMeta.description,
    language: feedMeta.language,
    favicon: `${origin}/favicon.png`,
    updated,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    feedLinks: {
      rss2: `${origin}${feedMeta.rssPath}`,
    },
    author: {
      name: siteConfig.name,
    },
  })

  posts.forEach((post) => {
    const postPath = withPostLocale(`/posts/${post.slug}`, locale)
    const postUrl = `${origin}${postPath}`

    feed.addItem({
      id: postUrl,
      title: post.title,
      link: postUrl,
      description: post.summary || post.project,
      content: post.summary || post.project,
      date: toSafeDate(post.date),
      category: [{ name: post.type }],
    })
  })

  return feed.rss2()
}
