# Project Conventions

Standards for file organization, naming, imports, and code structure across the codebase.

---

## Repository Structure

```
studio/
├── design-studio/            # Next.js application
│   ├── app/                  # App Router (routes, layouts, pages)
│   ├── components/           # All React components
│   │   └── ui/               # Coss UI particles (managed via shadcn CLI)
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Shared utilities
├── product-architecture/     # Developer guides and best practices
└── .cursor/skills/           # Cursor AI skills
```

All application code lives inside `design-studio/`. The `product-architecture/` directory contains documentation only — no runtime code.

---

## File Naming

Use `kebab-case` for all files and directories:

```
components/ui/alert-dialog.tsx     # correct
components/ui/AlertDialog.tsx      # wrong
components/ui/alertDialog.tsx      # wrong

hooks/use-media-query.ts           # correct
hooks/useMediaQuery.ts             # wrong
```

| Convention | Example |
|---|---|
| Components | `theme-toggle.tsx`, `component-card.tsx` |
| UI particles | `alert-dialog.tsx`, `toggle-group.tsx` |
| Hooks | `use-media-query.ts` (always prefixed with `use-`) |
| Utilities | `utils.ts` |
| Route pages | `page.tsx` |
| Route layouts | `layout.tsx` |
| CSS | `globals.css` |

---

## Directory Responsibilities

### `app/`

Routes and route-specific files only. Each directory maps to a URL segment.

```
app/
├── layout.tsx           # Root layout (fonts, providers, stacking context)
├── page.tsx             # Home page
├── globals.css          # Design tokens and global styles
└── doc/
    ├── layout.tsx       # Doc section layout (header, nav)
    ├── page.tsx         # /doc landing page
    ├── registry.tsx     # Route-specific data (component registry)
    ├── component-card.tsx  # Route-specific component
    ├── particles/
    │   └── page.tsx     # /doc/particles
    └── style-guide/
        └── page.tsx     # /doc/style-guide
```

Route-specific components and data (like `registry.tsx` and `component-card.tsx`) can live alongside their route when they are only used by that route. If a component is reused across routes, move it to `components/`.

### `components/`

All React components. Split into two tiers:

| Directory | Purpose | How to Add |
|---|---|---|
| `components/ui/` | Coss UI particles from the `@coss` registry | `npx shadcn@latest add <name>` (see [Adding Components](#adding-coss-ui-components)) |
| `components/` | App-specific components | Create manually |

Never put app-specific components in `components/ui/`. That directory is managed by the Coss UI CLI and should only contain design system particles.

### `hooks/`

Custom React hooks. One hook per file, named `use-<name>.ts`:

```
hooks/
└── use-media-query.ts   # exports useMediaQuery, useIsMobile
```

### `lib/`

Shared non-React utilities. Currently contains only `cn()` for class merging:

```
lib/
└── utils.ts             # cn() — clsx + tailwind-merge
```

Add new utility functions to `lib/utils.ts` for small helpers, or create a new file in `lib/` for larger modules (e.g., `lib/date.ts`, `lib/format.ts`).

---

## Import Conventions

### Path Alias

All imports within the app use the `@/` alias, which maps to `design-studio/`:

```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
```

Never use relative paths (`../`) for cross-directory imports. Relative paths are acceptable only within the same directory (e.g., a route importing a sibling file).

### No Barrel Exports

Do not create `index.ts` files for re-exporting. Import directly from the source file:

```tsx
// Correct — direct import
import { Button } from "@/components/ui/button"
import { Dialog, DialogPopup, DialogTitle } from "@/components/ui/dialog"

// Wrong — barrel import
import { Button } from "@/components/ui"
```

### Import Order

Group imports in this order, separated by blank lines:

1. React and Next.js
2. Third-party libraries
3. `@/` aliased imports (components, hooks, lib)
4. Relative imports

```tsx
import * as React from "react"
import Link from "next/link"

import { cva, type VariantProps } from "class-variance-authority"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { SomeLocalHelper } from "./helper"
```

---

## Component File Structure

### UI Particles (`components/ui/`)

Coss UI particle files follow this structure:

```tsx
"use client";

// 1. Base UI primitive import
import { Field as FieldPrimitive } from "@base-ui/react/field";

// 2. Utility imports
import { cn } from "@/lib/utils";

// 3. Component functions (one per sub-component)
function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      className={cn("...", className)}
      data-slot="field"
      {...props}
    />
  );
}

// 4. Re-exports of primitives and styled components
export {
  Field,
  FieldLabel,
  FieldPrimitive,
};
```

Key patterns:
- `"use client"` directive at top (most UI components need it)
- `data-slot` attribute on every component for styling hooks
- `cn()` for merging class names, always accepting `className` as a prop
- Re-export the Base UI primitive as `*Primitive` for escape-hatch usage
- Components that support composition accept the `render` prop via `useRender`

### App-Specific Components

```tsx
"use client"  // only if the component uses hooks, event handlers, or browser APIs

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MyComponentProps {
  // props
}

export function MyComponent({ ...props }: MyComponentProps) {
  return (/* JSX */)
}
```

### Props Pattern

Use `interface` for component props. Extend from the underlying element or component props:

```tsx
// Extending HTML element props
interface CardExampleProps extends React.ComponentProps<"div"> {
  title?: string
}

// Extending Base UI primitive props
interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
}
```

Use named exports, not default exports, for components:

```tsx
// Correct
export function MyComponent() {}

// Wrong
export default function MyComponent() {}
```

Exception: `page.tsx` and `layout.tsx` files use `export default` as required by Next.js.

---

## Client vs Server Components

### Default to Server

Components are server components by default in the App Router. Only add `"use client"` when the component needs:

- React hooks (`useState`, `useEffect`, `useRef`, etc.)
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `document`, `localStorage`)
- Third-party client libraries (`next-themes`, `useSyncExternalStore`)

### Where the Boundary Sits

```
Server Components (no directive needed)
├── app/layout.tsx          # Root layout — server component
├── app/page.tsx            # Can be server if no interactivity
├── app/doc/page.tsx        # Static content — server component
│
Client Components ("use client")
├── app/doc/layout.tsx      # Uses usePathname for active nav
├── components/ui/*.tsx     # Most UI particles need client
├── components/theme-toggle.tsx  # Uses useTheme hook
└── hooks/*.ts              # Hooks are always client
```

### Rules

1. Keep `"use client"` as close to the leaves as possible — don't make a layout client-side just because one child needs interactivity.
2. Pages that only render static content or server-fetched data should remain server components.
3. All `components/ui/` files include `"use client"` because they use Base UI primitives that require it.
4. Server components can import and render client components. Client components cannot import server components (but can accept them as `children`).

---

## Adding Coss UI Components

New particles are added via the shadcn CLI using the `@coss` registry configured in `components.json`:

```bash
npx shadcn@latest add <component-name>
```

This pulls the component from `https://coss.com/ui/r/{name}.json` and places it in `components/ui/`.

The `components.json` configuration:

```json
{
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@coss": "https://coss.com/ui/r/{name}.json"
  }
}
```

After adding a component, you own the source code and can modify it. The file will appear in `components/ui/<name>.tsx`.

---

## Styling Conventions

### Tailwind CSS v4

Styles use Tailwind utility classes. Design tokens are defined as CSS variables in `app/globals.css` and mapped to Tailwind via `@theme inline`.

### Class Merging

Always use `cn()` from `@/lib/utils` when a component accepts a `className` prop:

```tsx
function MyComponent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("base-classes", className)} {...props} />
}
```

### CVA for Variants

Use `class-variance-authority` for components with multiple variants:

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "...",
      outline: "...",
    },
    size: {
      default: "...",
      sm: "...",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
```

### Icons

Use `lucide-react` for all icons. Import individual icons, not the entire library:

```tsx
import { PlusIcon, SettingsIcon } from "lucide-react"
```

---

## Package Management

**npm** is the package manager. Always run commands from the `design-studio/` directory:

```bash
cd design-studio
npm install
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```

---

## TypeScript

TypeScript is configured with `strict: true`. Key settings:

- **Path alias**: `@/*` maps to `./*` (relative to `design-studio/`)
- **JSX**: `react-jsx` (no React import needed for JSX)
- **Module**: `esnext` with `bundler` resolution

---

## Linting

ESLint is configured with `eslint-config-next` (core web vitals + TypeScript rules). Run with:

```bash
npm run lint
```

No custom rules are added beyond the Next.js defaults. When adding new rules, update `eslint.config.mjs`.
