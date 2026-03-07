import { cache } from "react"
import {
  loadAllPostSummaries,
  loadPostPageDataBySlug,
  validatePostContent as runContentValidation,
} from "./blog-content.mjs"
import type { AdjacentPosts, PostKind, PostPageData, PostSummary } from "./blog.types"

export const getAllPosts = cache(async (): Promise<PostSummary[]> => {
  return (await loadAllPostSummaries()) as PostSummary[]
})

export async function validatePostContent() {
  return (await runContentValidation()) as {
    totalPosts: number
    markdownPosts: number
    mdxPosts: number
    posts: PostSummary[]
  }
}

export async function getPublishedPosts(): Promise<PostSummary[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => !post.draft)
}

export const getPostBySlug = cache(async (slug: string): Promise<PostPageData | null> => {
  const post = (await loadPostPageDataBySlug(slug)) as PostPageData | null

  if (!post || post.draft) {
    return null
  }

  return post
})

export async function getPostsByKind(kind: PostKind): Promise<PostSummary[]> {
  const posts = await getPublishedPosts()
  return posts.filter((post) => post.kind === kind)
}

export async function getAdjacentPosts(slug: string): Promise<AdjacentPosts> {
  const posts = await getPublishedPosts()
  const index = posts.findIndex((post) => post.slug === slug)

  if (index === -1) {
    return {
      newer: null,
      older: null,
    }
  }

  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  }
}
