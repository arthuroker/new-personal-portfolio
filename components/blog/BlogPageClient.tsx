"use client"

import { PostCard } from "@/components/blog/PostCard"
import { SiteHeader } from "@/components/site-header"
import type { getPublishedPosts } from "@/lib/blog"

interface BlogPageClientProps {
  posts: Awaited<ReturnType<typeof getPublishedPosts>>
}

import type { Post } from "@/lib/blog.types"

const WIP_POSTS: Post[] = [
  {
    slug: "philosophy-vs-cs",
    title: "Why my Philosophy Degree taught me more than my CS degree",
    excerpt: "Work in progress",
    date: "2026-02-22",
    kind: "article",
    tags: [],
    draft: true,
    readingTimeMinutes: 0,
    content: "",
  },
  {
    slug: "optimizing-for-the-right-thing",
    title: "Optimizing for the right things in college",
    excerpt: "Work in progress",
    date: "2026-02-22",
    kind: "article",
    tags: [],
    draft: true,
    readingTimeMinutes: 0,
    content: "",
  },
]

export function BlogPageClient({ posts }: BlogPageClientProps) {
  // TODO: swap back to `posts` when real articles are ready
  const displayPosts = WIP_POSTS
  return (
    <div className="min-h-screen relative">
      {/* Grain overlay */}
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none" aria-hidden="true" />

      <SiteHeader activePage="writing" />

      <main className="relative z-10 pt-40 pb-32 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Page title */}
          <div className="flex items-baseline justify-between mb-20">
            <h1 className="text-xs font-extralight tracking-[0.3em] text-foreground/50 uppercase">Writing</h1>
            <a
              href="https://arthuroker.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-extralight tracking-[0.1em] text-foreground/30 hover:text-foreground/60 transition-colors duration-500"
            >
              Substack ↗
            </a>
          </div>

          {/* Posts list */}
          <section>
            {displayPosts.map((post) => <PostCard key={post.slug} post={post} />)}
          </section>

        </div>
      </main>
    </div>
  )
}
