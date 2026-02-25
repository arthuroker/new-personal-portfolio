"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

type ActivePage = "home" | "writing" | "about"

interface SiteHeaderProps {
  activePage?: ActivePage
}

function NavLink({
  href,
  label,
  active,
  onClick,
  className,
}: {
  href: string
  label: string
  active: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <Link href={href} className={`group relative ${className ?? ""}`} onClick={onClick}>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isMenuOpen])

  const closeMobileMenu = () => setIsMenuOpen(false)
  const hasHeaderBackground = isScrolled || isMenuOpen

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 px-4 py-4 sm:px-6 sm:py-6 transition-all duration-500 ${
        hasHeaderBackground ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
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

          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden inline-flex items-center justify-center rounded-sm p-2 text-muted-foreground hover:text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-earth-1/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>

          <div className="hidden md:flex items-center gap-10 text-xs font-extralight tracking-[0.15em]">
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
        </div>

        <div
          id="mobile-navigation"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? "max-h-80 pt-6 pb-2 opacity-100" : "max-h-0 pt-0 pb-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 text-xs font-extralight tracking-[0.15em]">
            {activePage === "home" && (
              <>
                <NavLink href="#work" label="Work" active={false} onClick={closeMobileMenu} className="w-fit" />
                <NavLink href="#experience" label="Experience" active={false} onClick={closeMobileMenu} className="w-fit" />
                <NavLink href="#contact" label="Contact" active={false} onClick={closeMobileMenu} className="w-fit" />
              </>
            )}
            <NavLink
              href="/blog"
              label="Writing"
              active={activePage === "writing"}
              onClick={closeMobileMenu}
              className="w-fit"
            />
            <NavLink
              href="/about"
              label="About"
              active={activePage === "about"}
              onClick={closeMobileMenu}
              className="w-fit"
            />
          </div>
        </div>
      </nav>
    </header>
  )
}
