'use client'

import { useEffect, useRef, useState } from 'react'

// --- Color helpers ---

function parseHslToRgb(hslStr: string): [number, number, number] {
  const parts = hslStr.trim().split(/\s+/)
  const h = parseFloat(parts[0]) / 360
  const s = parseFloat(parts[1]) / 100
  const l = parseFloat(parts[2]) / 100

  if (s === 0) {
    const v = Math.round(l * 255)
    return [v, v, v]
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  const hue2rgb = (t: number): number => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  return [
    Math.round(hue2rgb(h + 1 / 3) * 255),
    Math.round(hue2rgb(h) * 255),
    Math.round(hue2rgb(h - 1 / 3) * 255),
  ]
}

// --- Particle system ---

interface Particle {
  x: number
  y: number
  vx: number          // horizontal speed
  vy: number          // vertical drift
  rotation: number    // current angle in radians
  rotSpeed: number    // radians/frame
  size: number        // major axis length
  phase: number       // sine oscillation phase
  phaseSpeed: number
  amplitude: number   // sine oscillation amplitude
  baseOpacity: number
  type: 'petal' | 'streak'
}

function makeParticle(w: number, h: number, fromLeft: boolean): Particle {
  const type: 'petal' | 'streak' = Math.random() < 0.58 ? 'petal' : 'streak'
  return {
    x: fromLeft ? -20 - Math.random() * 100 : Math.random() * w,
    y: Math.random() * h,
    vx: 0.85 + Math.random() * 1.4,
    vy: (Math.random() - 0.45) * 0.28,
    rotation: (Math.random() - 0.5) * Math.PI * 0.55,
    rotSpeed: (Math.random() - 0.5) * 0.009,
    size: type === 'petal' ? 5 + Math.random() * 9 : 30 + Math.random() * 58,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.009 + Math.random() * 0.015,
    amplitude: 0.5 + Math.random() * 1.4,
    baseOpacity: type === 'petal'
      ? 0.3 + Math.random() * 0.32
      : 0.14 + Math.random() * 0.17,
    type,
  }
}

// --- Constants ---

const FIRST = 'Arthur'
const LAST = 'Oker'
const ALL_CHARS = (FIRST + ' ' + LAST).split('')
const PARTICLE_COUNT = 32

export default function QuietImperfection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const color1Ref = useRef<[number, number, number]>([158, 125, 92])
  const color2Ref = useRef<[number, number, number]>([140, 110, 80])
  const gustRef = useRef(0)
  const nextGustRef = useRef(180)

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [canvasVisible, setCanvasVisible] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showAccent, setShowAccent] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setCanvasVisible(true)
      setShowName(true)
      setShowAccent(true)
      setShowInfo(true)
      return
    }

    const timers = [
      setTimeout(() => setCanvasVisible(true), 50),
      setTimeout(() => setShowName(true), 350),
      setTimeout(() => setShowAccent(true), 1150),
      setTimeout(() => setShowInfo(true), 1550),
    ]
    return () => timers.forEach(clearTimeout)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateColors = () => {
      try {
        const style = getComputedStyle(document.documentElement)
        const h1 = style.getPropertyValue('--earth-1').trim()
        const h2 = style.getPropertyValue('--earth-2').trim()
        if (h1) color1Ref.current = parseHslToRgb(h1)
        if (h2) color2Ref.current = parseHslToRgb(h2)
      } catch { /* ignore */ }
    }

    updateColors()

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        makeParticle(w, h, false)
      )
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const themeObs = new MutationObserver(updateColors)
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const t = ++timeRef.current

      ctx.clearRect(0, 0, w, h)

      // Periodic gust: spikes speed then decays smoothly
      if (t >= nextGustRef.current) {
        gustRef.current = 1.0
        nextGustRef.current = t + 200 + Math.floor(Math.random() * 280)
      }
      gustRef.current = Math.max(0, gustRef.current - 0.007)
      const gustMult = 1 + gustRef.current * 1.5

      // Elliptical exclusion zone around center text
      const cx = w / 2
      const cy = h / 2
      const innerRx = 230, innerRy = 175
      const outerRx = 370, outerRy = 290

      for (const p of particlesRef.current) {
        p.phase += p.phaseSpeed
        p.rotation += p.rotSpeed
        p.x += p.vx * gustMult
        p.y += p.vy + Math.sin(p.phase) * p.amplitude * 0.42

        // Respawn: exit right → re-enter from left
        if (p.x > w + 100) {
          Object.assign(p, makeParticle(w, h, true))
          continue
        }
        if (p.y < -55 || p.y > h + 55) {
          Object.assign(p, makeParticle(w, h, true))
          continue
        }

        // Elliptical center fade — keeps text area uncluttered
        const nx = (p.x - cx) / innerRx
        const ny = (p.y - cy) / innerRy
        const nxo = (p.x - cx) / outerRx
        const nyo = (p.y - cy) / outerRy
        const inner = Math.sqrt(nx * nx + ny * ny)
        const outer = Math.sqrt(nxo * nxo + nyo * nyo)
        const centerFade = inner < 1 ? 0 : outer > 1 ? 1 : inner - 1

        if (centerFade <= 0) continue

        // Subtle shimmer pulse
        const shimmer = 0.82 + Math.sin(p.phase * 1.8) * 0.18
        const alpha = p.baseOpacity * Math.min(1, centerFade) * shimmer

        const [r, g, b] = p.type === 'petal' ? color1Ref.current : color2Ref.current

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = alpha

        if (p.type === 'petal') {
          // Elongated leaf/petal — narrow oval
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size * 0.25, p.size, 0, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
          ctx.fill()
        } else {
          // Calligraphic wind streak with a gentle curve
          ctx.beginPath()
          ctx.moveTo(-p.size / 2, 0)
          ctx.quadraticCurveTo(0, p.size * 0.055, p.size / 2, 0)
          ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`
          ctx.lineWidth = 0.6 + gustRef.current * 0.35
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        ctx.restore()
        ctx.globalAlpha = 1
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      ro.disconnect()
      themeObs.disconnect()
    }
  }, [prefersReducedMotion])

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-background"
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none grain-overlay z-0"
        aria-hidden="true"
      />

      {/* Petal / wind canvas */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          style={{
            opacity: canvasVisible ? 1 : 0,
            transition: 'opacity 3s ease-out',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Main content ── */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center" style={{ marginLeft: '2%' }}>

          {/* Name — per-character blur reveal */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.2em] text-foreground"
            aria-label="Arthur Oker"
          >
            {ALL_CHARS.map((char, i) => {
              const isSpace = char === ' '
              const delay = isSpace
                ? 0
                : i < FIRST.length
                  ? i * 0.058
                  : i * 0.058 + 0.10

              return (
                <span
                  key={i}
                  className="inline-block"
                  aria-hidden={isSpace ? true : undefined}
                  style={{
                    width: isSpace ? '0.35em' : undefined,
                    opacity: showName ? 1 : 0,
                    transform: showName ? 'translateY(0)' : 'translateY(18px)',
                    filter: showName ? 'blur(0px)' : 'blur(7px)',
                    transition: prefersReducedMotion
                      ? 'none'
                      : [
                          `opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                          `transform 0.72s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                          `filter 0.68s ease ${delay}s`,
                        ].join(', '),
                  }}
                >
                  {isSpace ? '\u00A0' : char}
                </span>
              )
            })}
          </h1>

          {/* Gradient accent line */}
          <div className="h-8" />
          <div
            style={{
              height: '1px',
              background:
                'linear-gradient(to right, transparent, hsl(var(--earth-2) / 0.55) 50%, transparent)',
              width: showAccent ? '160px' : '0px',
              margin: '0 auto',
              transition: prefersReducedMotion
                ? 'none'
                : 'width 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Role + school + contact */}
          <div
            style={{
              opacity: showInfo ? 1 : 0,
              transform: showInfo ? 'translateY(0)' : 'translateY(10px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 1.3s ease-out, transform 1.3s ease-out',
            }}
          >
            <div className="h-10" />
            <p className="text-sm font-extralight tracking-[0.18em] text-warm-muted-1">
              Sales Development Representative at SZNS Solutions
            </p>

            <div className="h-12" />
            <svg
              className="w-16 h-3 mx-auto organic-divider"
              viewBox="0 0 60 10"
              aria-hidden="true"
            >
              <path
                d="M0,5 C15,3 30,7 45,4 C52,3 58,5 60,5"
                fill="none"
                stroke="currentColor"
                className="text-earth-3"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>

            <div className="h-10" />
            <p className="text-xs font-extralight tracking-[0.22em] text-warm-muted-3">
              University of Virginia '26
            </p>
            <p className="text-[10px] font-extralight tracking-[0.18em] text-warm-muted-4 mt-1">
              Computer Science and Philosophy
            </p>

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

      {/* Corner accent */}
      <div
        className="absolute top-8 right-8 flex flex-col gap-1.5 z-10 pointer-events-none"
        style={{
          opacity: showInfo ? 0.4 : 0,
          transition: 'opacity 2.5s ease-out',
        }}
        aria-hidden="true"
      >
        <div className="w-1 h-1 rounded-full bg-earth-2" />
        <div className="w-1.5 h-1.5 rounded-full bg-earth-1" />
        <div className="w-1 h-1 rounded-full bg-earth-3" />
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
        style={{
          opacity: showInfo ? 0.25 : 0,
          transition: 'opacity 2s ease-out 0.6s',
        }}
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-earth-2 to-transparent" />
      </div>
    </section>
  )
}
