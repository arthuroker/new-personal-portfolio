import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { ComponentPropsWithoutRef } from "react"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

interface MarkdownRendererProps {
  content: string
}

const components = {
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (!href) {
      return <a {...props}>{children}</a>
    }

    const isExternal = href.startsWith("http")

    if (!isExternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
  pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-4" {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code className="font-mono text-sm" {...props}>
      {children}
    </code>
  ),
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <MDXRemote
      source={content}
      components={components}
      options={{
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "append", properties: { className: ["heading-anchor"] } }],
          ],
        },
      }}
    />
  )
}
