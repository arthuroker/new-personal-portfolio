'use client'

import { useEffect, useState } from 'react'

export default function SumieReveal() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [strokeProgress, setStrokeProgress] = useState(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoaded(true)
      setShowContent(true)
      setStrokeProgress(100)
      return
    }
    
    // Animate the brush stroke first
    let start: number
    const duration = 2500 // 2.5 seconds for the stroke
    
    const animateStroke = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      
      // Easing function for a natural brush feel (starts slow, speeds up, slows down)
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
        
      setStrokeProgress(easeProgress * 100)
      
      if (progress < 1) {
        requestAnimationFrame(animateStroke)
      } else {
        // Once stroke is done, reveal content
        setIsLoaded(true)
        setTimeout(() => setShowContent(true), 800)
      }
    }
    
    requestAnimationFrame(animateStroke)
    
    return () => {}
  }, [prefersReducedMotion])

  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Subtle paper grain texture - wabi touch */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Sumi-e brush stroke animation overlay */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: prefersReducedMotion ? 0 : (showContent ? 0.03 : 0.8), // Fades out to be very subtle after revealing
          transition: 'opacity 3s ease-out',
          mixBlendMode: 'multiply'
        }}
      >
        <svg 
          viewBox="0 0 800 400" 
          className="w-full max-w-[800px] h-auto dark:opacity-20"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="roughpaper">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>
          <path 
            d="M 100,200 Q 250,180 400,210 T 700,190" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="80" 
            strokeLinecap="round"
            className="text-foreground"
            filter="url(#roughpaper)"
            strokeDasharray="800"
            strokeDashoffset={800 - (strokeProgress / 100) * 800}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <path 
            d="M 150,220 Q 300,250 450,200 T 650,230" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="50" 
            strokeLinecap="round"
            className="text-foreground opacity-60"
            filter="url(#roughpaper)"
            strokeDasharray="700"
            strokeDashoffset={700 - (strokeProgress / 100) * 700}
            style={{ transition: 'stroke-dashoffset 0.1s linear', transitionDelay: '0.2s' }}
          />
        </svg>
      </div>
      
      {/* Main content - centered with 2% intentional offset */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div 
          className="text-center"
          style={{
            marginLeft: '2%',
            opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
            filter: showContent ? 'blur(0px)' : 'blur(10px)',
            transition: 'all 2s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {/* Name - split for staggered animation */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] text-foreground">
            <span 
              className="inline-block"
              style={{
                opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
                transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '20px'})`,
                transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
              }}
            >
              Arthur
            </span>
            <span 
              className="inline-block ml-3"
              style={{
                opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
                transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '20px'})`,
                transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
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
              transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '10px'})`,
              transition: 'all 1.5s ease-out 1s'
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
              transition: 'opacity 2s ease-in 1.5s'
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
            className="h-10"
            style={{
              opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
              transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '10px'})`,
              transition: 'all 1.5s ease-out 1.8s'
            }}
          >
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
              transition: 'opacity 2s ease-in 2.2s'
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
          transition: 'opacity 3s ease-out 3s'
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
          transition: 'opacity 3s ease-out 3.5s'
        }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-earth-2 to-transparent" />
      </div>
    </section>
  )
}
