import { DEFAULT_POST_LOCALE, type PostLocale } from './postLocale'
import postsData from '@/generated/posts-data.json'

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
  htmlContent: string
}

type PostsDataJson = {
  postsEn: PostListItem[]
  postsZh: PostListItem[]
  slugs: string[]
  postDetailsEn: Record<string, PostDetail>
  postDetailsZh: Record<string, PostDetail>
}

const data = postsData as unknown as PostsDataJson

export const getAllPostSlugs = async (): Promise<string[]> => {
  return data.slugs
}

export const getAllPosts = async (locale: PostLocale = DEFAULT_POST_LOCALE): Promise<PostListItem[]> => {
  const posts = locale === 'zh' ? data.postsZh : data.postsEn
  if (posts.length > 0) return posts

  // Fallback to default locale if requested locale has no posts
  if (locale !== DEFAULT_POST_LOCALE) return data.postsEn

  return []
}

export const getPostBySlug = async (
  slug: string,
  locale: PostLocale = DEFAULT_POST_LOCALE,
): Promise<PostDetail | null> => {
  const details = locale === 'zh' ? data.postDetailsZh : data.postDetailsEn
  const post = details[slug]
  if (post) return post

  // Fallback to default locale
  if (locale !== DEFAULT_POST_LOCALE) {
    return data.postDetailsEn[slug] ?? null
  }

  return null
}
