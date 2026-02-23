import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogPostNotFound() {
  return (
    <div className="container max-w-2xl py-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Post Not Found</h1>
      <p className="mt-4 text-muted-foreground">
        This post may have moved, been unpublished, or the URL may be incorrect.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/blog">Return to Writing</Link>
      </Button>
    </div>
  )
}
