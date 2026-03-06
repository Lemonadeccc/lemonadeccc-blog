import { Suspense } from 'react'
import type { Metadata } from 'next'
import PostsListClient, { type PostsLabels } from './PostsListClient'
import { getAllPosts } from '@/lib/posts'
import { getPostTranslator } from '@/lib/postMessages'
import { getPostDateLocale, resolvePostLocale, withPostLocale } from '@/lib/postLocale'
import { getAllResources } from '@/lib/resources'
import { siteConfig, withSiteUrl } from '@/lib/site'

type PostsPageProps = {
  searchParams: Promise<{ lang?: string; view?: string }>
}

export const dynamic = 'force-static'

const getPostsMetadata = (lang: string | undefined, view: string | undefined): Metadata => {
  const locale = resolvePostLocale(lang)
  const isResourcesView = view === 'resources'
  const basePath = isResourcesView ? '/posts?view=resources' : '/posts'
  const path = withPostLocale(basePath, locale)
  const isChinese = locale === 'zh'
  const title = isChinese ? (isResourcesView ? '资源' : '文章') : isResourcesView ? 'Resources' : 'Posts'
  const description = isChinese
    ? isResourcesView
      ? `${siteConfig.authorName} 的视频资源集合，支持标签筛选与外链跳转。`
      : `${siteConfig.authorName} 的文章列表，包含 AI、动效与部署。`
    : isResourcesView
      ? `Curated video resources by ${siteConfig.authorName} with tag filtering and external links.`
      : `Browse posts by ${siteConfig.authorName} on AI, animation, and deployment.`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'en-US': basePath,
        'zh-CN': withPostLocale(basePath, 'zh'),
      },
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: 'website',
      url: withSiteUrl(path),
      locale: isChinese ? 'zh_CN' : 'en_US',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${siteConfig.name}`,
      description,
      creator: siteConfig.creatorHandle,
    },
  }
}

const mapLabels = (t: ReturnType<typeof getPostTranslator>): PostsLabels => ({
  title: t('posts.title'),
  viewPosts: t('posts.viewPosts'),
  viewResources: t('posts.viewResources'),
  language: t('posts.language'),
  english: t('posts.english'),
  chinese: t('posts.chinese'),
  filterByTag: t('posts.filterByTag'),
  allTags: t('posts.allTags'),
  resourceTypeVideo: t('posts.resourceTypeVideo'),
  author: t('posts.authorLabel'),
  duration: t('posts.durationLabel'),
  emptyResources: t('posts.emptyResources'),
})

export async function generateMetadata({ searchParams }: PostsPageProps): Promise<Metadata> {
  const { lang, view } = await searchParams
  return getPostsMetadata(lang, view)
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { lang, view } = await searchParams
  const locale = resolvePostLocale(lang)
  const isResourcesView = view === 'resources'
  const postsBasePath = isResourcesView ? '/posts?view=resources' : '/posts'
  const tEn = getPostTranslator('en')
  const tZh = getPostTranslator('zh')

  const enFormatter = new Intl.DateTimeFormat(getPostDateLocale('en'), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const zhFormatter = new Intl.DateTimeFormat(getPostDateLocale('zh'), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const [postsEn, postsZh, resourcesEn, resourcesZh] = await Promise.all([
    getAllPosts('en'),
    getAllPosts('zh'),
    getAllResources('en'),
    getAllResources('zh'),
  ])

  const activePosts = locale === 'zh' ? postsZh : postsEn
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: locale === 'zh' ? `${siteConfig.name} 文章` : `${siteConfig.name} Posts`,
    url: withSiteUrl(withPostLocale(postsBasePath, locale)),
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: siteConfig.authorUrl,
    },
    blogPost: activePosts.slice(0, 20).map((post) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replaceAll('</script>', '<\\/script>') }}
      />
      <Suspense>
        <PostsListClient
          postsEn={postsEn.map((post) => ({
            slug: post.slug,
            title: post.title,
            type: post.type,
            project: post.project,
            label: enFormatter.format(new Date(post.date)),
          }))}
          postsZh={postsZh.map((post) => ({
            slug: post.slug,
            title: post.title,
            type: post.type,
            project: post.project,
            label: zhFormatter.format(new Date(post.date)),
          }))}
          resourcesEn={resourcesEn}
          resourcesZh={resourcesZh}
          labelsEn={mapLabels(tEn)}
          labelsZh={mapLabels(tZh)}
        />
      </Suspense>
    </>
  )
}
