import Link from "next/link"

type FilterValue = "all" | "note" | "article"

interface PostFiltersProps {
  active: FilterValue
}

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "All", value: "all" },
  { label: "Notes", value: "note" },
  { label: "Articles", value: "article" },
]

export function PostFilters({ active }: PostFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {filters.map((filter) => {
        const isActive = active === filter.value
        const href = filter.value === "all" ? "/blog" : `/blog?type=${filter.value}`

        return (
          <Link
            key={filter.value}
            href={href}
            className={[
              "text-xs font-extralight tracking-[0.2em] uppercase transition-colors duration-500",
              isActive
                ? "text-foreground/70"
                : "text-foreground/30 hover:text-foreground/60",
            ].join(" ")}
          >
            {filter.label}
          </Link>
        )
      })}
    </div>
  )
}
