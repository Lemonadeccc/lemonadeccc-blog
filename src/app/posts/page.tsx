import type { Metadata } from 'next'
import PostsListClient from './PostsListClient'
import { getAllPosts } from '@/lib/posts'
import { getPostTranslator } from '@/lib/postMessages'
import { DEFAULT_POST_LOCALE, getPostDateLocale, resolvePostLocale, withPostLocale } from '@/lib/postLocale'
import { getAllResources } from '@/lib/resources'
import { siteConfig, withSiteUrl } from '@/lib/site'

type PostsPageProps = {
  searchParams: Promise<{ lang?: string; view?: string }>
}

export async function generateMetadata({ searchParams }: PostsPageProps): Promise<Metadata> {
  const { lang, view } = await searchParams
  const locale = resolvePostLocale(lang)
  const isResourcesView = view === 'resources'
  const path = withPostLocale(isResourcesView ? '/posts?view=resources' : '/posts', locale)
  const isChinese = locale === 'zh'
  const title = isChinese ? (isResourcesView ? '资源' : '文章') : isResourcesView ? 'Resources' : 'Posts'
  const description = isChinese
    ? isResourcesView
      ? `${siteConfig.authorName} 的视频资源集合，支持标签筛选与外链跳转。`
      : `${siteConfig.authorName} 的文章列表，包含 AI、动效与部署。`
    : isResourcesView
      ? `Curated video resources by ${siteConfig.authorName} with tag filtering and external links.`
      : `Browse posts by ${siteConfig.authorName} on AI, development.`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'en-US': isResourcesView ? '/posts?view=resources' : '/posts',
        'zh-CN': isResourcesView ? '/posts?view=resources&lang=zh' : '/posts?lang=zh',
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
  const { lang, view } = await searchParams
  const locale = resolvePostLocale(lang)
  const initialView = view === 'resources' ? 'resources' : 'posts'
  const t = getPostTranslator(locale)

  const dateFormatter = new Intl.DateTimeFormat(getPostDateLocale(locale), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const [posts, resources] = await Promise.all([getAllPosts(locale), getAllResources(locale)])
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replaceAll('</script>', '<\\/script>') }}
      />
      <PostsListClient
        locale={locale}
        title={t('posts.title')}
        initialView={initialView}
        viewPostsLabel={t('posts.viewPosts')}
        viewResourcesLabel={t('posts.viewResources')}
        languageLabel={t('posts.language')}
        englishLabel={t('posts.english')}
        chineseLabel={t('posts.chinese')}
        filterByTagLabel={t('posts.filterByTag')}
        allTagsLabel={t('posts.allTags')}
        resourceTypeVideoLabel={t('posts.resourceTypeVideo')}
        authorLabel={t('posts.authorLabel')}
        durationLabel={t('posts.durationLabel')}
        emptyResourcesLabel={t('posts.emptyResources')}
        posts={posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          type: post.type,
          project: post.project,
          label: dateFormatter.format(new Date(post.date)),
        }))}
        resources={resources}
      />
    </>
  )
}
