'use client'

import { useEffect, useState } from 'react'

export default function FloatingDust() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [dustParticles, setDustParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number, duration: number}>>([])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Generate random dust particles
    const particles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random percentage width
      y: Math.random() * 100, // Random percentage height
      size: Math.random() * 2 + 0.5, // 0.5px to 2.5px
      delay: Math.random() * 2, // 0s to 2s delay
      duration: Math.random() * 15 + 15 // 15s to 30s duration
    }))
    setDustParticles(particles)

    if (prefersReducedMotion) {
      setIsLoaded(true)
      setShowContent(true)
      return
    }
    const timer1 = setTimeout(() => setIsLoaded(true), 700)
    const timer2 = setTimeout(() => setShowContent(true), 1500) // Longer delay to let dust settle a bit
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [prefersReducedMotion])

  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Subtle paper grain texture - wabi touch */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Floating Dust Particles */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: prefersReducedMotion ? 0 : (isLoaded ? 0.6 : 0),
          transition: 'opacity 3s ease-in'
        }}
      >
        {dustParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-earth-3"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: showContent ? 0.2 : 0.8, // Fade slightly when content appears
              transform: `translateY(${showContent ? '10px' : '-50px'})`,
              transition: `all ${particle.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${particle.delay}s, opacity 4s ease-in-out`
            }}
          />
        ))}
      </div>

      {/* Subtle ambient glow to illuminate the dust */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--earth-2) / 0.05) 0%, transparent 60%)',
          opacity: prefersReducedMotion ? 1 : (isLoaded ? 1 : 0),
          transition: 'opacity 4s ease-out 1s'
        }}
        aria-hidden="true"
      />

      
      {/* Main content - centered with 2% intentional offset */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div 
          className="text-center"
          style={{
            marginLeft: '2%',
            opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
            transition: 'opacity 4s ease-in-out'
          }}
        >
          {/* Name - settling animation */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] text-foreground">
            <span 
              className="inline-block"
              style={{
                opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
                transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '-10px'}) rotate(${showContent ? 0 : '-1deg'})`,
                filter: showContent ? 'blur(0px)' : 'blur(4px)',
                transition: 'all 3s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s'
              }}
            >
              Arthur
            </span>
            <span 
              className="inline-block ml-3"
              style={{
                opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
                transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '10px'}) rotate(${showContent ? 0 : '1deg'})`,
                filter: showContent ? 'blur(0px)' : 'blur(4px)',
                transition: 'all 3s cubic-bezier(0.2, 0.8, 0.2, 1) 1s'
              }}
            >
              Oker
            </span>
          </h1>

          <div className="h-20" />

          {/* Role */}
          <div
            style={{
              opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
              transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '-5px'})`,
              filter: showContent ? 'blur(0px)' : 'blur(2px)',
              transition: 'all 3s cubic-bezier(0.2, 0.8, 0.2, 1) 1.5s'
            }}
          >
            <p className="text-sm font-extralight tracking-[0.18em] text-warm-muted-1">
              Currently Sales Development Representative
            </p>
            
            <div className="h-2" />
            
            <p className="text-xs font-extralight tracking-[0.12em] text-warm-muted-2">
              SZNS Solutions
            </p>
          </div>

          {/* Organic divider - wabi touch */}
          <div 
            className="h-12"
            style={{
              opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
              transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '5px'})`,
              transition: 'all 3s cubic-bezier(0.2, 0.8, 0.2, 1) 2s'
            }}
          >
            <div className="h-12" />
            <svg className="w-16 h-3 mx-auto" viewBox="0 0 60 10" aria-hidden="true">
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

          {/* Education */}
          <div 
            style={{
              opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
              transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '-5px'})`,
              filter: showContent ? 'blur(0px)' : 'blur(2px)',
              transition: 'all 3s cubic-bezier(0.2, 0.8, 0.2, 1) 2.5s'
            }}
          >
            <div className="h-10" />
            <p className="text-xs font-extralight tracking-[0.22em] text-warm-muted-3">
              University of Virginia '26
            </p>
            <p className="text-[10px] font-extralight tracking-[0.18em] text-warm-muted-4 mt-1">
              Computer Science and Philosophy
            </p>
          </div>

          <div className="h-16" />

          {/* Contact - elegant hover treatment */}
          <div
            style={{
              opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
              transition: 'opacity 3s ease-in 3s'
            }}
          >
            <a 
              href="#contact"
              className="group inline-flex flex-col items-center"
            >
              <span className="text-xs tracking-[0.3em] text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                contact
              </span>
              <span className="w-0 h-px bg-earth-1 group-hover:w-16 transition-all duration-500 ease-out mt-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Corner accent - refined dot pattern */}
      <div 
        className="absolute top-8 right-8 flex flex-col gap-1.5 z-0"
        style={{
          opacity: prefersReducedMotion ? 0.4 : (isLoaded ? 0.4 : 0),
          transition: 'opacity 4s ease-out 3.5s'
        }}
      >
        <div className="w-1 h-1 rounded-full bg-earth-2" />
        <div className="w-1.5 h-1.5 rounded-full bg-earth-1" />
        <div className="w-1 h-1 rounded-full bg-earth-3" />
      </div>

      {/* Bottom scroll indicator */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-0"
        style={{
          opacity: prefersReducedMotion ? 0.25 : (isLoaded ? 0.25 : 0),
          transition: 'opacity 4s ease-out 4s'
        }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-earth-2 to-transparent" />
      </div>
    </section>
  )
}
