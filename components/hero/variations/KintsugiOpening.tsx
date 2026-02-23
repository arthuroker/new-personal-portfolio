'use client'

import { useEffect, useState } from 'react'

export default function KintsugiOpening() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [lineProgress, setLineProgress] = useState(0)
  const [flashOpacity, setFlashOpacity] = useState(0)

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
      setLineProgress(100)
      return
    }
    
    // Animate Kintsugi lines
    let start: number
    const duration = 3000 // 3 seconds for lines to connect
    
    const animateLines = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      
      // Slow start, fast middle, slow end
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
        
      setLineProgress(easeProgress * 100)
      
      if (progress < 1) {
        requestAnimationFrame(animateLines)
      } else {
        // Flash of gold when connected, then reveal content
        setFlashOpacity(0.8)
        setTimeout(() => {
          setFlashOpacity(0)
          setIsLoaded(true)
          setTimeout(() => setShowContent(true), 400)
        }, 300)
      }
    }
    
    requestAnimationFrame(animateLines)
    
    return () => {}
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

      {/* Kintsugi Gold Lines Animation */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: prefersReducedMotion ? 0 : (showContent ? 0.15 : 1), // Fades to subtle background element
          transition: 'opacity 3s ease-in-out',
        }}
      >
        {/* Glow effect that pulses when lines connect */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000 ease-out mix-blend-screen"
          style={{ 
            opacity: flashOpacity,
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 60%)'
          }}
        />
        
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full max-w-none absolute inset-0 object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C5A059" />
              <stop offset="50%" stopColor="#E6C762" />
              <stop offset="100%" stopColor="#8A6B2E" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="crack">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          
          <g filter="url(#glow)">
            {/* Main center fracture */}
            <path 
              d="M 300,100 L 380,180 L 360,250 L 450,320 L 440,400 L 520,480 L 650,550" 
              fill="none" 
              stroke="url(#gold)" 
              strokeWidth="2" 
              filter="url(#crack)"
              strokeDasharray="800"
              strokeDashoffset={800 - (lineProgress / 100) * 800}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            {/* Branch 1 */}
            <path 
              d="M 360,250 L 250,280 L 150,260 L 50,300" 
              fill="none" 
              stroke="url(#gold)" 
              strokeWidth="1.5" 
              filter="url(#crack)"
              strokeDasharray="400"
              strokeDashoffset={400 - (Math.max(0, lineProgress - 20) / 80) * 400}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            {/* Branch 2 */}
            <path 
              d="M 450,320 L 580,280 L 680,290 L 850,220" 
              fill="none" 
              stroke="url(#gold)" 
              strokeWidth="1.5" 
              filter="url(#crack)"
              strokeDasharray="500"
              strokeDashoffset={500 - (Math.max(0, lineProgress - 40) / 60) * 500}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            {/* Subtle thin branch */}
            <path 
              d="M 520,480 L 600,450 L 750,480 L 900,420" 
              fill="none" 
              stroke="url(#gold)" 
              strokeWidth="1" 
              opacity="0.7"
              filter="url(#crack)"
              strokeDasharray="500"
              strokeDashoffset={500 - (Math.max(0, lineProgress - 60) / 40) * 500}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </g>
        </svg>
      </div>
      
      {/* Main content - centered with 2% intentional offset */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div 
          className="text-center"
          style={{
            marginLeft: '2%',
            opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
            transform: showContent ? 'scale(1)' : 'scale(0.98)',
            transition: 'all 2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {/* Name - split for staggered animation */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] text-foreground">
            <span 
              className="inline-block"
              style={{
                opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
                transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '15px'})`,
                transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
              }}
            >
              Arthur
            </span>
            <span 
              className="inline-block ml-3"
              style={{
                opacity: prefersReducedMotion ? 1 : (showContent ? 1 : 0),
                transform: prefersReducedMotion ? 'translateY(0)' : `translateY(${showContent ? 0 : '15px'})`,
                transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
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
              transition: 'opacity 2s ease-in-out 0.8s'
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
              transform: prefersReducedMotion ? 'scaleX(1)' : `scaleX(${showContent ? 1 : 0.8})`,
              transition: 'all 2s cubic-bezier(0.16, 1, 0.3, 1) 1.2s'
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
              transition: 'opacity 2s ease-in-out 1.5s'
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
              transition: 'opacity 2s ease-in 2s'
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
          transition: 'opacity 3s ease-out 2.5s'
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
          transition: 'opacity 3s ease-out 3s'
        }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-earth-2 to-transparent" />
      </div>
    </section>
  )
}
