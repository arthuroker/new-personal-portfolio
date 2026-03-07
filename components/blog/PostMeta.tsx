import { Calendar, Clock } from "lucide-react"
import type { PostSummary } from "@/lib/blog.types"
import { formatBlogDate } from "@/lib/blog-date"

interface PostMetaProps {
  post: Pick<PostSummary, "date" | "readingTimeMinutes" | "kind" | "tags">
  className?: string
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function PostMeta({ post, className }: PostMetaProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {formatBlogDate(post.date, "MMM d, yyyy")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readingTimeMinutes} min read
        </span>
        <span className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
          {titleCase(post.kind)}
        </span>
      </div>
      {post.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
