import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostPageClient } from "@/components/blog/BlogPostPageClient"
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer"
import { getAdjacentPosts, getPostBySlug, getPublishedPosts } from "@/lib/blog"
import { absoluteUrl } from "@/lib/site"

export const revalidate = 3600

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found | Arthur Oker",
    }
  }

  const postUrl = absoluteUrl(`/blog/${post.slug}`)

  return {
    title: `${post.title} | Arthur Oker`,
    description: post.excerpt,
    alternates: {
      canonical: post.canonicalUrl || postUrl,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { newer, older } = await getAdjacentPosts(slug)

  return (
    <BlogPostPageClient post={post} newer={newer} older={older}>
      <MarkdownRenderer content={post.content} />
    </BlogPostPageClient>
  )
}
