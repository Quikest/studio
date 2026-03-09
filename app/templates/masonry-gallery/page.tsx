"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  BookmarkIcon,
  HeartIcon,
  LayoutGridIcon,
  SearchIcon,
  ShareIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FramePanel,
} from "@/components/ui/frame"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
  TooltipProvider,
} from "@/components/ui/tooltip"

type Category = "all" | "design" | "photography" | "architecture" | "illustration"

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "design", label: "Design" },
  { value: "photography", label: "Photography" },
  { value: "architecture", label: "Architecture" },
  { value: "illustration", label: "Illustration" },
]

interface GalleryItem {
  id: number
  title: string
  description: string
  category: Exclude<Category, "all">
  tags: string[]
  author: { name: string; initials: string }
  likes: number
  gradient: string
  imageHeight: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Sunset Gradient Study",
    description: "Exploring warm tonal transitions for dashboard backgrounds.",
    category: "design",
    tags: ["color", "gradients"],
    author: { name: "Mia Chen", initials: "MC" },
    likes: 234,
    gradient: "from-amber-200 via-orange-300 to-rose-400",
    imageHeight: "h-48",
  },
  {
    id: 2,
    title: "Fog Over the Valley",
    description: "Morning mist rolling through coastal hills at dawn.",
    category: "photography",
    tags: ["landscape", "nature"],
    author: { name: "Liam Park", initials: "LP" },
    likes: 891,
    gradient: "from-slate-300 via-gray-400 to-slate-500",
    imageHeight: "h-64",
  },
  {
    id: 3,
    title: "Brutalist Library",
    description: "Concrete volumes and cantilevers define this public reading hall.",
    category: "architecture",
    tags: ["brutalist", "public"],
    author: { name: "Ava Torres", initials: "AT" },
    likes: 456,
    gradient: "from-stone-300 via-stone-400 to-stone-500",
    imageHeight: "h-56",
  },
  {
    id: 4,
    title: "Botanical Line Art",
    description: "Minimal single-stroke illustrations of tropical foliage.",
    category: "illustration",
    tags: ["botanical", "minimal"],
    author: { name: "Noah Kim", initials: "NK" },
    likes: 312,
    gradient: "from-emerald-200 via-green-300 to-teal-400",
    imageHeight: "h-40",
  },
  {
    id: 5,
    title: "Type Specimen: Geist",
    description: "Exploring optical sizes and weight axes in variable fonts.",
    category: "design",
    tags: ["typography", "variable fonts"],
    author: { name: "Zoe Wang", initials: "ZW" },
    likes: 178,
    gradient: "from-neutral-200 via-neutral-300 to-neutral-400",
    imageHeight: "h-32",
  },
  {
    id: 6,
    title: "Street Reflections",
    description: "Rain-soaked pavement mirrors the neon glow of the city at night.",
    category: "photography",
    tags: ["urban", "night"],
    author: { name: "Eli Ramos", initials: "ER" },
    likes: 1024,
    gradient: "from-indigo-400 via-purple-500 to-pink-500",
    imageHeight: "h-56",
  },
  {
    id: 7,
    title: "Glass Pavilion",
    description: "A transparency study in structural glass and steel connections.",
    category: "architecture",
    tags: ["modern", "glass"],
    author: { name: "Ava Torres", initials: "AT" },
    likes: 289,
    gradient: "from-sky-200 via-cyan-300 to-blue-400",
    imageHeight: "h-48",
  },
  {
    id: 8,
    title: "Character Expressions",
    description: "Emotion studies for a mobile game protagonist.",
    category: "illustration",
    tags: ["character", "game art"],
    author: { name: "Sam Okafor", initials: "SO" },
    likes: 567,
    gradient: "from-yellow-200 via-amber-300 to-orange-400",
    imageHeight: "h-52",
  },
  {
    id: 9,
    title: "Dashboard Dark Mode",
    description: "Contrast ratios and elevation layers for dark interfaces.",
    category: "design",
    tags: ["dark mode", "UI"],
    author: { name: "Mia Chen", initials: "MC" },
    likes: 643,
    gradient: "from-zinc-600 via-zinc-700 to-zinc-800",
    imageHeight: "h-44",
  },
  {
    id: 10,
    title: "Aerial Coastline",
    description: "Turquoise shallows meeting white sand from 500 feet above.",
    category: "photography",
    tags: ["aerial", "ocean"],
    author: { name: "Liam Park", initials: "LP" },
    likes: 1456,
    gradient: "from-cyan-300 via-teal-400 to-emerald-500",
    imageHeight: "h-60",
  },
  {
    id: 11,
    title: "Courtyard Housing",
    description: "Interlocking volumes create shared outdoor space between units.",
    category: "architecture",
    tags: ["housing", "courtyard"],
    author: { name: "Jun Nakamura", initials: "JN" },
    likes: 198,
    gradient: "from-orange-200 via-amber-300 to-yellow-400",
    imageHeight: "h-36",
  },
  {
    id: 12,
    title: "Isometric Cityscapes",
    description: "Tiny buildings and miniature worlds in pixel-perfect perspective.",
    category: "illustration",
    tags: ["isometric", "pixel"],
    author: { name: "Noah Kim", initials: "NK" },
    likes: 823,
    gradient: "from-violet-300 via-purple-400 to-fuchsia-500",
    imageHeight: "h-48",
  },
  {
    id: 13,
    title: "Component Tokens",
    description: "Mapping semantic design tokens to component-level properties.",
    category: "design",
    tags: ["tokens", "systems"],
    author: { name: "Zoe Wang", initials: "ZW" },
    likes: 412,
    gradient: "from-blue-200 via-indigo-300 to-violet-400",
    imageHeight: "h-36",
  },
  {
    id: 14,
    title: "Golden Hour Portraits",
    description: "Natural light portraiture during the magic hour window.",
    category: "photography",
    tags: ["portrait", "golden hour"],
    author: { name: "Eli Ramos", initials: "ER" },
    likes: 734,
    gradient: "from-amber-300 via-orange-400 to-rose-500",
    imageHeight: "h-52",
  },
  {
    id: 15,
    title: "Transit Station",
    description: "Cantilevered roof forms shelter commuters with minimal structure.",
    category: "architecture",
    tags: ["transit", "infrastructure"],
    author: { name: "Jun Nakamura", initials: "JN" },
    likes: 345,
    gradient: "from-gray-300 via-slate-400 to-gray-500",
    imageHeight: "h-44",
  },
  {
    id: 16,
    title: "Abstract Geometry",
    description: "Overlapping shapes and color fields inspired by Bauhaus compositions.",
    category: "illustration",
    tags: ["abstract", "geometric"],
    author: { name: "Sam Okafor", initials: "SO" },
    likes: 556,
    gradient: "from-rose-300 via-pink-400 to-red-500",
    imageHeight: "h-40",
  },
]

function formatLikes(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

function DesignNotes({ notes }: { notes: string[] }) {
  return (
    <ul className="space-y-2">
      {notes.map((note, i) => (
        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
          <span>{note}</span>
        </li>
      ))}
    </ul>
  )
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const [liked, setLiked] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-xs/5">
      {/* Placeholder image area */}
      <div
        className={cn(
          "relative w-full bg-gradient-to-br",
          item.gradient,
          item.imageHeight,
        )}
      >
        {/* Hover overlay with actions */}
        <div className="absolute inset-0 flex items-start justify-end gap-1.5 bg-black/0 p-2.5 opacity-0 transition-all duration-200 group-hover:bg-black/20 group-hover:opacity-100">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="icon-sm"
                    variant={liked ? "default" : "secondary"}
                    className="size-8 rounded-full shadow-md"
                    onClick={() => setLiked(!liked)}
                  />
                }
              >
                <HeartIcon
                  className={cn("size-3.5", liked && "fill-current")}
                />
                <span className="sr-only">Like</span>
              </TooltipTrigger>
              <TooltipPopup>Like</TooltipPopup>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="icon-sm"
                    variant={saved ? "default" : "secondary"}
                    className="size-8 rounded-full shadow-md"
                    onClick={() => setSaved(!saved)}
                  />
                }
              >
                <BookmarkIcon
                  className={cn("size-3.5", saved && "fill-current")}
                />
                <span className="sr-only">Save</span>
              </TooltipTrigger>
              <TooltipPopup>Save</TooltipPopup>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="icon-sm"
                    variant="secondary"
                    className="size-8 rounded-full shadow-md"
                  />
                }
              >
                <ShareIcon className="size-3.5" />
                <span className="sr-only">Share</span>
              </TooltipTrigger>
              <TooltipPopup>Share</TooltipPopup>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Card metadata */}
      <div className="space-y-2.5 p-3.5">
        <div>
          <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-6 text-[10px]">
              <AvatarFallback>{item.author.initials}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {item.author.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <HeartIcon className="size-3" />
            <span>{formatLikes(item.likes + (liked ? 1 : 0))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MasonryGalleryPage() {
  const [activeCategory, setActiveCategory] = React.useState<Category>("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredItems = React.useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const resultCount = filteredItems.length

  return (
    <div className="flex h-svh flex-col">
      {/* Header toolbar */}
      <header className="flex flex-col gap-3 border-b px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <LayoutGridIcon className="size-4 text-muted-foreground" />
          <h1 className="text-sm font-semibold">Gallery</h1>
          <span className="text-xs text-muted-foreground">
            {resultCount} {resultCount === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Category filters */}
          <div className="-mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search pins..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="pl-8"
              size="sm"
            />
          </div>
        </div>
      </header>

      {/* Gallery content */}
      <ScrollArea scrollFade className="flex-1">
        <div className="p-4 sm:p-6">
          {filteredItems.length > 0 ? (
            <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="mb-4 break-inside-avoid">
                  <GalleryCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <SearchIcon className="mb-3 size-8 text-muted-foreground/40" />
              <p className="text-sm font-medium">No pins found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try adjusting your search or filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setActiveCategory("all")
                  setSearchQuery("")
                }}
              >
                <ArrowLeftIcon data-icon="inline-start" className="size-3.5" />
                Clear filters
              </Button>
            </div>
          )}

          {/* Design Notes */}
          <div className="mt-10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Design Notes
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Frame>
                <FrameHeader>
                  <FrameTitle>Content Density</FrameTitle>
                  <FrameDescription>
                    Masonry vs. uniform grids
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "CSS columns (columns-1 sm:columns-2 md:columns-3 lg:columns-4) let cards fill vertical space naturally without explicit row definitions, maximizing content density.",
                      "Uniform grids waste vertical space by forcing all cards to match the tallest item in each row — masonry eliminates those gaps, showing more content above the fold.",
                      "break-inside-avoid on each card prevents columns from splitting a card across the column boundary, preserving visual integrity of each unit.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Visual Rhythm</FrameTitle>
                  <FrameDescription>
                    Organic flow through variation
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Varying card heights (h-32 through h-64) create an organic, non-repetitive visual pattern that encourages continuous browsing — the eye finds new anchor points rather than scanning rows.",
                      "Gradient placeholders use category-specific color palettes so the page has visual coherence even without real images — warm tones for design, cool for architecture.",
                      "The staggered column layout prevents the rigid grid appearance that signals 'end of content' and creates a sense of abundance that invites exploration.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Discovery Patterns</FrameTitle>
                  <FrameDescription>
                    Filtering and search interaction
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Category pills use single-select behavior (not multi-select) because galleries benefit from progressive narrowing — 'All' provides overview, categories provide focus.",
                      "The filter bar scrolls horizontally on mobile (overflow-x-auto) rather than wrapping, keeping vertical space for content and using a familiar mobile pattern.",
                      "Derived filtering via useMemo ensures the gallery re-renders from a single source of truth — no redundant 'filtered items' state to synchronize.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Card Composition</FrameTitle>
                  <FrameDescription>
                    Layering image, metadata, and actions
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Action buttons appear only on hover (opacity-0 → opacity-100) to keep the resting state clean — content-dense layouts need visual calm until the user signals intent.",
                      "Actions overlay the image area rather than sitting below it, so card height stays compact and the metadata region isn't pushed further from the image.",
                      "Author avatar + name at the bottom creates attribution without competing with the title — the 6px avatar is intentionally smaller than standard to maintain density.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Responsive Columns</FrameTitle>
                  <FrameDescription>
                    Breakpoint strategy for masonry
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Column count (1 → 2 → 3 → 4) targets ~240-280px card width at each breakpoint — narrower cards lose readability, wider cards waste density.",
                      "Single column on mobile preserves full-width cards that work as a feed — the masonry pattern only adds value when multiple columns can be compared.",
                      "The gap-4 spacing is constant across breakpoints rather than scaling with columns, keeping card-to-card proximity consistent and predictable.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Empty States</FrameTitle>
                  <FrameDescription>
                    Handling zero results
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "The empty state provides a clear escape hatch (Clear filters button) so users don't need to manually reset both the category and search query.",
                      "A muted search icon at large size (size-8) fills the void where gallery content would be, maintaining visual weight in the center of the page.",
                      "The empty state appears in the same scroll region as gallery content, not as a modal or overlay, so the transition between states feels natural.",
                    ]}
                  />
                </FramePanel>
              </Frame>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
