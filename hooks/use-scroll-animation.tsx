"use client"

import { useEffect, useRef, useState } from "react"

type AnimationOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollAnimation(options: AnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, once])

  return { ref, isInView }
}
