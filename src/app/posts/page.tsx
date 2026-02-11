import type { Metadata } from 'next'
import PostsListClient from './PostsListClient'
import { getAllPosts } from '@/lib/posts'
import { getPostTranslator } from '@/lib/postMessages'
import { DEFAULT_POST_LOCALE, getPostDateLocale, resolvePostLocale, withPostLocale } from '@/lib/postLocale'
import { siteConfig, withSiteUrl } from '@/lib/site'

type PostsPageProps = {
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PostsPageProps): Promise<Metadata> {
  const { lang } = await searchParams
  const locale = resolvePostLocale(lang)
  const path = withPostLocale('/posts', locale)
  const isChinese = locale === 'zh'
  const title = isChinese ? '文章' : 'Posts'
  const description = isChinese
    ? `${siteConfig.authorName} 的文章列表，包含 AI、动效与部署。`
    : `Browse posts by ${siteConfig.authorName} on AI, animation, and deployment.`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'en-US': '/posts',
        'zh-CN': '/posts?lang=zh',
      },
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: 'website',
      url: withSiteUrl(path),
      locale: isChinese ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${siteConfig.name}`,
      description,
      creator: siteConfig.creatorHandle,
    },
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { lang } = await searchParams
  const locale = resolvePostLocale(lang)
  const t = getPostTranslator(locale)

  const dateFormatter = new Intl.DateTimeFormat(getPostDateLocale(locale), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const posts = await getAllPosts(locale)
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: locale === DEFAULT_POST_LOCALE ? `${siteConfig.name} Posts` : `${siteConfig.name} 文章`,
    url: withSiteUrl(withPostLocale('/posts', locale)),
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: siteConfig.authorUrl,
    },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: withSiteUrl(withPostLocale(`/posts/${post.slug}`, locale)),
      datePublished: post.date,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <PostsListClient
        locale={locale}
        title={t('posts.title')}
        languageLabel={t('posts.language')}
        englishLabel={t('posts.english')}
        chineseLabel={t('posts.chinese')}
        posts={posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          type: post.type,
          project: post.project,
          label: dateFormatter.format(new Date(post.date)),
        }))}
      />
    </>
  )
}
