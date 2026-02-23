import type { Metadata } from "next"
import { BlogPageClient } from "@/components/blog/BlogPageClient"
import { getPublishedPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Writing | Arthur Oker",
  description: "Short notes and long-form articles on technology, philosophy, and software building.",
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  return <BlogPageClient posts={posts} />
}
