---
name: design-guide
description: Aligns UI implementation to the project's design system and style guide. Use when deciding page layout, choosing containers (Frame vs Card), applying typography and color tokens, setting spacing and density, selecting overlays, choosing icons and shadows, or reviewing UI for visual consistency. Covers visual hierarchy, responsive patterns, accessibility, and all style guide foundations (logo, colors, radius, shadows, iconography). For component-level APIs and the render prop, see the build-interface skill.
---

# Design Guide

Design alignment rules for pages and features built with Coss UI. For component-level implementation patterns (render prop, naming, APIs), see the [build-interface skill](../build-interface/SKILL.md). For full code examples and page recipes, read [design-guide.md](../../../product-architecture/design-guide.md).

## Style Guide Foundations

The live style guide is at `design-studio/app/doc/style-guide/page.tsx`. These are the visual tokens everything is built on.

### Logo

Uses the `<Logo>` component with `currentColor` — adapts to light/dark automatically.

| Variant | Use |
|---|---|
| `horizontal` | Navigation bars, page headers (preferred default) |
| `stacked` | Splash screens, favicons |
| `mark` | Tight spaces (toolbars, app icons), established brand context |
| `wordmark` | Text-heavy contexts (footers, legal) |

Rules: never apply brand colors to the logo, never rotate/stretch/add effects. Clear space = mark diameter. Min mark 16px, min lockup 100px wide.

### Color Tokens

All colors are semantic CSS variables. Use via Tailwind (`bg-primary`, `text-muted-foreground`, etc.).

| Group | Tokens |
|---|---|
| **Backgrounds** | `background`, `foreground`, `card`/`-foreground`, `popover`/`-foreground` |
| **Brand** | `primary`/`-foreground`, `secondary`/`-foreground`, `accent`/`-foreground`, `muted`/`-foreground` |
| **Semantic** | `destructive`/`-foreground`, `info`/`-foreground`, `success`/`-foreground`, `warning`/`-foreground` |
| **Borders** | `border`, `input`, `ring` |
| **Charts** | `chart-1` through `chart-5` |
| **Sidebar** | `sidebar`, `sidebar-foreground`, `sidebar-primary`/`-foreground`, `sidebar-accent`/`-foreground`, `sidebar-border`, `sidebar-ring` |
| **Code** | `code`, `code-foreground`, `code-highlight` |

Background layers: `--background` > `--card` > `--muted` > `--card` (Frame handles this automatically).

Semantic colors carry meaning — never use for decoration:
- `destructive` = errors, delete actions
- `info` = informational notices
- `success` = completions, positive status
- `warning` = caution, approaching limits

Brand: `primary` for CTAs, `secondary` for less prominent actions, `muted` for subdued text/backgrounds.

Borders use alpha blending (`--alpha(black / 8%)`). Do not override with solid colors.

### Border Radius

Base radius: 0.625rem (10px). Use Tailwind `rounded-*` classes.

| Token | Class |
|---|---|
| `sm` | `rounded-sm` |
| `md` | `rounded-md` |
| `lg` | `rounded-lg` |
| `xl` | `rounded-xl` |
| `2xl` | `rounded-2xl` |
| `3xl` | `rounded-3xl` |
| `4xl` | `rounded-4xl` |

### Shadows

Elevation scale — lighter for subtle depth, heavier for overlays. All use opacity modifiers on components.

| Token | Use |
|---|---|
| `shadow-xs` | Inputs, toggles, subtle depth |
| `shadow-sm` | Cards, tabs, floating sidebar |
| `shadow-md` | Hover cards, elevated elements |
| `shadow-lg` | Dialogs, sheets, toasts, popovers |
| `shadow-xl` | Command palette, top-level modals |

### Iconography

Icons use **Lucide React**. Components auto-size icons via `[&_svg]` selectors — use explicit size classes only when overriding.

| Size | Pixels | Use |
|---|---|---|
| `size-3` | 12px | Inline indicators, breadcrumb separators |
| `size-3.5` | 14px | Small inline icons, card action arrows |
| `size-4` | 16px | Default component icons (sm screens), menu items |
| `size-4.5` | 18px | Default component icons (base screens) |
| `size-5` | 20px | Emphasized icons, navigation items |
| `size-6` | 24px | Empty state media, feature highlights |

Conventions:
- Button icons: `data-icon="inline-start"` for auto-sizing and spacing
- Icon-only buttons: always add `<span className="sr-only">` for accessibility
- Secondary icons: `opacity-80`; disabled icons: `opacity-60`
- Stroke width: default 2px — don't override

## Page Shell

Wrap page content in a max-width container with responsive padding:

```tsx
<div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
```

| Width | Use |
|---|---|
| `max-w-md` | Single-column forms, auth |
| `max-w-lg` | Settings panels |
| `max-w-2xl` | Detail views, articles |
| `max-w-4xl` | Dashboards, tables |
| `max-w-5xl` | Standard pages |
| `max-w-7xl` | Wide multi-column layouts |

## Page Header

Every page starts with title + description, with `mb-12` spacing before content:

```tsx
<div className="mb-12">
  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Title</h1>
  <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Description.</p>
</div>
```

When the header includes actions, use `flex items-start justify-between gap-4`.

## Vertical Rhythm

| Spacing | Use |
|---|---|
| `space-y-10` | Between major page sections (Frames, Card groups) |
| `space-y-8` | Between subsections within a Frame |
| `space-y-6` | Between content groups |
| `space-y-4` | Between form fields or list items |

## Typography

| Element | Classes |
|---|---|
| Page title | `text-4xl font-bold tracking-tight sm:text-5xl` |
| Page description | `text-lg text-muted-foreground` |
| Section title | `FrameTitle` or `text-lg font-semibold` |
| Panel heading | `text-sm font-semibold` |
| Body | `text-sm` |
| Label / metadata | `text-xs font-semibold uppercase tracking-wider text-muted-foreground` |
| Caption | `text-xs text-muted-foreground` |
| Code | `text-sm font-mono` |

Fonts: `--font-sans` (Geist Sans) for body, `--font-heading` for modal/empty titles (auto-applied by title components), `--font-mono` (Geist Mono) for code.

Type scale: `text-xs` through `text-5xl`.

Weights: `font-bold` page titles only, `font-semibold` section headings, `font-medium` interactive labels, `font-normal` body.

## Container Selection

| Component | When |
|---|---|
| **Frame** | Grouping related settings or content sections (muted bg with white panels) |
| **Card** | Standalone content blocks with metadata and actions |
| **Tabs** | Multiple views of related content in the same space |
| **Separator** | Dividing content in flat layouts |

Frame is the primary section container. Use it for settings pages, config panels, and grouped content.

## Spacing and Density

Components are one size smaller than shadcn defaults (32px default, not 36px). Use `size="lg"` for conventional sizing, `size="xs"` for toolbars and table actions.

Spacing scale: 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px), 12 (48px), 16 (64px), 24 (96px), 32 (128px), 48 (192px), 64 (256px).

| Gap | Use |
|---|---|
| `gap-2` | Button rows, badge clusters, inline actions |
| `gap-3` | Compact lists, token grids |
| `gap-4` | Form fields, list entries |
| `gap-6` | Card/frame panel content |
| `gap-8` | Subsections within a frame |

## Forms

- Wrap every control in `Field` with `FieldLabel`
- Grid related fields: `grid grid-cols-1 gap-4 sm:grid-cols-2`
- Full-width fields span grid: `className="sm:col-span-2"`
- Group related fields with `Fieldset` + `FieldsetLegend`
- Actions: primary first, secondary second, in `flex gap-2`
- Card forms use `CardFooter`, dialog forms use `DialogFooter`

## Feedback

| Need | Component |
|---|---|
| Persistent contextual message | `Alert` (default, error, success, warning) |
| Transient action confirmation | `Toast` via `toastManager.add()` |
| Status label | `Badge` |
| Zero-data state | `Empty` with icon, title, description, and optional action |
| Loading placeholder | `Skeleton` matching real content dimensions |
| Determinate progress | `Progress` |
| Measured value | `Meter` |

Rule: if users need to read and act on it, use Alert. If it's a brief confirmation, use Toast.

## Overlay Selection

| Component | Purpose |
|---|---|
| **Dialog** | Data entry forms, multi-step flows |
| **AlertDialog** | Destructive/significant action confirmation |
| **Sheet** | Detail panels, filters, secondary content |
| **Popover** | Small contextual controls anchored to trigger |
| **Tooltip** | Brief explanatory text on hover/focus |
| **Menu** | Action lists, options |

All modals follow: Popup > Header > Panel (scrollable) > Footer.

## Destructive Actions

Two-tier pattern:
1. Trigger: `variant="destructive-outline"` (low alarm)
2. Confirmation: `variant="destructive"` inside AlertDialog (full emphasis)

Placement:
- Menus: last item, after `MenuSeparator`
- Pages: separate "Danger Zone" Frame
- Never adjacent to submit buttons without clear differentiation

Always require AlertDialog confirmation for irreversible actions.

## Responsive

- Mobile-first: base styles for mobile, `sm:` / `md:` / `lg:` for larger
- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Actions: `flex flex-col gap-2 sm:flex-row`
- Titles: `text-4xl sm:text-5xl`
- Padding: `px-4 sm:px-6 lg:px-8`
- Dialogs use `bottomStickOnMobile` by default — do not disable

## Accessibility

- Icon-only buttons: always include `<span className="sr-only">Label</span>`
- Icon + label buttons: use `data-icon="inline-start"` on the icon
- Every input needs a `Field` wrapper with `FieldLabel`
- Use `sr-only` on `FieldLabel` for visually hidden labels
- Never rely on color alone — pair with text or icons
- `Group` requires `GroupSeparator` between items

## Reference

For the live style guide (logo, color swatches, type scale, radius, spacing, shadows, icons):
- [style-guide page](../../../design-studio/app/doc/style-guide/page.tsx)

For complete code examples and page assembly recipes (settings page, data list page):
- [design-guide.md](../../../product-architecture/design-guide.md)

For component APIs, the render prop, naming conventions, and composition patterns:
- [build-interface skill](../build-interface/SKILL.md)
- [coss-ui-best-practices.md](../../../product-architecture/coss-ui-best-practices.md)
