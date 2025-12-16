"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, ExternalLink, Mail, ChevronDown } from "lucide-react"

const AnimatedName = ({ name }: { name: string }) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8">
      {name.split('').map((letter, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? '0' : '30px'})`,
            transitionDelay: `${index * 50}ms`
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
      <span 
        className="block mt-2 h-0.5 bg-gradient-to-r from-transparent via-neutral-900 to-transparent dark:via-neutral-100 transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? '100%' : '0%',
          transitionDelay: '600ms'
        }}
      />
    </h1>
  )
}

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-stagger')
        }
      })
    }, observerOptions)

    // Observe all sections with fade-in-scroll class
    const elementsToObserve = document.querySelectorAll('.fade-in-scroll')
    elementsToObserve.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault()
    const workSection = document.getElementById('work')
    if (!workSection) return

    const startPosition = window.scrollY
    const targetPosition = workSection.getBoundingClientRect().top + window.scrollY
    const distance = targetPosition - startPosition
    const duration = 1500 // 1.5 seconds
    let start: number | null = null

    function animation(currentTime: number) {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function easeInOutQuad(t: number, b: number, c: number, d: number) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 p-6">
        <nav className="flex justify-between items-center">
          <div className="text-sm tracking-wider">ARTHUR OKER</div>
          <div className="flex gap-8 text-sm">
            <Link href="#work" className="hover:opacity-60 transition-opacity">Work</Link>
            <Link href="#experience" className="hover:opacity-60 transition-opacity">Experience</Link>
            <Link href="#contact" className="hover:opacity-60 transition-opacity">Contact</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="text-center max-w-4xl relative z-20">
          <AnimatedName name="Arthur Oker" />
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-300 relative z-20">
            4th Year CS & Philosophy at the University of Virginia
          </p>
        </div>

        {/* Scroll Indicator */}

        <div
          onClick={scrollToWork}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-neutral-400 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm tracking-widest text-neutral-500 mb-16 fade-in-scroll">SELECTED PROJECTS</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* CIO Connect */}
            <div className="group fade-in-scroll">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 mb-6 overflow-hidden">
                <Image
                  src="/cioconnect-screenshot.JPG"
                  alt="CIO Connect"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">CIO Connect</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  Semantic search platform for UVA clubs using OpenAI embeddings and FAISS
                </p>
                <div className="flex gap-4 text-xs text-neutral-500">
                  <span>Python</span>
                  <span>FastAPI</span>
                  <span>Google Cloud</span>
                </div>
              </div>
            </div>

            {/* PhilQuery */}
            <div className="group fade-in-scroll">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 mb-6 overflow-hidden">
                <Image
                  src="/Phil Query ScreenShot.JPG"
                  alt="PhilQuery"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">PhilQuery</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  RAG-powered AI philosophy assistant with vector search
                </p>
                <div className="flex gap-4 text-xs text-neutral-500">
                  <span>Python</span>
                  <span>Streamlit</span>
                  <span>FAISS</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <Link href="https://phil-query.streamlit.app/" target="_blank" className="text-xs underline">
                    View Project
                  </Link>
                  <Link href="https://github.com/arthuroker/PhilQuery" target="_blank" className="text-xs underline">
                    GitHub
                  </Link>
                </div>
              </div>
            </div>

            {/* Investment Tracker */}
            <div className="group fade-in-scroll">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 mb-6 overflow-hidden">
                <Image
                  src="/investment-tracker-image.jpeg"
                  alt="Investment Tracker"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Investment Tracker</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  Serverless stock data pipeline with automated data collection
                </p>
                <div className="flex gap-4 text-xs text-neutral-500">
                  <span>Python</span>
                  <span>Google Cloud</span>
                  <span>BigQuery</span>
                </div>
              </div>
            </div>

            {/* Cosaint */}
            <div className="group fade-in-scroll">
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 mb-6 overflow-hidden">
                <Image
                  src="/COSAINT.png"
                  alt="Cosaint"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-medium">Cosaint</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  Unity tower defense game with AI pathfinding systems
                </p>
                <div className="flex gap-4 text-xs text-neutral-500">
                  <span>Unity</span>
                  <span>C#</span>
                  <span>NavMesh</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <Link href="https://arthuroker.itch.io/cosaint" target="_blank" className="text-xs underline">
                    Play Game
                  </Link>
                  <Link href="https://github.com/UVASGD/spring-2025-cosaint" target="_blank" className="text-xs underline">
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm tracking-widest text-neutral-500 mb-16 fade-in-scroll">EXPERIENCE</h2>

          <div className="space-y-16">
            {/* SZNS Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-scroll">
              <div className="text-sm text-neutral-500">
                <div>Incoming June 2026</div>
                <div><Link href="https://www.szns.solutions/" target="_blank" className="hover:opacity-60 transition-opacity underline">SZNS Solutions</Link></div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3">Incoming Sales Development Representative</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  Incoming SDR at a premier Google Cloud Partner specializing in applied AI, web3, and cloud computing solutions.
                </p>
              </div>
            </div>

            {/* Anthropic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-scroll">
              <div className="text-sm text-neutral-500">
                <div>Aug 2025 - November 2026</div>
                <div><Link href="https://www.anthropic.com/" target="_blank" className="hover:opacity-60 transition-opacity underline">Anthropic</Link></div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3">Claude Builder Ambassador</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  Founded the Claude Builders Club at UVA.<br />
                  Organized and hosted a hackathon with $3,500+ in prizes and 150+ participants.
                </p>
              </div>
            </div>

            {/* KEYENCE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-scroll">
              <div className="text-sm text-neutral-500">
                <div>May 2025 - June 2025</div>
                <div><Link href="https://www.keyence.com/" target="_blank" className="hover:opacity-60 transition-opacity underline">KEYENCE Corporation</Link></div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3">Technical Sales Intern</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  Ranked 5th out of 50 interns while averaging 210+ daily B2B cold calls.<br />
                  Generated $100k+ in qualified applications for industrial automation solutions.
                </p>
              </div>
            </div>

            {/* UVA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-scroll">
              <div className="text-sm text-neutral-500">
                <div>Aug 2022 - May 2026</div>
                <div><Link href="https://www.virginia.edu/" target="_blank" className="hover:opacity-60 transition-opacity underline">University of Virginia</Link></div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3">BA Computer Science & BA Philosophy</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-3">
                  GPA: 3.841/4.0
                </p>
                <div className="text-xs text-neutral-500 space-y-1">
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
          <h2 className="text-sm tracking-widest text-neutral-500 mb-16 fade-in-scroll">CONTACT</h2>
          <div className="space-y-8 fade-in-scroll">
            <div>
              <div className="text-lg mb-2">arthuroker@email.virginia.edu</div>
              <div className="flex gap-6 text-sm">
                <Link href="https://github.com/arthuroker" target="_blank" className="underline">
                  GitHub
                </Link>
                <Link href="https://www.linkedin.com/in/arthuroker/" target="_blank" className="underline">
                  LinkedIn
                </Link>
                <Link href="https://arthuroker.substack.com" target="_blank" className="underline">
                  Writing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
