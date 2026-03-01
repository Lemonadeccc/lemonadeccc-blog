import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { DEFAULT_POST_LOCALE, POST_LOCALES, type PostLocale } from './postLocale'

const POSTS_ROOT_DIR = path.join(process.cwd(), 'content', 'posts')

type RawFrontmatter = {
  title?: unknown
  type?: unknown
  project?: unknown
  date?: unknown
  updated?: unknown
  summary?: unknown
  image?: unknown
}

export type PostListItem = {
  slug: string
  title: string
  type: string
  project: string
  date: string
  updated?: string
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

const getLocaleDir = (locale: PostLocale) => path.join(POSTS_ROOT_DIR, locale)

const buildPost = (slug: string, source: string): PostDetail => {
  const parsed = matter(source)
  const data = parsed.data as RawFrontmatter

  const title = toStringField(data.title, slug)
  const type = toStringField(data.type, 'Article')
  const project = toStringField(data.project, title)
  const date = toDateField(data.date, '1970-01-01')
  const updated = data.updated != null ? toDateField(data.updated, date) : undefined
  const summary = toStringField(data.summary, '')
  const image = toOptionalStringField(data.image)

  return {
    slug,
    title,
    type,
    project,
    date,
    updated,
    summary,
    image,
    content: parsed.content,
  }
}

const readLocaleEntries = async (locale: PostLocale) => {
  const localeDir = getLocaleDir(locale)
  return fs.readdir(localeDir, { withFileTypes: true }).catch(() => [])
}

const readPostFromLocale = async (slug: string, locale: PostLocale): Promise<PostDetail | null> => {
  const candidates = [`${slug}.mdx`, `${slug}.md`]
  const localeDir = getLocaleDir(locale)

  for (const fileName of candidates) {
    const absolutePath = path.join(localeDir, fileName)
    try {
      const source = await fs.readFile(absolutePath, 'utf8')
      return buildPost(slug, source)
    } catch {
      continue
    }
  }

  return null
}

export const getAllPostSlugs = async (): Promise<string[]> => {
  const slugSet = new Set<string>()

  await Promise.all(
    POST_LOCALES.map(async (locale) => {
      const entries = await readLocaleEntries(locale)
      entries
        .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
        .forEach((entry) => {
          slugSet.add(entry.name.replace(/\.(md|mdx)$/i, ''))
        })
    }),
  )

  return Array.from(slugSet).sort((a, b) => a.localeCompare(b))
}

export const getAllPosts = async (locale: PostLocale = DEFAULT_POST_LOCALE): Promise<PostListItem[]> => {
  const entries = await readLocaleEntries(locale)

  const activeEntries =
    entries.length === 0 && locale !== DEFAULT_POST_LOCALE
      ? await readLocaleEntries(DEFAULT_POST_LOCALE)
      : entries

  const activeLocale =
    entries.length === 0 && locale !== DEFAULT_POST_LOCALE ? DEFAULT_POST_LOCALE : locale

  const posts = await Promise.all(
    activeEntries
      .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
      .map(async (entry) => {
        const slug = entry.name.replace(/\.(md|mdx)$/i, '')
        const source = await fs.readFile(path.join(getLocaleDir(activeLocale), entry.name), 'utf8')
        const post = buildPost(slug, source)
        return {
          slug: post.slug,
          title: post.title,
          type: post.type,
          project: post.project,
          date: post.date,
          updated: post.updated,
          summary: post.summary,
          image: post.image,
        }
      }),
  )

  return posts.sort(sortByDateDesc)
}

export const getPostBySlug = async (
  slug: string,
  locale: PostLocale = DEFAULT_POST_LOCALE,
): Promise<PostDetail | null> => {
  const localizedPost = await readPostFromLocale(slug, locale)
  if (localizedPost) return localizedPost

  if (locale !== DEFAULT_POST_LOCALE) {
    return readPostFromLocale(slug, DEFAULT_POST_LOCALE)
  }

  return null
}
