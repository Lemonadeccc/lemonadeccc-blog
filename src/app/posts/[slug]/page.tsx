import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import BackToPostsButton from './BackToPostsButton'

type PostDetailPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-static'
export const dynamicParams = false

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
})

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Lemonadeccc',
    }
  }

  return {
    title: `${post.title} | Lemonadeccc`,
    description: post.summary || post.project,
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

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

  return (
    <article className="flex-1 bg-bg text-text">
      <div className="app-container w-full max-w-[1100px] px-6 py-8 md:px-10 md:py-12">
        <BackToPostsButton />

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
