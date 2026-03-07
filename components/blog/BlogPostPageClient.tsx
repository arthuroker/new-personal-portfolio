import { type ReactNode } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { formatBlogDate } from "@/lib/blog-date"
import type { PostPageData, PostSummary } from "@/lib/blog.types"

interface BlogPostPageClientProps {
  post: PostPageData
  newer: PostSummary | null
  older: PostSummary | null
  children: ReactNode
}

export function BlogPostPageClient({ post, newer, older, children }: BlogPostPageClientProps) {
  return (
    <div className="min-h-screen relative">
      {/* Grain overlay */}
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none" aria-hidden="true" />

      <SiteHeader activePage="writing" />

      <main className="relative z-10 px-6 pb-32 pt-28 md:pt-32">
        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <Link
            href="/blog"
            className="mb-12 inline-block text-xs font-space-mono tracking-[0.2em] text-foreground/30 uppercase transition-colors duration-500 hover:text-foreground/60"
          >
            ← Writing
          </Link>

          <article>
            <header className="mb-16 border-b border-border/40 pb-8">
              <p className="mb-4 text-[11px] font-space-mono uppercase tracking-[0.32em] text-earth-3/80">
                {post.kind === "article" ? "Essay" : "Note"}
              </p>
              <h1 className="max-w-2xl font-playfair text-3xl leading-[1.08] text-foreground/90 md:text-4xl">
                {post.title}
              </h1>
              <p className="mt-6 text-xs font-space-mono tracking-[0.16em] text-foreground/35 uppercase">
                {formatBlogDate(post.date, "MMMM d, yyyy")}
                <span className="mx-2">·</span>
                {post.readingTimeMinutes} min read
              </p>
              {post.canonicalUrl ? (
                <p className="mt-4 text-xs font-manrope tracking-[0.04em] text-foreground/35">
                  Originally published at{" "}
                  <a
                    href={post.canonicalUrl}
                    className="hover:text-foreground/60 transition-colors duration-500"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {post.canonicalUrl}
                  </a>
                </p>
              ) : null}
            </header>

            <div className="article-content max-w-2xl">
              {children}
            </div>
          </article>

          {/* Organic divider */}
          <div className="my-20">
            <svg className="w-24 h-2" viewBox="0 0 120 8" aria-hidden="true">
              <path
                d="M0,4 C20,2 40,6 60,4 C80,2 100,6 120,4"
                fill="none"
                stroke="currentColor"
                className="text-earth-3"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Adjacent posts navigation */}
          {(newer || older) && (
            <section className="flex items-start justify-between gap-8">
              {newer ? (
                <Link
                  href={`/blog/${newer.slug}`}
                  className="text-xs font-extralight tracking-[0.05em] text-foreground/40 hover:text-foreground/70 transition-colors duration-500 max-w-[45%]"
                >
                  ← {newer.title}
                </Link>
              ) : <span />}

              {older ? (
                <Link
                  href={`/blog/${older.slug}`}
                  className="text-xs font-extralight tracking-[0.05em] text-foreground/40 hover:text-foreground/70 transition-colors duration-500 text-right max-w-[45%]"
                >
                  {older.title} →
                </Link>
              ) : null}
            </section>
          )}

        </div>
      </main>
    </div>
  )
}
