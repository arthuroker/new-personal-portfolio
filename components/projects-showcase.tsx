"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  season: string
  links?: { label: string; href: string }[]
  objectPosition?: string
  contain?: boolean
}

const projects: Project[] = [
  {
    id: "01",
    title: "Warmpath",
    description: "Networking tool that finds relevant people in your field and helps craft personalized outreach based on your resume and a job description.",
    image: "/Warmpath.png",
    tags: ["Exa AI", "Gemini API"],
    season: "Spring 2026",
    contain: true,
  },
  {
    id: "02",
    title: "Personal Scheduler",
    description: "A personal scheduler I built based on a Notion template I was using, customized with features tailored to my own workflows.",
    image: "/PersonalScheduler.png",
    tags: ["Vercel", "Next.js", "Supabase"],
    season: "Fall 2025",
    contain: true,
  },
  {
    id: "03",
    title: "CIO Connect",
    description: "Semantic search platform for UVA clubs using OpenAI embeddings and FAISS",
    image: "/cioconnect-screenshot.JPG",
    tags: ["Python", "FastAPI", "Google Cloud"],
    season: "Summer 2025",
  },
  {
    id: "04",
    title: "PhilQuery",
    description: "RAG-powered AI philosophy assistant with vector search",
    image: "/Phil Query ScreenShot.JPG",
    tags: ["Python", "Streamlit", "FAISS"],
    season: "Spring 2025",
    links: [
      { label: "View Project", href: "https://phil-query.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/arthuroker/PhilQuery" },
    ],
  },
  {
    id: "05",
    title: "Cosaint",
    description: "Unity tower defense game with AI pathfinding systems",
    image: "/COSAINT.png",
    tags: ["Unity", "C#", "NavMesh"],
    season: "Spring 2025",
    links: [
      { label: "Play Game", href: "https://arthuroker.itch.io/cosaint" },
      { label: "GitHub", href: "https://github.com/UVASGD/spring-2025-cosaint" },
    ],
  },
]

export function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [edgeSpacerWidth, setEdgeSpacerWidth] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let frameId: number | null = null

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0
      setScrollProgress(progress)

      // Find the item closest to the center of the viewport
      const centerX = scrollContainer.getBoundingClientRect().left + scrollContainer.clientWidth / 2
      let closest = 0
      let minDist = Infinity
      itemsRef.current.forEach((item, i) => {
        if (!item) return
        const itemCenter = item.getBoundingClientRect().left + item.clientWidth / 2
        const dist = Math.abs(itemCenter - centerX)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActiveProject(closest)
    }

    const onScroll = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(() => {
        handleScroll()
        frameId = null
      })
    }

    scrollContainer.addEventListener("scroll", onScroll)
    handleScroll()

    return () => {
      scrollContainer.removeEventListener("scroll", onScroll)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  const scrollToProject = (index: number) => {
    const scrollContainer = scrollRef.current
    const item = itemsRef.current[index]
    if (!scrollContainer || !item) return

    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
    const targetLeft = item.offsetLeft - (scrollContainer.clientWidth - item.clientWidth) / 2
    const clampedTarget = Math.max(0, Math.min(targetLeft, maxScroll))

    scrollContainer.scrollTo({
      left: clampedTarget,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const updateEdgeSpacers = () => {
      const firstItem = itemsRef.current[0]
      if (!firstItem) return

      const spacer = Math.max(0, (scrollContainer.clientWidth - firstItem.clientWidth) / 2)
      setEdgeSpacerWidth(spacer)
    }

    updateEdgeSpacers()

    const observer = new ResizeObserver(updateEdgeSpacers)
    observer.observe(scrollContainer)
    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Ensure a consistent initial state on load/reflow.
    scrollContainer.scrollTo({ left: 0, behavior: "auto" })
    setActiveProject(0)
    setScrollProgress(0)
  }, [edgeSpacerWidth])

  return (
    <section id="work" className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay z-0" aria-hidden="true" />

      <div ref={containerRef} className="relative z-10">
        {/* Header */}
        <div className="px-8 mb-10 max-w-7xl mx-auto">
          <div
            className={cn(
              "transition-all duration-1000 ease-out",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <span className="text-xs font-extralight tracking-[0.3em] text-warm-muted-3">
              SELECTED WORK
            </span>

          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-8"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x",
          }}
        >
          <div
            className="flex-shrink-0 snap-center"
            style={{ width: edgeSpacerWidth }}
            aria-hidden="true"
          />
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { itemsRef.current[index] = el }}
              className="flex-shrink-0 w-[72vw] md:w-[52vw] lg:w-[38vw] snap-center px-4 group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={cn(
                  "transition-all duration-1000 ease-out",
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16",
                )}
                style={{
                  transitionDelay: `${index * 150 + 300}ms`,
                }}
              >
                {/* Project number + season */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-extralight text-earth-3/30">
                    {project.id}
                  </span>
                  <div className="flex-1 h-px bg-earth-3/20" />
                  <span className="text-xs font-extralight tracking-[0.15em] text-warm-muted-3">
                    {project.season}
                  </span>
                </div>

                {/* Image container with parallax effect */}
                <div className={cn("relative aspect-[16/10] overflow-hidden mb-5", project.contain && "bg-secondary/40")}>
                  <div
                    className={cn(
                      "absolute inset-0 transition-transform duration-700 ease-out",
                      hoveredProject === project.id ? "scale-105" : "scale-100"
                    )}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={project.contain ? "object-contain" : "object-cover"}
                      style={{ objectPosition: project.objectPosition ?? "center" }}
                    />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-earth-1/20 transition-opacity duration-500",
                      hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-earth-3/40" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-earth-3/40" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-extralight tracking-[0.12em] text-foreground/90">
                    {project.title}
                  </h3>
                  <p className="text-warm-muted-2 text-xs leading-relaxed font-extralight tracking-[0.05em] max-w-xl">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-extralight tracking-[0.12em] text-warm-muted-3 px-2 py-0.5 border border-earth-3/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {project.links && (
                    <div className="flex gap-5 pt-2">
                      {project.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          className="group/link text-xs font-extralight tracking-[0.15em] relative"
                        >
                          <span className="text-warm-muted-3 group-hover/link:text-foreground transition-colors duration-500">
                            {link.label}
                          </span>
                          <span className="absolute left-0 -bottom-1 w-0 h-px bg-earth-1 group-hover/link:w-full transition-all duration-500 ease-out" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div
            className="flex-shrink-0 snap-center"
            style={{ width: edgeSpacerWidth }}
            aria-hidden="true"
          />
        </div>

        {/* Navigation indicators */}
        <div className="flex justify-center items-center gap-8 mt-8 px-6">
          {/* Progress bar */}
          <div className="w-48 h-px bg-earth-3/20 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-earth-1 transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Prev / next controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToProject(activeProject - 1)}
              disabled={activeProject === 0}
              aria-label="Previous project"
              className={cn(
                "h-8 w-8 border border-earth-3/30 text-earth-2 transition-colors duration-300 flex items-center justify-center",
                activeProject === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:border-earth-1 hover:text-foreground"
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 6l-6 6 6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollToProject(activeProject + 1)}
              disabled={activeProject === projects.length - 1}
              aria-label="Next project"
              className={cn(
                "h-8 w-8 border border-earth-3/30 text-earth-2 transition-colors duration-300 flex items-center justify-center",
                activeProject === projects.length - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:border-earth-1 hover:text-foreground"
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 6l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Counter */}
          <div className="text-xs font-extralight tracking-[0.2em] text-warm-muted-3">
            <span className="text-foreground/80">{String(activeProject + 1).padStart(2, "0")}</span>
            <span className="mx-1">/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className={cn(
            "flex items-center justify-center gap-2 mt-8 transition-opacity duration-500",
            scrollProgress > 0.1 ? "opacity-0" : "opacity-60"
          )}
        >
          <span className="text-xs font-extralight tracking-[0.2em] text-warm-muted-3">
            SCROLL
          </span>
          <svg
            className="w-4 h-4 text-warm-muted-3 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>

    </section>
  )
}
