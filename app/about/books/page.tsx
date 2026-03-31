import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Books I Like | Arthur Oker",
  description: "A reading shelf of books Arthur Oker enjoys and recommends.",
}

const currentlyReading = [
  {
    title: "A World Appears",
    subtitle: "A Journey Into Consciousness",
    url: "https://michaelpollan.com/books/a-world-appears/",
    description: "",
  },
]

const recentReads = [
  {
    title: "Human Compatible: Artificial Intelligence and the Problem of Control",
    url: "https://www.goodreads.com/book/show/44767248-human-compatible",
    description: "",
  },
  {
    title: "Beaten Down, Worked Up: The Past, Present, and Future of American Labor",
    url: "https://www.goodreads.com/book/show/42922293-beaten-down-worked-up",
    description: "",
  },
]

export default function AboutBooksPage() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none" aria-hidden="true" />

      <SiteHeader activePage="about" />

      <main className="relative z-10 px-6 pb-32 pt-40">
        <div className="mx-auto max-w-2xl">
          <div className="mb-16">
            <Link
              href="/about"
              className="group inline-flex w-fit items-center gap-3 text-[10px] font-extralight uppercase tracking-[0.28em] text-foreground/50 transition-colors duration-500 hover:text-foreground/80"
            >
              <span aria-hidden="true">←</span>
              <span>Back to About</span>
            </Link>
          </div>

          <section className="space-y-4">
            {currentlyReading.map((book) => (
              <article key={book.title} className="text-sm leading-relaxed tracking-[0.04em] font-extralight">
                <span className="text-foreground/40">currently reading: </span>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/70 underline decoration-earth-1/50 underline-offset-4 transition-colors duration-500 hover:text-earth-1"
                >
                  {book.title}
                  {book.subtitle && (
                    <span>: {book.subtitle}</span>
                  )}
                </a>
              </article>
            ))}
          </section>

          <section className="mt-10 space-y-4">
            <p className="text-[10px] font-extralight uppercase tracking-[0.28em] text-foreground/30">recent reads</p>
            {recentReads.map((book) => (
              <article key={book.title}>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm leading-relaxed tracking-[0.04em] font-extralight text-foreground/60 underline decoration-earth-1/40 underline-offset-4 transition-colors duration-500 hover:text-earth-1"
                >
                  {book.title}
                  {book.description && (
                    <span className="text-foreground/30">{" "}&mdash;{" "}{book.description}</span>
                  )}
                </a>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}
