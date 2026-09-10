"use client"

import { useEffect, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

interface MotionSystemProps {
  children: ReactNode
}

export function MotionSystem({ children }: MotionSystemProps) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (reduceMotion.matches) {
      return
    }

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: 0.085,
      smoothWheel: true,
    })

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }

    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(1000, 16)

    return () => {
      lenis.off("scroll", ScrollTrigger.update)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return children
}
