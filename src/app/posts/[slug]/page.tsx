import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { getPostTranslator } from '@/lib/postMessages'
import { getPostDateLocale, resolvePostLocale, withPostLocale } from '@/lib/postLocale'
import { siteConfig, withSiteUrl } from '@/lib/site'
import { getDefaultSocialImageUrl } from '@/lib/socialImage'
import BackToPostsButton from './BackToPostsButton'

type PostDetailPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}

const toIsoDate = (value: string) => {
  const timestamp = Date.parse(value)
  if (Number.isNaN(timestamp)) return undefined
  return new Date(timestamp).toISOString()
}

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params, searchParams }: PostDetailPageProps): Promise<Metadata> {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams])
  const locale = resolvePostLocale(lang)
  const t = getPostTranslator(locale)
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: `${t('postDetail.postNotFound')} | Lemonadeccc`,
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const postPath = withPostLocale(`/posts/${slug}`, locale)
  const description = post.summary || post.project
  const imageUrl = post.image ? withSiteUrl(post.image) : getDefaultSocialImageUrl()
  const publishedTime = toIsoDate(post.date)

  return {
    title: post.title,
    description,
    alternates: {
      canonical: postPath,
      languages: {
        'en-US': `/posts/${slug}`,
        'zh-CN': `/posts/${slug}?lang=zh`,
      },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: withSiteUrl(postPath),
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
      publishedTime,
      modifiedTime: post.updated ? toIsoDate(post.updated) : publishedTime,
      authors: [siteConfig.authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      creator: siteConfig.creatorHandle,
      images: [imageUrl],
    },
  }
}

export default async function PostDetailPage({ params, searchParams }: PostDetailPageProps) {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams])
  const locale = resolvePostLocale(lang)
  const t = getPostTranslator(locale)
  const post = await getPostBySlug(slug, locale)

  if (!post) notFound()

  const dateFormatter = new Intl.DateTimeFormat(getPostDateLocale(locale), {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })

  const postsHref = withPostLocale('/posts', locale)
  const englishHref = withPostLocale(`/posts/${slug}`, 'en')
  const chineseHref = withPostLocale(`/posts/${slug}`, 'zh')
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || post.project,
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.updated || post.date),
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    articleSection: post.type,
    mainEntityOfPage: withSiteUrl(withPostLocale(`/posts/${slug}`, locale)),
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: siteConfig.authorUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: siteConfig.authorUrl,
    },
    image: [post.image ? withSiteUrl(post.image) : getDefaultSocialImageUrl()],
    keywords: [post.type, post.project].filter(Boolean).join(', '),
  }

  return (
    <article className="flex-1 bg-bg text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd).replaceAll('</script>', '<\\/script>') }}
      />
      <div className="app-container w-full max-w-[1100px] px-4 pt-8 pb-24 sm:px-6 md:px-10 md:pt-12 md:pb-12">
        <div className="mb-6 flex flex-wrap items-center justify-end gap-2 text-[12px] uppercase tracking-[0.08em] text-text-secondary md:text-[13px]">
          <span>{t('posts.language')}</span>
          <Link
            href={englishHref}
            className={`border px-2 py-1 transition-colors ${locale === 'en' ? 'border-text text-text' : 'border-[var(--theme-border)] text-text-secondary hover:border-text hover:text-text'
              }`}
          >
            {t('posts.english')}
          </Link>
          <Link
            href={chineseHref}
            className={`border px-2 py-1 transition-colors ${locale === 'zh' ? 'border-text text-text' : 'border-[var(--theme-border)] text-text-secondary hover:border-text hover:text-text'
              }`}
          >
            {t('posts.chinese')}
          </Link>
        </div>

        <BackToPostsButton
          postsHref={postsHref}
          backToPostsLabel={t('postDetail.backToPosts')}
          backToTopLabel={t('postDetail.backToTop')}
        />

        <header className="mb-8 border-b border-[var(--theme-border)] pb-6 md:mb-10 md:pb-8">
          <p className="text-[12px] uppercase tracking-[0.08em] text-text-secondary md:text-[14px]">
            {post.type} / <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
          </p>
          <h1 className="mt-4 text-[30px] leading-[1.05] sm:text-[36px] md:text-[48px]">{post.title}</h1>
          {post.summary && (
            <p className="mt-5 max-w-[75ch] text-[16px] leading-[1.7] text-text-secondary md:text-[18px]">
              {post.summary}
            </p>
          )}
        </header>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </div>
    </article>
  )
}
