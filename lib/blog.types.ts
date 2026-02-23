export type PostKind = "note" | "article"

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

export interface Post extends PostFrontmatter {
  slug: string
  content: string
  readingTimeMinutes: number
}

export interface AdjacentPosts {
  newer: Post | null
  older: Post | null
}
