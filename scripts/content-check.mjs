import { validatePostContent } from "../lib/blog-content.mjs"

async function main() {
  const summary = await validatePostContent()

  console.log(
    [
      `Validated ${summary.totalPosts} post(s).`,
      `${summary.markdownPosts} markdown,`,
      `${summary.mdxPosts} mdx.`,
    ].join(" "),
  )
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exitCode = 1
})
