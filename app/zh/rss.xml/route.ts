import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://lemonadec.cc";

export async function GET() {
  const posts = await getAllPosts("zh");

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/zh/archive/posts/${post.slug}`;
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lemonadeccc（中文）</title>
    <link>${SITE_URL}/zh</link>
    <description>分享 AI 与开发相关文章。</description>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}/zh/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
