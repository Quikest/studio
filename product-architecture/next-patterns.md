# Next.js App Router Patterns

Conventions for routing, layouts, data loading, and Next.js-specific patterns. This project uses Next.js 16 with the App Router, React 19, and React Server Components.

---

## Route Organization

Every directory inside `app/` maps to a URL segment. Each route has a `page.tsx` that renders its content.

### Current Structure

```
app/
├── layout.tsx              # Root layout — fonts, providers, stacking context
├── page.tsx                # / — home page
├── globals.css             # Design tokens, Tailwind config
└── doc/
    ├── layout.tsx          # /doc — section layout with header + nav
    ├── page.tsx            # /doc — section landing
    ├── particles/
    │   └── page.tsx        # /doc/particles
    └── style-guide/
        └── page.tsx        # /doc/style-guide
```

### Adding New Routes

Create a directory for each route segment, with a `page.tsx` inside:

```
app/
└── dashboard/
    ├── page.tsx            # /dashboard
    ├── settings/
    │   └── page.tsx        # /dashboard/settings
    └── [projectId]/
        └── page.tsx        # /dashboard/:projectId
```

### Grouping Without URL Segments

Use parenthesized directories for logical grouping that doesn't affect the URL:

```
app/
├── (marketing)/
│   ├── layout.tsx          # Shared layout for marketing pages
│   ├── about/page.tsx      # /about
│   └── pricing/page.tsx    # /pricing
└── (app)/
    ├── layout.tsx          # Shared layout for app pages
    └── dashboard/page.tsx  # /dashboard
```

### Route-Specific Files

Files that serve only one route live alongside their `page.tsx`:

```
app/doc/
├── page.tsx
├── registry.tsx            # Data used only by this route subtree
└── component-card.tsx      # Component used only by this route subtree
```

Move to `components/` when a component is used by more than one route.

---

## Layouts

Layouts wrap pages and persist across navigations within their route segment. They receive `children` and do not re-render when navigating between sibling pages.

### Root Layout (`app/layout.tsx`)

The root layout is responsible for:

1. **HTML structure** — `<html>` and `<body>` tags
2. **Fonts** — Load via `next/font/google` and apply as CSS variables
3. **Theme provider** — `next-themes` ThemeProvider
4. **Stacking context** — `isolate relative` wrapper required by Base UI portals
5. **Global metadata** — default `<title>` and `<meta>` tags

```tsx
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "App Name",
  description: "App description",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="isolate relative flex min-h-svh flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

The root layout is a server component. It should stay minimal — providers, fonts, and the stacking context wrapper.

### Section Layouts

Nested layouts add section-specific chrome (headers, sidebars, navigation) without repeating root concerns:

```tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-muted/50">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          {/* Navigation links with active state via pathname */}
        </div>
      </header>
      {children}
    </div>
  )
}
```

Section layouts need `"use client"` only when they use hooks like `usePathname`. If the layout is purely structural (no hooks, no events), keep it as a server component.

### Layout Rules

1. **Root layout**: always a server component. Contains `<html>`, `<body>`, fonts, providers, and stacking context.
2. **Section layouts**: add navigation, headers, and section-level styling. Use `"use client"` only if using hooks.
3. **Don't duplicate**: each concern lives in exactly one layout. Don't re-add ThemeProvider or fonts in nested layouts.
4. **Persistent UI**: use layouts for UI that persists across pages (navigation, sidebars). Use pages for content that changes.

---

## Page Files

### Server Components by Default

Pages are server components unless they need client-side interactivity:

```tsx
// Server component page — no directive needed
export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      {/* Static content or server-fetched data */}
    </div>
  )
}
```

```tsx
// Client component page — needs interactivity
"use client"

import { useState } from "react"

export default function InteractivePage() {
  const [value, setValue] = useState("")
  return (/* interactive content */)
}
```

### When to Make a Page Client-Side

Prefer keeping pages as server components and pushing interactivity into client child components:

```tsx
// Server page that renders a client form
import { SettingsForm } from "./settings-form"

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      <SettingsForm />  {/* This component is "use client" */}
    </div>
  )
}
```

Only add `"use client"` to the page itself when the entire page is interactive and splitting into child components would be artificial.

---

## Loading States

Add `loading.tsx` to any route that fetches data asynchronously. This file renders while the page's async content loads:

```tsx
// app/dashboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-48 mb-12" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  )
}
```

### Guidelines

- Match the loading skeleton layout to the actual page layout for a smooth transition.
- Use the same max-width container and padding as the page.
- Combine `Skeleton` components from Coss UI to approximate the real content shapes.
- Don't add `loading.tsx` to routes that render instantly (static content, no data fetching).

### Suspense Boundaries

For more granular loading states within a page, use `<Suspense>` with a fallback:

```tsx
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <AsyncDataSection />
      </Suspense>
    </div>
  )
}
```

---

## Error Handling

Add `error.tsx` to route segments that need error recovery. See [error-handling.md](./error-handling.md) for the full error strategy.

```tsx
// app/dashboard/error.tsx
"use client"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (/* error UI */)
}
```

Error boundaries must be client components (`"use client"`).

---

## Not Found Pages

Add `not-found.tsx` to customize the 404 experience:

```tsx
// app/not-found.tsx
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchIcon className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            The page you're looking for doesn't exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <Button render={<Link href="/" />}>Go Home</Button>
      </Empty>
    </div>
  )
}
```

Place at `app/not-found.tsx` for the global 404, or in a route segment for section-specific 404s.

---

## Metadata

### Static Metadata

Export a `metadata` object from `page.tsx` or `layout.tsx` (server components only):

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
}
```

### Dynamic Metadata

Use `generateMetadata` when the title depends on route params or fetched data:

```tsx
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>
}): Promise<Metadata> {
  const { projectId } = await params
  return {
    title: `Project ${projectId}`,
  }
}
```

### Template Titles

Define a title template in the root layout so page titles automatically include the app name:

```tsx
export const metadata: Metadata = {
  title: {
    default: "Studio",
    template: "%s | Studio",
  },
}
```

Pages that set `title: "Settings"` will render as "Settings | Studio" in the browser tab.

---

## Navigation

### Link Component

Use `next/link` for all internal navigation:

```tsx
import Link from "next/link"

<Link href="/dashboard">Dashboard</Link>
```

Combine with the `render` prop to make navigation elements look like buttons:

```tsx
<Button render={<Link href="/dashboard" />}>Go to Dashboard</Button>
```

### Active Link Detection

Use `usePathname` from `next/navigation` to highlight the current route:

```tsx
"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const pathname = usePathname()

<Link
  href="/doc/particles"
  className={cn(
    "rounded-md px-3 py-1.5 text-sm",
    pathname === "/doc/particles"
      ? "bg-accent font-medium text-accent-foreground"
      : "text-muted-foreground hover:text-foreground",
  )}
>
  Particles
</Link>
```

### Programmatic Navigation

Use `useRouter` from `next/navigation` for programmatic navigation (after form submission, etc.):

```tsx
"use client"

import { useRouter } from "next/navigation"

const router = useRouter()
router.push("/dashboard")
router.replace("/login")
router.back()
```

---

## Data Fetching (Future Patterns)

When the app introduces data fetching, follow these patterns:

### Server Component Data

Fetch data directly in server components:

```tsx
export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div>
      {projects.map((project) => (
        <Card key={project.id}>{/* ... */}</Card>
      ))}
    </div>
  )
}
```

### Server Actions

Use server actions for mutations (creating, updating, deleting data):

```tsx
// app/actions.ts
"use server"

export async function createProject(formData: FormData) {
  // validate, persist, revalidate
}
```

```tsx
// In a client component
<form action={createProject}>
  {/* form fields */}
</form>
```

### Revalidation

Use `revalidatePath` or `revalidateTag` after mutations to refresh cached data:

```tsx
"use server"

import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
  await db.projects.create(/* ... */)
  revalidatePath("/dashboard")
}
```

---

## Theme System

Theme switching is handled by `next-themes`:

- **Provider**: `ThemeProvider` wraps the app in the root layout with `attribute="class"` and `defaultTheme="system"`
- **Toggle**: `ThemeToggle` component cycles light -> dark -> system
- **Hydration**: `suppressHydrationWarning` on `<html>` prevents flash. Theme-dependent components should handle the mounted state (see `ThemeToggle` pattern with `useState` + `useEffect`)

### Handling Hydration Mismatch

Components that render differently based on theme must wait for client mount:

```tsx
"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeAwareComponent() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <Skeleton />  // or a neutral placeholder

  return <div>{/* theme-dependent content */}</div>
}
```

---

## References

- [Project Conventions](./project-conventions.md) — file naming, imports, directory structure
- [Design Guide](./design-guide.md) — page layout, visual hierarchy, component assembly
- [Coss UI Best Practices](./coss-ui-best-practices.md) — component APIs, render prop, naming
- [Error Handling](./error-handling.md) — error boundaries, form validation, feedback mapping
