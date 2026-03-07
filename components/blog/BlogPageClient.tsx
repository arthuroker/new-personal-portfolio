import { PostCard } from "@/components/blog/PostCard"
import { SiteHeader } from "@/components/site-header"
import type { PostSummary } from "@/lib/blog.types"

interface BlogPageClientProps {
  posts: PostSummary[]
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
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
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.slug} post={post} />)
            ) : (
              <p className="text-xs font-extralight leading-relaxed tracking-[0.05em] text-foreground/40">
                No published posts yet.
              </p>
            )}
          </section>

        </div>
      </main>
    </div>
  )
}
