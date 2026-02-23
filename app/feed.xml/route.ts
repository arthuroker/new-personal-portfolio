import { getPublishedPosts } from "@/lib/blog"
import { absoluteUrl, siteConfig } from "@/lib/site"

export const revalidate = 3600

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = await getPublishedPosts()

  const items = posts
    .map((post) => {
      const postUrl = absoluteUrl(`/blog/${post.slug}`)
      const description = escapeXml(post.excerpt)
      const content = escapeXml(post.content)

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${postUrl}</link>
          <guid>${postUrl}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${description}</description>
          <content:encoded><![CDATA[${content}]]></content:encoded>
        </item>
      `
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <description>${escapeXml(siteConfig.description)}</description>
        <link>${siteConfig.url}</link>
        <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
