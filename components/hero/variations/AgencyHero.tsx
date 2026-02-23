'use client'

import { useCallback, type MouseEvent } from 'react'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const WORDS = ['Arthur', 'Oker']

export default function AgencyHero() {
  const shouldReduceMotion = useReducedMotion()

  // Subtle mouse parallax on the name block
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 22 })
  const parallaxX = useTransform(springX, [-1, 1], [-4, 4])
  const parallaxY = useTransform(springY, [-1, 1], [-4, 4])

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (shouldReduceMotion) return
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
    },
    [shouldReduceMotion, mouseX, mouseY]
  )

  // Unified transition builder — collapses to instant when reduced motion
  const t = (delay: number, duration = 0.9) =>
    shouldReduceMotion
      ? { duration: 0 }
      : ({ duration, ease: [0.16, 1, 0.3, 1], delay } as const)

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none grain-overlay z-0"
        aria-hidden="true"
      />

      {/* Main content — centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center" style={{ marginLeft: '2%' }}>

          {/* Name — parallax wrapper + ambient breath */}
          <motion.div style={{ x: parallaxX, y: parallaxY }}>
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] text-foreground"
                aria-label="Arthur Oker"
              >
                {WORDS.map((word, wi) => {
                  const chars = word.split('')
                  // Each word's chars stagger from a base delay
                  // "Arthur" starts at 0.3s, "Oker" starts at 0.85s
                  const wordBase = wi === 0 ? 0.3 : 0.85

                  return (
                    <span key={wi} className="inline-block">
                      {chars.map((char, ci) => {
                        const delay = wordBase + ci * 0.055
                        return (
                          <span
                            key={ci}
                            className="inline-block overflow-hidden"
                            style={{ verticalAlign: 'bottom' }}
                            aria-hidden="true"
                          >
                            <motion.span
                              className="inline-block"
                              initial={shouldReduceMotion ? {} : { y: '115%' }}
                              animate={{ y: '0%' }}
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0 }
                                  : {
                                      duration: 0.9,
                                      ease: [0.22, 1, 0.36, 1],
                                      delay,
                                    }
                              }
                            >
                              {char}
                            </motion.span>
                          </span>
                        )
                      })}
                      {/* Space between words */}
                      {wi < WORDS.length - 1 && (
                        <span style={{ display: 'inline-block', width: '0.35em' }} />
                      )}
                    </span>
                  )
                })}
              </h1>
            </motion.div>
          </motion.div>

          {/* Gradient accent line */}
          <div className="h-8" />
          <motion.div
            style={{
              height: '1px',
              background:
                'linear-gradient(to right, transparent, hsl(var(--earth-2) / 0.55) 50%, transparent)',
              margin: '0 auto',
            }}
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={t(1.6, 1.6)}
          />

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(2.1, 1.4)}
          >
            <div className="h-10" />
            <p className="text-sm font-extralight tracking-[0.18em] text-warm-muted-1">
              Sales Development Representative at SZNS Solutions
            </p>
          </motion.div>

          {/* Organic wavy divider — path draws itself in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t(2.5, 0.6)}
          >
            <div className="h-12" />
            <svg
              className="w-16 h-3 mx-auto overflow-visible"
              viewBox="0 0 60 10"
              aria-hidden="true"
            >
              <motion.path
                d="M0,5 C15,3 30,7 45,4 C52,3 58,5 60,5"
                fill="none"
                stroke="currentColor"
                className="text-earth-3"
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 1.8, ease: 'easeInOut', delay: 2.5 }
                }
              />
            </svg>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(2.8, 1.4)}
          >
            <div className="h-10" />
            <p className="text-xs font-extralight tracking-[0.22em] text-warm-muted-3">
              University of Virginia &apos;26
            </p>
            <p className="text-[10px] font-extralight tracking-[0.18em] text-warm-muted-4 mt-1">
              Computer Science and Philosophy
            </p>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(3.2, 1.4)}
          >
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
          </motion.div>

        </div>
      </div>

      {/* Corner accent dots */}
      <motion.div
        className="absolute top-8 right-8 flex flex-col gap-1.5 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={t(3.6, 1.8)}
        aria-hidden="true"
      >
        <div className="w-1 h-1 rounded-full bg-earth-2" />
        <div className="w-1.5 h-1.5 rounded-full bg-earth-1" />
        <div className="w-1 h-1 rounded-full bg-earth-3" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={t(3.6, 1.8)}
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-earth-2 to-transparent" />
      </motion.div>
    </section>
  )
}
