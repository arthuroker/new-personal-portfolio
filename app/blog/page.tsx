import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedSection } from "@/components/animated-section"

// const blogPosts = [
//   {
//     id: 1,
//     title: "Getting Started with React and TypeScript",
//     date: "May 10, 2025",
//     excerpt:
//       "A comprehensive guide to setting up a new project with React and TypeScript, including best practices and common pitfalls.",
//     url: "https://substack.com",
//   },
//   {
//     id: 2,
//     title: "The Philosophy of Software Design",
//     date: "April 22, 2025",
//     excerpt:
//       "Exploring the intersection of philosophy and computer science, and how philosophical principles can improve your code.",
//     url: "https://substack.com",
//   },
//   {
//     id: 3,
//     title: "Building Accessible Web Applications",
//     date: "March 15, 2025",
//     excerpt: "Learn how to make your web applications more accessible to all users, including those with disabilities.",
//     url: "https://substack.com",
//   },
//   {
//     id: 4,
//     title: "The Future of AI in Web Development",
//     date: "February 28, 2025",
//     excerpt:
//       "An exploration of how artificial intelligence is changing the landscape of web development and what to expect in the coming years.",
//     url: "https://substack.com",
//   },
// ]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            <Link href="/">Arthur Oker</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/#projects" className="text-sm font-medium transition-colors hover:text-primary">
              Projects
            </Link>
            <Link href="/#experience" className="text-sm font-medium transition-colors hover:text-primary">
              Experience
            </Link>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
            </Link>
            <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        <AnimatedSection className="py-16 md:py-24" animation="fade-in">
          <h1 className="text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Blog
          </h1>
          <AnimatedSection className="mb-10" animation="fade-in">
            <Card className="p-6 border-primary/10 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
              <h2 className="text-2xl font-bold mb-2">Chat: Is This Real? How AI is Reshaping…</h2>
              <p className="text-sm text-muted-foreground mb-3">June 2024</p>
              <p className="mb-4">
                The age of telling whether the media you see is AI or not is quickly passing. As generative AI systems like Veo 3 and Eleven Labs become increasingly capable, we are rapidly approaching what I call phenomenological equivalence: a point at which AI-generated media becomes indistinguishable from real-world media, at least from the standpoint of human perception.
              </p>
              <Button
                variant="outline"
                className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <a href="https://open.substack.com/pub/arthuroker/p/chat-is-this-real-how-ai-is-reshaping?r=2r90m1&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Read the full post on Substack
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </Card>
          </AnimatedSection>
          <div className="mb-10 w-full max-w-[480px] mx-auto">
            <iframe 
              src="https://arthuroker.substack.com/embed" 
              width="100%" 
              height="320" 
              style={{ border: "1px solid #EEE", background: "white" }}
              frameBorder="0" 
              scrolling="no"
              className="rounded-lg shadow-sm"
            />
          </div>

          {/*
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.id} as="div" animation="stagger-item" staggerIndex={index} threshold={0.1}>
                <Card className="p-6 border-primary/10 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px]">
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
                  <p className="mb-4">{post.excerpt}</p>
                  <Button
                    variant="outline"
                    className="rounded-full transition-colors hover:bg-primary/10 hover:text-primary"
                    asChild
                  >
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      Read on Substack
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          */}
        </AnimatedSection>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
          <div className="text-sm text-muted-foreground">© 2025 Arthur Oker. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
