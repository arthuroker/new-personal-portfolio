"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableTextProps {
  text: string
  maxLength?: number
}

export function ExpandableText({ text, maxLength = 100 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldShowButton = text.length > maxLength
  const displayText = isExpanded ? text : text.slice(0, maxLength) + "..."

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground">{displayText}</p>
      {shouldShowButton && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-primary hover:text-primary/80"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Show less
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              See more
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  )
} 