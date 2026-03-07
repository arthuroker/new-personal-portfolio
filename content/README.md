# Blog Content

Posts are stored as Markdown or MDX files in this folder and rendered at `/blog`.
Markdown is the default and preferred format.

## File naming

Use a date-first slug so posts stay easy to scan.
Default to `.md` for essays and notes. Use `.mdx` only when a post genuinely needs embedded React components.

`YYYY-MM-DD-your-slug.md`

(`.mdx` remains supported.)

## Frontmatter contract

Each post file must start with a frontmatter block:

```txt
---
title: Your title
date: 2026-02-19
excerpt: One or two sentence summary for cards and metadata.
kind: note
tags: ai, philosophy, product
draft: false
canonicalUrl: https://example.com/original-post (optional)
coverImage: /path/to/cover.png (optional)
---
```

- `kind` must be `note` or `article`
- `tags` can be comma-separated or a YAML array
- `draft: true` hides a post from public pages/feed

## Validation

Run content validation without starting Next.js:

```bash
npm run content:check
```

This validates frontmatter, derived excerpts, slugs, and date parsing for every post file. If it fails, it should point at the exact post file that needs attention.

## Rendering model

- `.md` posts are compiled to static HTML for the fast path.
- `.mdx` posts remain supported as an escape hatch for component-backed content.
- Prefer semantic Markdown and central CSS styling in `app/globals.css`.

## MDX support

The renderer supports GitHub-flavored markdown and MDX.

Examples:

- headings, lists, quotes, code fences
- inline links, inline code, emphasis
- custom JSX components for `.mdx` posts can be added in `components/blog/MdxRenderer.tsx`

## Dev recovery

If Next starts throwing missing generated chunk errors from `.next` such as missing `./683.js`, missing `./857.js`, or `fallback-build-manifest.json`, treat that as a broken build cache rather than malformed markdown.

Use:

```bash
npm run dev:clean
```
