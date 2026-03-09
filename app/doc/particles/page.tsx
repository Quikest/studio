"use client"

import * as React from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { componentRegistry, getCategories } from "../registry"
import { ComponentCard } from "../component-card"
import { Badge } from "@/components/ui/badge"

export default function ParticlesPage() {
  const [search, setSearch] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
  const categories = React.useMemo(() => getCategories(), [])

  const filtered = React.useMemo(() => {
    return componentRegistry.filter((entry) => {
      const matchesSearch =
        !search ||
        entry.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !activeCategory || entry.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const count = componentRegistry.length

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Browse Particles
        </h1>
        <p className="mt-4 text-muted-foreground">
          Discover {count} ready-to-use particles, the building blocks of your
          design system.
        </p>
        <p className="text-muted-foreground">
          Filter by category to find the perfect component for your project.
        </p>
      </div>

      <div className="mb-8 flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-xs">
        <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        {activeCategory && (
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="inline-flex shrink-0 items-center gap-1 rounded-sm border bg-muted/50 px-2 py-0.5 text-xs font-medium"
          >
            {activeCategory}
            <XIcon className="size-3" />
          </button>
        )}
        <input
          type="text"
          placeholder={
            activeCategory
              ? `Search ${activeCategory} components...`
              : "Search components..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {!activeCategory && !search && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} type="button" onClick={() => setActiveCategory(cat)}>
              <Badge variant="outline" className="cursor-pointer">
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground">
          <p className="text-lg font-medium">No components found</p>
          <p className="mt-1 text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((entry) => (
            <ComponentCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
