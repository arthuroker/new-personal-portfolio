"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import CinematicHero from "@/components/hero/CinematicHero"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

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

    // Observe all sections with fade-in-scroll class
    const elementsToObserve = document.querySelectorAll('.fade-in-scroll')
    elementsToObserve.forEach((el) => observer.observe(el))

    // Header scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled])
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 p-6 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-sm font-light tracking-tight">Arthur Oker</div>
          <div className="flex gap-8 text-sm font-light">
            <Link href="#work" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Work</Link>
            <Link href="#experience" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Experience</Link>
            <Link href="#contact" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Contact</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <CinematicHero />

      {/* Subtle section divider */}
      <div className="relative h-px mx-auto max-w-xs">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent opacity-40" />
      </div>

      {/* Work Section */}
      <section id="work" className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-light text-neutral-800 dark:text-neutral-200 mb-12 fade-in-scroll">Selected Projects</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* CIO Connect */}
            <div className="group fade-in-scroll">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 mb-5 overflow-hidden rounded-sm">
                <Image
                  src="/cioconnect-screenshot.JPG"
                  alt="CIO Connect"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-light">CIO Connect</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                  Semantic search platform for UVA clubs using OpenAI embeddings and FAISS
                </p>
                <div className="flex gap-3 text-xs text-neutral-500 font-light pt-1">
                  <span>Python</span>
                  <span>FastAPI</span>
                  <span>Google Cloud</span>
                </div>
              </div>
            </div>

            {/* PhilQuery */}
            <div className="group fade-in-scroll">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 mb-5 overflow-hidden rounded-sm">
                <Image
                  src="/Phil Query ScreenShot.JPG"
                  alt="PhilQuery"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-light">PhilQuery</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                  RAG-powered AI philosophy assistant with vector search
                </p>
                <div className="flex gap-3 text-xs text-neutral-500 font-light pt-1">
                  <span>Python</span>
                  <span>Streamlit</span>
                  <span>FAISS</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <Link href="https://phil-query.streamlit.app/" target="_blank" className="text-xs font-light hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                    View Project →
                  </Link>
                  <Link href="https://github.com/arthuroker/PhilQuery" target="_blank" className="text-xs font-light hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                    GitHub →
                  </Link>
                </div>
              </div>
            </div>

            {/* Investment Tracker */}
            <div className="group fade-in-scroll">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 mb-5 overflow-hidden rounded-sm">
                <Image
                  src="/investment-tracker-image.jpeg"
                  alt="Investment Tracker"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-light">Investment Tracker</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                  Serverless stock data pipeline with automated data collection
                </p>
                <div className="flex gap-3 text-xs text-neutral-500 font-light pt-1">
                  <span>Python</span>
                  <span>Google Cloud</span>
                  <span>BigQuery</span>
                </div>
              </div>
            </div>

            {/* Cosaint */}
            <div className="group fade-in-scroll">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 mb-5 overflow-hidden rounded-sm">
                <Image
                  src="/COSAINT.png"
                  alt="Cosaint"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-light">Cosaint</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                  Unity tower defense game with AI pathfinding systems
                </p>
                <div className="flex gap-3 text-xs text-neutral-500 font-light pt-1">
                  <span>Unity</span>
                  <span>C#</span>
                  <span>NavMesh</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <Link href="https://arthuroker.itch.io/cosaint" target="_blank" className="text-xs font-light hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                    Play Game →
                  </Link>
                  <Link href="https://github.com/UVASGD/spring-2025-cosaint" target="_blank" className="text-xs font-light hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                    GitHub →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-neutral-800 dark:text-neutral-200 mb-12 fade-in-scroll">Experience</h2>

          <div className="space-y-12">
            {/* SZNS Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-scroll">
              <div className="text-sm text-neutral-500 font-light">
                <div>June 2026</div>
                <div><Link href="https://www.szns.solutions/" target="_blank" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">SZNS Solutions</Link></div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-base font-light mb-2">Sales Development Representative</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                  Incoming SDR at a premier Google Cloud Partner specializing in applied AI, web3, and cloud computing solutions.
                </p>
              </div>
            </div>

            {/* Anthropic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-scroll">
              <div className="text-sm text-neutral-500 font-light">
                <div>Aug 2025 - December 2025</div>
                <div><Link href="https://www.anthropic.com/" target="_blank" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">Anthropic</Link></div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-base font-light mb-2">Claude Builder Ambassador</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                  Founded the Claude Builders Club at UVA.<br />
                  Organized and hosted a hackathon with $3,500+ in prizes and 150+ participants.
                </p>
              </div>
            </div>

            {/* KEYENCE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-scroll">
              <div className="text-sm text-neutral-500 font-light">
                <div>May 2025 - June 2025</div>
                <div><Link href="https://www.keyence.com/" target="_blank" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">KEYENCE Corporation</Link></div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-base font-light mb-2">Technical Sales Intern</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                  Ranked 5th out of 50 interns while averaging 210+ daily B2B cold calls.<br />
                  Generated $100k+ in qualified applications for industrial automation solutions.
                </p>
              </div>
            </div>

            {/* UVA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-scroll">
              <div className="text-sm text-neutral-500 font-light">
                <div>Aug 2022 - May 2026</div>
                <div><Link href="https://www.virginia.edu/" target="_blank" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">University of Virginia</Link></div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-base font-light mb-2">BA Computer Science & BA Philosophy</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light mb-3">
                  GPA: 3.852/4.0
                </p>
                <div className="text-xs text-neutral-500 font-light space-y-1">
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
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-neutral-800 dark:text-neutral-200 mb-6 fade-in-scroll">Contact</h2>
          <div className="fade-in-scroll">
            <div className="text-base font-light mb-2">arthuroker@email.virginia.edu</div>
            <div className="flex gap-6 text-sm font-light">
              <Link href="https://www.linkedin.com/in/arthuroker/" target="_blank" className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                LinkedIn →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
