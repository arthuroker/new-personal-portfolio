import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "A World Appears — My Notes | Arthur Oker",
  description: "Arthur Oker's notes on A World Appears: A Journey Into Consciousness.",
}

export default function AWorldAppearsThoughtsPage() {
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
            <p className="text-[10px] font-extralight uppercase tracking-[0.28em] text-foreground/30">my notes</p>
            <h1 className="text-2xl font-extralight tracking-[0.02em] text-foreground/80">
              A World Appears: A Journey Into Consciousness
            </h1>
          </header>

          <section className="mb-12 space-y-4">
            <p className="text-[10px] font-extralight uppercase tracking-[0.28em] text-foreground/30">tldr</p>
            <p className="text-sm leading-relaxed tracking-[0.04em] font-extralight text-foreground/60">
              I read this because I&rsquo;ve enjoyed Michael Pollan&rsquo;s other books. This is a really good, beginner friendly piece that outlines the mysteries of consciousness.
            </p>
          </section>

          <section className="space-y-4">
            <p className="text-[10px] font-extralight uppercase tracking-[0.28em] text-foreground/30">extended notes</p>
            <p className="text-sm leading-relaxed tracking-[0.04em] font-extralight text-foreground/60">
              coming soon
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
