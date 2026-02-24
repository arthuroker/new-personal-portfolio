"use client"

import { type ReactNode } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { SiteHeader } from "@/components/site-header"
import type { getAdjacentPosts, getPostBySlug } from "@/lib/blog"

interface BlogPostPageClientProps {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>
  newer: Awaited<ReturnType<typeof getAdjacentPosts>>['newer']
  older: Awaited<ReturnType<typeof getAdjacentPosts>>['older']
  children: ReactNode
}

export function BlogPostPageClient({ post, newer, older, children }: BlogPostPageClientProps) {
  return (
    <div className="min-h-screen relative">
      {/* Grain overlay */}
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none" aria-hidden="true" />

      <SiteHeader activePage="writing" />

      <main className="relative z-10 pt-40 pb-32 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <Link
            href="/blog"
            className="text-xs font-extralight tracking-[0.2em] text-foreground/30 hover:text-foreground/60 uppercase transition-colors duration-500 mb-20 inline-block"
          >
            ← Writing
          </Link>

          <article>
            <header className="mb-16">
              <h1 className="text-lg font-extralight tracking-[0.02em] text-foreground/80 mb-6 leading-snug">
                {post.title}
              </h1>
              <p className="text-xs font-extralight tracking-[0.1em] text-foreground/30">
                {format(new Date(post.date), "MMMM d, yyyy")}
                <span className="mx-2">·</span>
                {post.readingTimeMinutes} min read
              </p>
              {post.canonicalUrl ? (
                <p className="mt-4 text-xs font-extralight tracking-[0.05em] text-foreground/30">
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

            <div className="prose prose-invert font-extralight max-w-none prose-p:text-foreground/80 prose-p:font-extralight prose-p:tracking-[0.03em] prose-p:leading-relaxed prose-headings:font-extralight prose-headings:tracking-tight prose-a:text-foreground/60 prose-a:no-underline hover:prose-a:text-foreground prose-hr:border-border/30">
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
