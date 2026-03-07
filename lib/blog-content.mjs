import { promises as fs } from "node:fs"
import path from "node:path"
import { parseISO } from "date-fns"
import matter from "gray-matter"
import { ZodError } from "zod"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { visit } from "unist-util-visit"
import { postFrontmatterSchema } from "./blog-schema.mjs"

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts")
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"])
const WORDS_PER_MINUTE = 220
const SLUG_PATTERN = /^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/

function getReadingTimeMinutes(content) {
  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

function getSlug(fileName) {
  return fileName.replace(/\.(md|mdx)$/i, "")
}

function getFormat(fileName) {
  return path.extname(fileName) === ".mdx" ? "mdx" : "md"
}

function byNewestDate(first, second) {
  return parseISO(second.date).getTime() - parseISO(first.date).getTime()
}

function getFallbackExcerpt(content) {
  const firstParagraph = content
    .split("\n\n")
    .map((section) => section.trim())
    .find(Boolean)

  if (!firstParagraph) {
    return ""
  }

  return firstParagraph.replace(/\s+/g, " ").slice(0, 220)
}

function formatValidationError(error) {
  return error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.join(".") : "frontmatter"
      return `${field}: ${issue.message}`
    })
    .join("; ")
}

function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") {
        return
      }

      const href = node.properties?.href

      if (typeof href !== "string" || !href.startsWith("http")) {
        return
      }

      node.properties = {
        ...node.properties,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    })
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;")
}

function toAttributeName(name) {
  if (name === "className") {
    return "class"
  }

  return name.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

function serializeProperties(properties = {}) {
  return Object.entries(properties)
    .flatMap(([key, value]) => {
      if (value === false || value == null) {
        return []
      }

      const attributeName = toAttributeName(key)

      if (value === true) {
        return [attributeName]
      }

      const attributeValue = Array.isArray(value) ? value.join(" ") : String(value)
      return [`${attributeName}="${escapeAttribute(attributeValue)}"`]
    })
    .join(" ")
}

function serializeNode(node) {
  if (node.type === "root") {
    return (node.children ?? []).map(serializeNode).join("")
  }

  if (node.type === "text") {
    return escapeHtml(node.value ?? "")
  }

  if (node.type === "element") {
    const openingAttributes = serializeProperties(node.properties)
    const openingTag = openingAttributes.length > 0 ? `<${node.tagName} ${openingAttributes}>` : `<${node.tagName}>`
    const children = (node.children ?? []).map(serializeNode).join("")

    return `${openingTag}${children}</${node.tagName}>`
  }

  return ""
}

async function renderMarkdownToHtml(content) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaLabel: "Link to section" },
    })
    .use(rehypeExternalLinks)

  const tree = processor.parse(content)
  const hastTree = await processor.run(tree)
  return serializeNode(hastTree)
}

async function readPostSource(fileName) {
  const extension = path.extname(fileName)

  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    throw new Error(`Unsupported file extension for ${fileName}`)
  }

  const fullPath = path.join(POSTS_DIRECTORY, fileName)
  const displayPath = path.relative(process.cwd(), fullPath)
  const slug = getSlug(fileName)

  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid post slug in ${displayPath}: "${slug}". Use a date-first lowercase slug like YYYY-MM-DD-your-slug.`,
    )
  }

  try {
    const fileContent = await fs.readFile(fullPath, "utf8")
    const { data, content } = matter(fileContent)

    const rawFrontmatter = {
      ...data,
      excerpt: typeof data.excerpt === "string" && data.excerpt.trim().length > 0 ? data.excerpt : getFallbackExcerpt(content),
    }

    const frontmatter = postFrontmatterSchema.parse(rawFrontmatter)

    return {
      fileName,
      slug,
      format: getFormat(fileName),
      frontmatter,
      content: content.trim(),
      readingTimeMinutes: getReadingTimeMinutes(content),
    }
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Invalid post frontmatter in ${displayPath}: ${formatValidationError(error)}`)
    }

    if (error instanceof Error) {
      throw new Error(`Failed to parse post ${displayPath}: ${error.message}`)
    }

    throw new Error(`Failed to parse post ${displayPath}`)
  }
}

function toPostSummary(postSource) {
  return {
    slug: postSource.slug,
    ...postSource.frontmatter,
    readingTimeMinutes: postSource.readingTimeMinutes,
    format: postSource.format,
  }
}

async function toPostPageData(postSource) {
  const summary = toPostSummary(postSource)

  if (postSource.format === "mdx") {
    return {
      ...summary,
      renderMode: "mdx",
      source: postSource.content,
    }
  }

  return {
    ...summary,
    renderMode: "html",
    html: await renderMarkdownToHtml(postSource.content),
  }
}

async function getPostFiles() {
  const files = await fs.readdir(POSTS_DIRECTORY)
  return files.filter((fileName) => SUPPORTED_EXTENSIONS.has(path.extname(fileName)))
}

export async function loadAllPostSummaries() {
  const postFiles = await getPostFiles()
  const postSources = await Promise.all(postFiles.map((fileName) => readPostSource(fileName)))
  return postSources.map(toPostSummary).sort(byNewestDate)
}

export async function loadPostPageDataBySlug(slug) {
  const postFiles = await getPostFiles()
  const fileName = postFiles.find((candidate) => getSlug(candidate) === slug)

  if (!fileName) {
    return null
  }

  const postSource = await readPostSource(fileName)
  return toPostPageData(postSource)
}

export async function validatePostContent() {
  const postFiles = await getPostFiles()
  const postSources = await Promise.all(postFiles.map((fileName) => readPostSource(fileName)))
  const seenSlugs = new Set()

  for (const postSource of postSources) {
    if (seenSlugs.has(postSource.slug)) {
      throw new Error(`Duplicate post slug detected: ${postSource.slug}`)
    }

    seenSlugs.add(postSource.slug)

    if (postSource.format === "md") {
      await renderMarkdownToHtml(postSource.content)
    }
  }

  return {
    totalPosts: postSources.length,
    markdownPosts: postFiles.filter((fileName) => path.extname(fileName) === ".md").length,
    mdxPosts: postFiles.filter((fileName) => path.extname(fileName) === ".mdx").length,
    posts: postSources.map(toPostSummary).sort(byNewestDate),
  }
}
