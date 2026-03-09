# Studio

Themable starter project template for building production interfaces with [Next.js](https://nextjs.org), [Tailwind CSS v4](https://tailwindcss.com), [Base UI](https://base-ui.com), and [Coss UI](https://coss.com/ui) Styles.

Studio provides a complete design system foundation — tokens, typography, spacing, color, and 50+ pre-styled UI particles — along with a library of full-page layout templates you can use as starting points for real features.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS v4 with CSS variable design tokens |
| Primitives | Base UI (unstyled, accessible components) |
| Particles | Coss UI (styled components via `shadcn` CLI) |
| Variants | class-variance-authority |
| Icons | lucide-react |
| Theming | next-themes (light / dark / system) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the documentation and templates.

## Project Structure

```
studio/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, providers, stacking context)
│   ├── page.tsx                # Home
│   ├── globals.css             # Design tokens and Tailwind config
│   ├── doc/                    # Documentation section
│   │   ├── particles/          # Component catalog
│   │   ├── style-guide/        # Visual style reference
│   │   └── templates/          # Template gallery
│   └── templates/              # Full-page layout templates
│       ├── app-home/
│       ├── command-center/
│       ├── dashboard-grid/
│       ├── image-generator/
│       ├── login/
│       ├── marketing-page/
│       ├── masonry-gallery/
│       ├── master-detail/
│       ├── multi-column-expandable/
│       ├── notes-dashboard/
│       ├── sidebar-detail/
│       └── workspace/
├── components/
│   ├── ui/                     # Coss UI particles (managed via shadcn CLI)
│   └── *.tsx                   # App-specific components
├── hooks/                      # Custom React hooks
├── lib/                        # Shared utilities
└── product-architecture/       # Developer guides and best practices
```

## Templates

Studio ships with 12 page templates covering common application layouts:

- **App Home** — landing/overview page
- **Command Center** — action-oriented control panel
- **Dashboard Grid** — multi-card data overview
- **Image Generator** — media creation interface
- **Login** — authentication page
- **Marketing Page** — public-facing content
- **Masonry Gallery** — image/content grid
- **Master Detail** — list + detail split view
- **Multi-Column Expandable** — collapsible multi-panel layout
- **Notes Dashboard** — content management workspace
- **Sidebar Detail** — sidebar navigation with detail pane
- **Workspace** — full application shell

## Adding Components

New Coss UI particles are added via the shadcn CLI:

```bash
npx shadcn@latest add <component-name>
```

Components are pulled from the `@coss` registry and placed in `components/ui/`. Once added, you own the source and can modify freely.

## Design System

Design tokens are defined as CSS variables in `app/globals.css` and mapped to Tailwind via `@theme inline`. The system covers:

- **Color** — semantic tokens (`destructive`, `info`, `success`, `warning`) plus brand colors (`primary`, `secondary`, `accent`, `muted`) with alpha-based borders for depth
- **Typography** — Geist Sans for body, a configurable heading font for titles, Geist Mono for code
- **Spacing** — compact by default (components are one size smaller than shadcn/ui defaults)
- **Theming** — light and dark modes with system preference detection

## Architecture Docs

The `product-architecture/` directory contains guides for building on top of Studio:

- **[Project Conventions](product-architecture/project-conventions.md)** — file naming, imports, directory structure
- **[Design Guide](product-architecture/design-guide.md)** — page layout, visual hierarchy, component assembly
- **[Coss UI Best Practices](product-architecture/coss-ui-best-practices.md)** — component APIs, the `render` prop, naming conventions
- **[Next.js Patterns](product-architecture/next-patterns.md)** — routing, layouts, data fetching, error boundaries
- **[Error Handling](product-architecture/error-handling.md)** — error feedback mapping, form validation, recovery
- **[Agent Readiness](product-architecture/agent-readiness.md)** — building products that agents can operate

## License

[MIT](LICENSE)
