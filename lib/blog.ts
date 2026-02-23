import { cache } from "react"
import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { postFrontmatterSchema } from "@/lib/blog.schema"
import type { AdjacentPosts, Post, PostKind } from "@/lib/blog.types"

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts")
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"])
const WORDS_PER_MINUTE = 220

function getReadingTimeMinutes(content: string) {
  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

function getSlug(fileName: string) {
  return fileName.replace(/\.(md|mdx)$/i, "")
}

function byNewestDate(first: Post, second: Post) {
  return new Date(second.date).getTime() - new Date(first.date).getTime()
}

function getFallbackExcerpt(content: string) {
  const firstParagraph = content
    .split("\n\n")
    .map((section) => section.trim())
    .find(Boolean)

  if (!firstParagraph) {
    return ""
  }

  return firstParagraph.replace(/\s+/g, " ").slice(0, 220)
}

async function parsePostFile(fileName: string): Promise<Post> {
  const extension = path.extname(fileName)

  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    throw new Error(`Unsupported file extension for ${fileName}`)
  }

  const fullPath = path.join(POSTS_DIRECTORY, fileName)
  const fileContent = await fs.readFile(fullPath, "utf8")
  const { data, content } = matter(fileContent)

  const rawFrontmatter = {
    ...data,
    excerpt: typeof data.excerpt === "string" && data.excerpt.trim().length > 0 ? data.excerpt : getFallbackExcerpt(content),
  }

  const frontmatter = postFrontmatterSchema.parse(rawFrontmatter)

  return {
    slug: getSlug(fileName),
    ...frontmatter,
    content: content.trim(),
    readingTimeMinutes: getReadingTimeMinutes(content),
  }
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const files = await fs.readdir(POSTS_DIRECTORY)
  const postFiles = files.filter((fileName) => SUPPORTED_EXTENSIONS.has(path.extname(fileName)))

  const posts = await Promise.all(postFiles.map((fileName) => parsePostFile(fileName)))
  return posts.sort(byNewestDate)
})

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => !post.draft)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPublishedPosts()
  return posts.find((post) => post.slug === slug) ?? null
}

export async function getPostsByKind(kind: PostKind): Promise<Post[]> {
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
