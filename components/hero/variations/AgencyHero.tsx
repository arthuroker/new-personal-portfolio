'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const WORDS = ['Arthur', 'Oker']

export default function AgencyHero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    if (!hero || !title) return

    const context = gsap.context(() => {
      const chars = Array.from(title.querySelectorAll<HTMLElement>('.hero-char'))
      const revealTargets = [
        accentRef.current,
        roleRef.current,
        dividerRef.current,
        educationRef.current,
        contactRef.current,
      ].filter((target): target is HTMLDivElement => Boolean(target))
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        gsap.set(chars, { clearProps: 'all' })
        gsap.set(revealTargets, { clearProps: 'all' })
        gsap.set(scrollIndicatorRef.current, { opacity: 0.25 })
        return
      }

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      const firstWordLength = WORDS[0].length

      timeline
        .from(chars.slice(0, firstWordLength), {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.055,
        }, 0.3)
        .from(chars.slice(firstWordLength), {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.055,
        }, 0.85)
        .from(accentRef.current, {
          scaleX: 0,
          transformOrigin: 'center',
          duration: 1.6,
        }, 1.6)
        .from(roleRef.current, {
          autoAlpha: 0,
          y: 12,
          duration: 1.4,
        }, 2.1)
        .from(dividerRef.current, {
          autoAlpha: 0,
          duration: 0.6,
        }, 2.5)
        .from(educationRef.current, {
          autoAlpha: 0,
          y: 12,
          duration: 1.4,
        }, 2.8)
        .from(contactRef.current, {
          autoAlpha: 0,
          y: 12,
          duration: 1.4,
        }, 3.2)
        .fromTo(scrollIndicatorRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 0.25, duration: 1.8 },
          3.6,
        )

      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength()

        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })
        timeline.fromTo(pathRef.current,
          { strokeDashoffset: pathLength },
          { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' },
          2.5,
        )
      }
    }, hero)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen relative overflow-hidden bg-background"
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none grain-overlay z-0"
        aria-hidden="true"
      />

      {/* Main content — centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="text-center">
          <h1
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] text-foreground"
            aria-label="Arthur Oker"
          >
            {WORDS.map((word, wi) => {
              const chars = word.split('')

              return (
                <span key={wi} className="inline-block">
                  {chars.map((char, ci) => (
                    <span
                      key={ci}
                      className="inline-block overflow-hidden"
                      style={{ verticalAlign: 'bottom' }}
                      aria-hidden="true"
                    >
                      <span className="hero-char inline-block">{char}</span>
                    </span>
                  ))}
                  {/* Space between words */}
                  {wi < WORDS.length - 1 && (
                    <span style={{ display: 'inline-block', width: '0.35em' }} />
                  )}
                </span>
              )
            })}
          </h1>

          {/* Gradient accent line */}
          <div className="h-8" />
          <div
            ref={accentRef}
            style={{
              height: '1px',
              background:
                'linear-gradient(to right, transparent, hsl(var(--earth-2) / 0.55) 50%, transparent)',
              margin: '0 auto',
              width: 160,
            }}
          />

          {/* Role */}
          <div ref={roleRef}>
            <div className="h-10" />
            <p className="text-sm font-extralight tracking-[0.18em] text-warm-muted-1">
              GTM @ SZNS Solutions
            </p>
          </div>

          {/* Organic wavy divider — path draws itself in */}
          <div ref={dividerRef}>
            <div className="h-12" />
            <svg
              className="w-16 h-3 mx-auto overflow-visible"
              viewBox="0 0 60 10"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
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
          <div ref={educationRef}>
            <div className="h-10" />
            <p className="text-xs font-extralight tracking-[0.22em] text-warm-muted-3">
              University of Virginia &apos;26
            </p>
            <p className="text-[10px] font-extralight tracking-[0.18em] text-warm-muted-4 mt-1">
              Computer Science and Philosophy
            </p>
          </div>

          {/* Contact CTA */}
          <div ref={contactRef}>
            <div className="h-16" />
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

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-earth-2 to-transparent" />
      </div>
    </section>
  )
}
