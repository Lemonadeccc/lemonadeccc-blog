import { buildPostRssXml } from '@/lib/rss'
import { getSiteUrl } from '@/lib/site'

export async function GET() {
  const origin = getSiteUrl()
  const xml = await buildPostRssXml({ origin, locale: 'en' })

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  })
}
