# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run Next.js linting
```

## Tech Stack

- **Next.js 15** with App Router and React 19
- **TypeScript** with strict mode
- **Tailwind CSS** with CSS variables for theming
- **shadcn/ui** component library (Radix UI primitives in `components/ui/`)
- **next-themes** for dark mode (default theme is dark)

## Architecture

This is a personal portfolio site using Next.js App Router:

- `app/` - Pages and layouts (RSC by default)
- `components/ui/` - shadcn/ui components (do not modify directly, use `npx shadcn@latest add`)
- `components/` - Custom components including hero animations
- `hooks/` - Custom React hooks (scroll animation, mobile detection)
- `lib/utils.ts` - The `cn()` utility for merging Tailwind classes

## Key Patterns

**Client Components**: Mark with `"use client"` directive when using hooks, event handlers, or browser APIs.

**Styling**: Use Tailwind utilities with the `cn()` helper for conditional classes. Theme colors use CSS variables (e.g., `bg-background`, `text-foreground`).

**Animations**: Custom scroll-triggered animations use IntersectionObserver via `.fade-in-scroll` class. Canvas animations in hero section respect `prefers-reduced-motion`.

**Adding shadcn components**: Run `npx shadcn@latest add <component-name>`.

## Build Notes

ESLint warnings and TypeScript errors are ignored during build (configured in `next.config.mjs`) for rapid iteration.
