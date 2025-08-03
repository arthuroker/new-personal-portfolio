import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Calendar, ArrowRight, BookOpen, Rss } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedSection } from "@/components/animated-section"

const featuredPost = {
  title: "Chat, Is This Real? How AI is Reshaping Truth in Media",
  date: "July 2025",
  excerpt: "The age of telling whether the media you see is AI or not is quickly passing. As generative AI systems like Veo 3 and Eleven Labs become increasingly capable, we are rapidly approaching what I call phenomenological equivalence: a point at which AI-generated media becomes indistinguishable from real-world media, at least from the standpoint of human perception.",
  url: "https://open.substack.com/pub/arthuroker/p/chat-is-this-real-how-ai-is-reshaping?r=2r90m1&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
  readTime: "5 min read"
}

const upcomingTopics = [
  "The Ethics of AI in Creative Industries",
  "Building Resilient Software Systems",
  "Philosophy Meets Code: Design Patterns",
  "The Future of Human-AI Collaboration"
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-semibold text-lg">
            <Link href="/" className="gradient-text hover:opacity-80 transition-opacity">
              Arthur Oker
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/#projects" className="text-sm font-medium transition-colors hover:text-primary">
              Projects
            </Link>
            <Link href="/#experience" className="text-sm font-medium transition-colors hover:text-primary">
              Experience
            </Link>
            <Link href="/blog" className="text-sm font-medium text-primary">
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

      <main className="container max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16" animation="fade-in">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 gradient-text leading-tight">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exploring the intersection of technology, philosophy, and the human experience.
          </p>
        </AnimatedSection>

        {/* Featured Post */}
        <AnimatedSection className="mb-16" animation="fade-up">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1" />
            <span className="text-sm font-medium text-primary px-3">Featured Post</span>
            <div className="h-px bg-gradient-to-l from-primary/50 to-transparent flex-1" />
          </div>
          
          <Card className="group overflow-hidden border-primary/20 bg-gradient-to-br from-background to-background/50 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {featuredPost.readTime}
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                {featuredPost.title}
              </CardTitle>

            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed mb-6">
                {featuredPost.excerpt}
              </CardDescription>
              <Button
                className="group/btn bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a href={featuredPost.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Read Full Article
                  <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Newsletter Signup */}
        <AnimatedSection className="mb-16" animation="fade-up">
          <div className="text-center mb-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1 max-w-20" />
              <span className="text-sm font-medium text-primary px-3">Stay Updated</span>
              <div className="h-px bg-gradient-to-l from-primary/50 to-transparent flex-1 max-w-20" />
            </div>
            <h3 className="text-2xl font-bold mb-6">Subscribe to My Newsletter</h3>
          </div>
          
          <div className="max-w-md mx-auto">
            <iframe 
              src="https://arthuroker.substack.com/embed" 
              width="100%" 
              height="320" 
              style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
              frameBorder="0" 
              scrolling="no"
              className="rounded-lg shadow-sm"
            />
          </div>
          

        </AnimatedSection>



        {/* Call to Action */}
        <AnimatedSection className="text-center" animation="fade-up">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-background border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-3">Let's Connect</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Have thoughts on any of these topics? I'd love to hear from you and continue the conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/#contact" className="flex items-center gap-2">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild>
                  <a href="https://arthuroker.substack.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Follow on Substack
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>

      <footer className="border-t mt-20 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">© 2025 Arthur Oker. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://arthuroker.substack.com" target="_blank" rel="noopener noreferrer">
                Substack
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#contact">Contact</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
