"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

type ActivePage = "home" | "writing" | "about"

interface SiteHeaderProps {
  activePage?: ActivePage
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active: boolean
}) {
  return (
    <Link href={href} className="group relative">
      <span
        className={`transition-colors duration-500 ${
          active
            ? "text-foreground"
            : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        {label}
      </span>
      <span
        className={`absolute left-0 -bottom-1 h-px bg-earth-1 transition-all duration-500 ease-out ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  )
}

export function SiteHeader({ activePage = "home" }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 p-6 transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {activePage === "home" ? (
          <a
            href="#hero"
            className="text-xs font-extralight tracking-[0.2em] text-foreground/80 hover:text-foreground transition-colors duration-500"
          >
            Arthur Oker
          </a>
        ) : (
          <Link
            href="/"
            className="text-xs font-extralight tracking-[0.2em] text-foreground/80 hover:text-foreground transition-colors duration-500"
          >
            Arthur Oker
          </Link>
        )}

        <div className="flex items-center gap-10 text-xs font-extralight tracking-[0.15em]">
          {activePage === "home" && (
            <>
              <NavLink href="#work" label="Work" active={false} />
              <NavLink href="#experience" label="Experience" active={false} />
              <NavLink href="#contact" label="Contact" active={false} />
            </>
          )}
          <NavLink href="/blog" label="Writing" active={activePage === "writing"} />
          <NavLink href="/about" label="About" active={activePage === "about"} />
        </div>
      </nav>
    </header>
  )
}
