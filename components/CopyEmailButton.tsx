"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const email = "arthuroker@email.virginia.edu"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
      onClick={handleCopy}
      aria-label="Copy email"
    >
      <Copy className="h-4 w-4" />
      <span className="sr-only">Copy email</span>
      {copied && (
        <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 text-xs bg-muted px-2 py-1 rounded shadow">
          Copied!
        </span>
      )}
    </Button>
  )
} 