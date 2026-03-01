import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { POST_LOCALES } from '@/lib/postLocale'
import { getSiteUrl, siteConfig } from '@/lib/site'

export async function GET() {
  const siteUrl = getSiteUrl()

  const postSections: string[] = []

  for (const locale of POST_LOCALES) {
    const posts = await getAllPosts(locale)

    for (const post of posts) {
      const detail = await getPostBySlug(post.slug, locale)
      if (!detail) continue

      postSections.push(
        [
          `## ${detail.title}`,
          '',
          `- URL: ${siteUrl}/posts/${detail.slug}`,
          `- Date: ${detail.date}`,
          `- Language: ${locale}`,
          `- Type: ${detail.type}`,
          '',
          detail.content.trim(),
          '',
          '---',
        ].join('\n'),
      )
    }
  }

  const body = [
    `# ${siteConfig.name} - Full Content`,
    '',
    `> ${siteConfig.description}`,
    '',
    '---',
    '',
    postSections.join('\n\n'),
  ].join('\n')

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  })
}
