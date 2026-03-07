import { z } from "zod"

const tagsSchema = z.union([
  z.array(z.string().trim().min(1)),
  z.string().trim(),
])

export const postFrontmatterSchema = z.object({
  title: z.string().trim().min(1, "Missing frontmatter: title"),
  date: z
    .union([z.string().trim(), z.date()])
    .transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value))
    .refine((value) => !Number.isNaN(Date.parse(value)), "Frontmatter date must be a valid date string"),
  excerpt: z.string().trim().min(1, "Missing frontmatter: excerpt"),
  kind: z.enum(["note", "article"]),
  tags: tagsSchema
    .optional()
    .transform((value) => {
      if (!value) {
        return []
      }

      if (Array.isArray(value)) {
        return value.map((item) => item.trim()).filter(Boolean)
      }

      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    }),
  draft: z.boolean().default(false),
  canonicalUrl: z.string().url().optional(),
  coverImage: z.string().trim().min(1).optional(),
})
