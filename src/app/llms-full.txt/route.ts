import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { POST_LOCALES, withPostLocale } from '@/lib/postLocale'
import { getSiteUrl, siteConfig } from '@/lib/site'

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = getSiteUrl()

  const postSections: string[] = []

  const localeResults = await Promise.all(
    POST_LOCALES.map(async (locale) => {
      const posts = await getAllPosts(locale)

      const details = await Promise.all(
        posts.map((post) => getPostBySlug(post.slug, locale))
      )

      return details
        .filter((detail): detail is NonNullable<typeof detail> => detail !== null)
        .map((detail) =>
          [
            `## ${detail.title}`,
            '',
            `- URL: ${siteUrl}${withPostLocale(`/posts/${detail.slug}`, locale)}`,
            `- Date: ${detail.date}`,
            `- Language: ${locale}`,
            `- Type: ${detail.type}`,
            '',
            detail.content.trim(),
            '',
            '---',
          ].join('\n')
        )
    })
  )

  localeResults.forEach((sections) => postSections.push(...sections))

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
