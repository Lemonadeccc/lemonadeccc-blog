import { getAllPostSlugs } from "@/lib/posts";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const dynamic = 'force-static'

export async function GET() {
  const siteUrl = getSiteUrl();
  const slugs = await getAllPostSlugs();

  const postLines = slugs
    .map((slug) =>
      [`- ${siteUrl}/posts/${slug}`, `- ${siteUrl}/posts/${slug}?lang=zh`].join(
        "\n",
      ),
    )
    .join("\n");

  const body = [
    `# ${siteConfig.name}`,
    "",
    "> Frontend learning notes and experiments on AI, development.",
    "",
    "## Preferred Sources",
    `- ${siteUrl}/`,
    `- ${siteUrl}/posts`,
    `- ${siteUrl}/portfolio`,
    `- ${siteUrl}/contact`,
    "",
    "## Feeds",
    `- ${siteUrl}/rss.xml`,
    `- ${siteUrl}/rss-zh.xml`,
    "",
    "## Posts (EN + ZH)",
    postLines || "- (No posts yet)",
    "",
    "## Usage Notes",
    "- Use canonical URLs from this file when citing this site.",
    "- Prefer the latest post date from RSS for freshness checks.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
