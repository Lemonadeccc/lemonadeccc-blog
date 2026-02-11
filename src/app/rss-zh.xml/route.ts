import { buildPostRssXml } from '@/lib/rss'

export async function GET(request: Request) {
  const origin = new URL(request.url).origin
  const xml = await buildPostRssXml({ origin, locale: 'zh' })

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  })
}
