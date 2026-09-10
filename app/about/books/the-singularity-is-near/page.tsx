import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "The Singularity Is Near — Why I'm Reading This | Arthur Oker",
  description: "Arthur Oker's note on why he's reading The Singularity Is Near.",
}

export default function SingularityIsNearNotePage() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none" aria-hidden="true" />

      <SiteHeader activePage="about" />

      <main className="relative z-10 px-6 pb-32 pt-40">
        <div className="mx-auto max-w-2xl">
          <div className="mb-16">
            <Link
              href="/about/books"
              className="group inline-flex w-fit items-center gap-3 text-[10px] font-extralight uppercase tracking-[0.28em] text-foreground/50 transition-colors duration-500 hover:text-foreground/80"
            >
              <span aria-hidden="true">←</span>
              <span>Back to Books</span>
            </Link>
          </div>

          <header className="mb-12 space-y-3">
            <p className="text-[10px] font-extralight uppercase tracking-[0.28em] text-foreground/30">why am I reading this</p>
            <h1 className="text-2xl font-extralight tracking-[0.02em] text-foreground/80">
              The Singularity Is Near
            </h1>
          </header>

          <section className="space-y-4">
            <p className="text-sm leading-relaxed tracking-[0.04em] font-extralight text-foreground/60">
              I am reading this because I&rsquo;m personally interested in learning more about the Singularity and the intelligence explosion. I wanted to start off with a seminal work that to my understanding models a lot of the current thinking and perspective coming from tech-space optimists that seem to take for granted 1) It will happen soon 2) That it will be a good thing.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
