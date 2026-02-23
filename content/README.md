# Blog Content

Posts are stored as Markdown or MDX files in this folder and rendered at `/blog`.

## File naming

Use a date-first slug so posts stay easy to scan:

`YYYY-MM-DD-your-slug.mdx`

(`.md` is also supported.)

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

## MDX support

The renderer supports GitHub-flavored markdown and MDX via `next-mdx-remote/rsc`.

Examples:

- headings, lists, quotes, code fences
- inline links, inline code, emphasis
- custom JSX components can be added in `components/blog/MarkdownRenderer.tsx`
