import Link from "next/link"
import { format } from "date-fns"
import type { Post } from "@/lib/blog.types"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group py-8 border-t border-border/30 first:border-t-0">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex items-baseline justify-between gap-8 mb-3">
          <h2 className="text-sm font-extralight tracking-[0.03em] text-foreground/80 group-hover:text-foreground transition-colors duration-500">
            {post.title}
          </h2>
          <span className="shrink-0 text-xs font-extralight tracking-[0.05em] text-foreground/30 tabular-nums">
            {format(new Date(post.date), "MMM yyyy")}
          </span>
        </div>
        {post.excerpt && (
          <p className="text-xs font-extralight leading-relaxed tracking-[0.03em] text-foreground/40 line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </Link>
    </article>
  )
}
