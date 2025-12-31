'use client'
import { useEffect, useRef, useState } from 'react'

export default function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    if (mediaQuery.matches) {
      setAnimationComplete(true)
    }

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
      if (mediaQuery.matches) setAnimationComplete(true)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Scroll-linked fade animation
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const heroHeight = window.innerHeight
      const scrollY = window.scrollY
      // Progress from 0 to 1 as user scrolls through first 60% of viewport
      const progress = Math.min(scrollY / (heroHeight * 0.6), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Gradient orbs - only animate after intro
    class Orb {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 300 + 200
        const isDark = document.documentElement.classList.contains('dark')
        const colors = isDark
          ? ['rgba(64, 64, 64, 0.03)', 'rgba(82, 82, 82, 0.03)', 'rgba(38, 38, 38, 0.03)']
          : ['rgba(245, 245, 245, 0.4)', 'rgba(229, 229, 229, 0.4)', 'rgba(212, 212, 212, 0.4)']
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
      }

      update() {
        if (!animationComplete) return
        this.x += this.vx
        this.y += this.vy

        if (this.x < -this.radius) this.x = canvas.width + this.radius
        if (this.x > canvas.width + this.radius) this.x = -this.radius
        if (this.y < -this.radius) this.y = canvas.height + this.radius
        if (this.y > canvas.height + this.radius) this.y = -this.radius
      }

      draw() {
        if (!ctx) return
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    const orbs: Orb[] = []
    for (let i = 0; i < 3; i++) {
      orbs.push(new Orb())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      orbs.forEach(orb => {
        orb.update()
        orb.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    // Mark animation as complete after 3.5s
    const timer = setTimeout(() => setAnimationComplete(true), 3500)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      clearTimeout(timer)
    }
  }, [animationComplete])

  // Split name into characters for animation
  const name = "Arthur Oker"
  const nameChars = name.split('')

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: 1 - scrollProgress * 0.5 }
        }
        aria-hidden="true"
      />

      {/* Gradient bridge for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)'
        }}
        aria-hidden="true"
      />

      <div
        className="max-w-4xl mx-auto relative z-10"
        style={
          prefersReducedMotion
            ? undefined
            : {
                opacity: 1 - scrollProgress * 0.7,
                transform: `translateY(${scrollProgress * -30}px)`,
              }
        }
      >
        <div className="space-y-6">
          {/* Name with character-by-character reveal */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            {nameChars.map((char, index) => (
              <span
                key={index}
                className={`inline-block ${prefersReducedMotion ? 'opacity-100' : 'opacity-0'}`}
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        animation: `revealChar 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.05}s forwards`,
                      }
                }
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Tagline with blur reveal */}
          <p
            className={`text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl ${
              prefersReducedMotion ? 'opacity-100' : 'opacity-0 animate-[blurReveal_1s_cubic-bezier(0.16,1,0.3,1)_1.6s_forwards]'
            }`}
          >
            4th Year CS & Philosophy at the University of Virginia
          </p>

          {/* Description with delayed fade */}
          <p
            className={`text-base text-neutral-500 dark:text-neutral-500 max-w-xl leading-relaxed ${
              prefersReducedMotion ? 'opacity-100' : 'opacity-0 animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)_2.2s_forwards]'
            }`}
          >
            Incoming Sales Development Representative @ SZNS Solutions
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 ${
          prefersReducedMotion ? 'opacity-30' : 'opacity-0 animate-[fadeInUp_0.6s_cubic-bezier(0.16,1,0.3,1)_3.2s_forwards]'
        }`}
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: scrollProgress > 0 ? Math.max(0, 0.3 - scrollProgress * 1.5) : undefined }
        }
        aria-hidden="true"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-neutral-400 animate-[scrollBounce_2s_ease-in-out_infinite]"
        >
          <path d="M7 13l5 5 5-5" />
          <path d="M7 7l5 5 5-5" />
        </svg>
      </div>
    </section>
  )
}
