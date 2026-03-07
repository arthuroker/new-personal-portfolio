export type PostKind = "note" | "article"
export type PostFormat = "md" | "mdx"
export type PostRenderMode = "html" | "mdx"

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  kind: PostKind
  tags: string[]
  draft: boolean
  canonicalUrl?: string
  coverImage?: string
}

export interface PostSummary extends PostFrontmatter {
  slug: string
  readingTimeMinutes: number
  format: PostFormat
}

export interface HtmlPostPageData extends PostSummary {
  renderMode: "html"
  html: string
}

export interface MdxPostPageData extends PostSummary {
  renderMode: "mdx"
  source: string
}

export type PostPageData = HtmlPostPageData | MdxPostPageData

export interface AdjacentPosts {
  newer: PostSummary | null
  older: PostSummary | null
}
