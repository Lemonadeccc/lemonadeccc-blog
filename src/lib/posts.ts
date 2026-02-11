import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

type RawFrontmatter = {
  title?: unknown
  type?: unknown
  project?: unknown
  date?: unknown
  summary?: unknown
  image?: unknown
}

export type PostListItem = {
  slug: string
  title: string
  type: string
  project: string
  date: string
  summary: string
  image?: string
}

export type PostDetail = PostListItem & {
  content: string
}

const isMarkdownFile = (name: string) => /\.(md|mdx)$/i.test(name)

const toStringField = (value: unknown, fallback: string) =>
  typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback

const toOptionalStringField = (value: unknown) =>
  typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined

const toDateField = (value: unknown, fallback: string) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Date.parse(value.trim())
    if (!Number.isNaN(parsed)) {
      return new Date(parsed).toISOString().slice(0, 10)
    }

    return value.trim()
  }

  return fallback
}

const sortByDateDesc = (a: PostListItem, b: PostListItem) => {
  const aTime = Number.isNaN(Date.parse(a.date)) ? 0 : Date.parse(a.date)
  const bTime = Number.isNaN(Date.parse(b.date)) ? 0 : Date.parse(b.date)
  return bTime - aTime
}

const buildPost = (slug: string, source: string): PostDetail => {
  const parsed = matter(source)
  const data = parsed.data as RawFrontmatter

  const title = toStringField(data.title, slug)
  const type = toStringField(data.type, 'Article')
  const project = toStringField(data.project, title)
  const date = toDateField(data.date, '1970-01-01')
  const summary = toStringField(data.summary, '')
  const image = toOptionalStringField(data.image)

  return {
    slug,
    title,
    type,
    project,
    date,
    summary,
    image,
    content: parsed.content,
  }
}

export const getAllPosts = async (): Promise<PostListItem[]> => {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true }).catch(() => [])

  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
      .map(async (entry) => {
        const slug = entry.name.replace(/\.(md|mdx)$/i, '')
        const source = await fs.readFile(path.join(POSTS_DIR, entry.name), 'utf8')
        const post = buildPost(slug, source)
        return {
          slug: post.slug,
          title: post.title,
          type: post.type,
          project: post.project,
          date: post.date,
          summary: post.summary,
          image: post.image,
        }
      }),
  )

  return posts.sort(sortByDateDesc)
}

export const getPostBySlug = async (slug: string): Promise<PostDetail | null> => {
  const candidates = [`${slug}.mdx`, `${slug}.md`]

  for (const fileName of candidates) {
    const absolutePath = path.join(POSTS_DIR, fileName)
    try {
      const source = await fs.readFile(absolutePath, 'utf8')
      return buildPost(slug, source)
    } catch {
      continue
    }
  }

  return null
}
