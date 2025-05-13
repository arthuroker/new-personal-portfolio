"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef } from "react"

export interface AnimatedSectionProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements
  animation?: "fade-up" | "fade-in" | "slide-in" | "scale-in" | "stagger-item"
  delay?: number
  threshold?: number
  once?: boolean
  staggerIndex?: number
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  (
    {
      as: Component = "section",
      animation = "fade-up",
      delay = 0,
      threshold = 0.1,
      once = true,
      staggerIndex = 0,
      className,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const { ref, isInView } = useScrollAnimation({ threshold, once })

    const combinedRef = (node: HTMLElement) => {
      // @ts-ignore - forwardRef typing issue
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
      ref.current = node
    }

    const getAnimationClass = () => {
      switch (animation) {
        case "fade-up":
          return "opacity-0 translate-y-8"
        case "fade-in":
          return "opacity-0"
        case "slide-in":
          return "opacity-0 -translate-x-8"
        case "scale-in":
          return "opacity-0 scale-95"
        case "stagger-item":
          return "opacity-0 translate-y-4"
        default:
          return "opacity-0 translate-y-8"
      }
    }

    const getStaggerDelay = () => {
      if (animation === "stagger-item") {
        return { transitionDelay: `${staggerIndex * 100 + delay}ms` }
      }
      return delay ? { transitionDelay: `${delay}ms` } : {}
    }

    return (
      <Component
        ref={combinedRef}
        className={cn(
          "transition-all duration-700 ease-out",
          getAnimationClass(),
          isInView && "opacity-100 translate-y-0 translate-x-0 scale-100",
          className,
        )}
        style={getStaggerDelay()}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

AnimatedSection.displayName = "AnimatedSection"
