'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ExpandableText } from "@/components/expandable-text"

interface ProjectCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  technologies: string[]
}

export function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  technologies,
}: ProjectCardProps) {
  return (
    <Card
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:translate-y-[-8px] border-primary/10 bg-background/50 backdrop-blur-sm"
    >
      <div className="aspect-video relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4">
          <ExpandableText text={description} maxLength={120} />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
} 