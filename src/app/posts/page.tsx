import PostsListClient from './PostsListClient'
import { getAllPosts } from '@/lib/posts'
import { getPostTranslator } from '@/lib/postMessages'
import { getPostDateLocale, resolvePostLocale } from '@/lib/postLocale'

type PostsPageProps = {
  searchParams: Promise<{ lang?: string }>
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

  return (
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
  )
}
