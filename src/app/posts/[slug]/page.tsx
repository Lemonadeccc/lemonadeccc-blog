import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { getPostTranslator } from '@/lib/postMessages'
import { getPostDateLocale, resolvePostLocale, withPostLocale } from '@/lib/postLocale'
import BackToPostsButton from './BackToPostsButton'

type PostDetailPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}

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
    }
  }

  return {
    title: `${post.title} | Lemonadeccc`,
    description: post.summary || post.project,
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

  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'append' }],
          [rehypePrettyCode, { theme: 'github-dark', keepBackground: false }],
        ],
      },
    },
  })

  const postsHref = withPostLocale('/posts', locale)
  const englishHref = withPostLocale(`/posts/${slug}`, 'en')
  const chineseHref = withPostLocale(`/posts/${slug}`, 'zh')

  return (
    <article className="flex-1 bg-bg text-text">
      <div className="app-container w-full max-w-[1100px] px-6 py-8 md:px-10 md:py-12">
        <div className="mb-6 flex items-center justify-end gap-2 text-[12px] uppercase tracking-[0.08em] text-text-secondary md:text-[13px]">
          <span>{t('posts.language')}</span>
          <Link
            href={englishHref}
            className={`border px-2 py-1 transition-colors ${
              locale === 'en' ? 'border-white text-white' : 'border-white/35 text-text-secondary hover:border-white hover:text-white'
            }`}
          >
            {t('posts.english')}
          </Link>
          <Link
            href={chineseHref}
            className={`border px-2 py-1 transition-colors ${
              locale === 'zh' ? 'border-white text-white' : 'border-white/35 text-text-secondary hover:border-white hover:text-white'
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

        <header className="mb-10 border-b border-white/30 pb-8">
          <p className="text-[14px] uppercase tracking-[0.08em] text-text-secondary">
            {post.type} / {dateFormatter.format(new Date(post.date))}
          </p>
          <h1 className="mt-4 text-[40px] leading-[1] md:text-[72px]">{post.title}</h1>
          {post.summary && (
            <p className="mt-5 max-w-[75ch] text-[18px] leading-[1.7] text-text-secondary">
              {post.summary}
            </p>
          )}
        </header>

        <div className="post-content">{content}</div>
      </div>
    </article>
  )
}
