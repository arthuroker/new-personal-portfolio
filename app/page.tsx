"use client"

import { useEffect } from "react"
import Link from "next/link"
import AgencyHero from "@/components/hero/variations/AgencyHero"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  useEffect(() => {
    // Scroll observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          element.style.opacity = '1'
          element.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    const elementsToObserve = document.querySelectorAll('.fade-in-scroll')
    elementsToObserve.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      <SiteHeader activePage="home" />

      {/* Hero */}
      <AgencyHero />

      {/* Organic divider - wabi touch */}
      <div className="relative py-8">
        <svg className="w-32 h-2 mx-auto organic-divider" viewBox="0 0 120 8" aria-hidden="true">
          <path 
            d="M0,4 C20,2 40,6 60,4 C80,2 100,6 120,4" 
            fill="none" 
            stroke="currentColor"
            className="text-earth-3"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Work Section - Design Agency Style */}
      <ProjectsShowcase />

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 relative">
        {/* Paper grain texture */}
        <div className="absolute inset-0 grain-overlay z-0" aria-hidden="true" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-lg font-extralight tracking-[0.22em] text-foreground/80 mb-16 fade-in-scroll">Experience</h2>

          <div className="space-y-16">
            {/* SZNS Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-scroll">
              <div className="text-xs font-extralight tracking-[0.15em] text-warm-muted-3">
                <div>June 2026</div>
                <div className="mt-1">
                  <Link href="https://www.szns.solutions/" target="_blank" className="group relative">
                    <span className="text-warm-muted-2 group-hover:text-foreground transition-colors duration-500">SZNS Solutions</span>
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-earth-1 group-hover:w-full transition-all duration-500 ease-out" />
                  </Link>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-extralight tracking-[0.12em] text-foreground/90 mb-3">Sales Development Representative</h3>
                <p className="text-warm-muted-2 text-sm leading-relaxed font-extralight tracking-[0.05em]">
                  Incoming SDR at a premier Google Cloud Partner specializing in applied AI, web3, and cloud computing solutions.
                </p>
              </div>
            </div>

            {/* Anthropic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-scroll">
              <div className="text-xs font-extralight tracking-[0.15em] text-warm-muted-3">
                <div>Aug 2025 - Dec 2025</div>
                <div className="mt-1">
                  <Link href="https://www.anthropic.com/" target="_blank" className="group relative">
                    <span className="text-warm-muted-2 group-hover:text-foreground transition-colors duration-500">Anthropic</span>
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-earth-1 group-hover:w-full transition-all duration-500 ease-out" />
                  </Link>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-extralight tracking-[0.12em] text-foreground/90 mb-3">Claude Builder Ambassador</h3>
                <p className="text-warm-muted-2 text-sm leading-relaxed font-extralight tracking-[0.05em]">
                  Founded the Claude Builders Club at UVA.<br />
                  Organized and hosted a hackathon with $3,500+ in prizes and 150+ participants.
                </p>
              </div>
            </div>

            {/* KEYENCE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-scroll">
              <div className="text-xs font-extralight tracking-[0.15em] text-warm-muted-3">
                <div>May 2025 - June 2025</div>
                <div className="mt-1">
                  <Link href="https://www.keyence.com/" target="_blank" className="group relative">
                    <span className="text-warm-muted-2 group-hover:text-foreground transition-colors duration-500">KEYENCE Corporation</span>
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-earth-1 group-hover:w-full transition-all duration-500 ease-out" />
                  </Link>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-extralight tracking-[0.12em] text-foreground/90 mb-3">Technical Sales Intern</h3>
                <p className="text-warm-muted-2 text-sm leading-relaxed font-extralight tracking-[0.05em]">
                  Ranked 5th out of 50 interns while averaging 210+ daily B2B cold calls.<br />
                  Generated $100k+ in qualified applications for industrial automation solutions.
                </p>
              </div>
            </div>

            {/* UVA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-scroll">
              <div className="text-xs font-extralight tracking-[0.15em] text-warm-muted-3">
                <div>Aug 2022 - May 2026</div>
                <div className="mt-1">
                  <Link href="https://www.virginia.edu/" target="_blank" className="group relative">
                    <span className="text-warm-muted-2 group-hover:text-foreground transition-colors duration-500">University of Virginia</span>
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-earth-1 group-hover:w-full transition-all duration-500 ease-out" />
                  </Link>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-extralight tracking-[0.12em] text-foreground/90 mb-3">BA Computer Science & BA Philosophy</h3>
                <p className="text-warm-muted-2 text-sm leading-relaxed font-extralight tracking-[0.05em] mb-4">
                  GPA: 3.852/4.0
                </p>
                <div className="text-xs font-extralight tracking-[0.1em] text-warm-muted-3 space-y-1.5">
                  <div>Claude Builders Club — Co-President, Co-Founder</div>
                  <div>Student Game Developers — Director, Treasurer</div>
                  <div>Societal AI — Workshop Lead, Philosophy Chair</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        {/* Paper grain texture */}
        <div className="absolute inset-0 grain-overlay z-0" aria-hidden="true" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Organic divider - wabi touch */}
          <div className="flex justify-center mb-12">
            <svg className="w-16 h-3 organic-divider" viewBox="0 0 60 10" aria-hidden="true">
              <path 
                d="M0,5 C15,3 30,7 45,4 C52,3 58,5 60,5" 
                fill="none" 
                stroke="currentColor"
                className="text-earth-3"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <div className="text-center fade-in-scroll">
            <h2 className="text-lg font-extralight tracking-[0.22em] text-foreground/80 mb-8">Contact</h2>
            
            <p className="text-sm font-extralight tracking-[0.15em] text-warm-muted-2 mb-6">
              arthuroker@email.virginia.edu
            </p>
            
            <div className="flex justify-center gap-8">
              <a 
                href="https://www.linkedin.com/in/arthuroker/" 
                target="_blank"
                className="group inline-flex flex-col items-center"
              >
                <span className="text-xs tracking-[0.3em] text-warm-muted-3 group-hover:text-foreground transition-colors duration-500">
                  LinkedIn
                </span>
                <span className="w-0 h-px bg-earth-1 group-hover:w-16 transition-all duration-500 ease-out mt-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
