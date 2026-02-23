'use client'

import { useState } from 'react'
import QuietImperfection from './variations/QuietImperfection'
import SumieReveal from './variations/SumieReveal'
import KintsugiOpening from './variations/KintsugiOpening'
import DawnLight from './variations/DawnLight'
import FloatingDust from './variations/FloatingDust'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

type HeroVariation = 'quiet' | 'sumie' | 'kintsugi' | 'dawn' | 'dust'

export default function HeroSwitcher() {
  const [variation, setVariation] = useState<HeroVariation>('sumie')
  
  // We use a key to force re-mount when switching, so the opening animation plays again
  const renderVariation = () => {
    switch (variation) {
      case 'quiet': return <QuietImperfection key="quiet" />
      case 'sumie': return <SumieReveal key="sumie" />
      case 'kintsugi': return <KintsugiOpening key="kintsugi" />
      case 'dawn': return <DawnLight key="dawn" />
      case 'dust': return <FloatingDust key="dust" />
      default: return <SumieReveal key="default" />
    }
  }

  return (
    <div className="relative">
      {renderVariation()}
      
      {/* Switcher UI - Fixed position so it's always accessible but subtle */}
      <div className="fixed bottom-6 left-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-md border-earth-2 text-xs font-extralight tracking-widest text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all duration-300">
              Animation: {
                variation === 'quiet' ? 'Quiet Imperfection' :
                variation === 'sumie' ? 'Sumi-e Reveal' :
                variation === 'kintsugi' ? 'Kintsugi Opening' :
                variation === 'dawn' ? 'Dawn Light' :
                'Floating Dust'
              } <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-background/90 backdrop-blur-md border-earth-2 min-w-[180px]">
            <DropdownMenuItem onClick={() => setVariation('quiet')} className="text-xs font-extralight tracking-widest cursor-pointer">
              Quiet Imperfection
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setVariation('sumie')} className="text-xs font-extralight tracking-widest cursor-pointer">
              Sumi-e Reveal
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setVariation('kintsugi')} className="text-xs font-extralight tracking-widest cursor-pointer">
              Kintsugi Opening
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setVariation('dawn')} className="text-xs font-extralight tracking-widest cursor-pointer">
              Dawn Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setVariation('dust')} className="text-xs font-extralight tracking-widest cursor-pointer">
              Floating Dust
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
