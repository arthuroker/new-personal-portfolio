interface MarkdownRendererProps {
  html: string
}

export function MarkdownRenderer({ html }: MarkdownRendererProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
