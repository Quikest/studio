---
name: create-template
description: Creates full-page layout templates with design principle annotations. Use when building a new page template, adding a layout pattern, creating a multi-panel interface, or when the user mentions "template", "layout template", or "page template".
---

# Create Template

Build full-screen layout templates that demonstrate spatial arrangement patterns. Each template is a self-contained page with design notes explaining the layout decisions.

Before starting, read the [build-interface](../build-interface/SKILL.md) and [design-guide](../design-guide/SKILL.md) skills.

## File Structure

Templates require two files:

| File | Purpose |
|------|---------|
| `design-studio/app/templates/<slug>/page.tsx` | Full-screen demo (outside `/doc` layout, no header) |
| `design-studio/app/doc/templates/page.tsx` | Index page entry (add template card here) |

The demo page uses `h-svh` to fill the viewport. It lives under `/templates/` (not `/doc/templates/`) so the `DocLayout` header does not render.

## Workflow

1. **Define the layout concept** -- what spatial arrangement does this template demonstrate? Name the panels, their roles, and their relationship (co-equal, hierarchical, nested).
2. **Create the demo page** at `design-studio/app/templates/<slug>/page.tsx`
3. **Include design notes** in the content areas (see Design Notes section)
4. **Add a card** to the templates index page with a thumbnail and description
5. **Build and verify** -- `npx next build` in `design-studio/`

## Design Principles to Apply

Every template should address these concerns:

### Spatial Roles
Define the purpose of each region. Name them by function (Inputs, Main, Outputs) not position (Left, Center, Right). Assign flex ratios that reflect relative importance.

### Collapse / Expand
Panels that can hide should preserve spatial awareness -- show an icon + vertical label in the collapsed strip. Use directional icons (ChevronLeft/Right) that hint at collapse direction. Minimum collapsed width: 48px.

### State Management
Prefer derived state over redundant state. If the template has presets (named layout configurations), derive the active preset from panel state via `useMemo` rather than storing it separately.

### Transitions
Animate layout changes with `transition-[flex] duration-300 ease-in-out`. Avoid animating `width` directly -- flex-based transitions are smoother and avoid layout thrash.

### Responsive Behavior
- Mobile-first: base styles for smallest viewport, `md:` / `lg:` for larger
- Secondary panels use `hidden md:block` -- only the primary panel shows on mobile
- Sidebar-based templates switch to Sheet overlay below `md` via the Sidebar component
- Content grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Container Selection
Use `Frame` (with `FrameHeader`, `FrameTitle`, `FramePanel`) as the section container in all templates. Frame provides consistent borders and the muted → card background layering. Wrap scrollable content in `ScrollArea` with `scrollFade`.

### Accessibility
- Icon-only buttons: always include `<span className="sr-only">Label</span>`
- Keyboard shortcuts: document them in design notes
- Tooltips: collapsed icon-only states should show tooltips on hover

## Design Notes

Every template includes design notes that explain the layout decisions. This is educational content embedded in the demo itself.

### Rendering pattern

```tsx
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
```

### Section header for notes inside ScrollArea

```tsx
<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
  Design Notes
</h3>
```

### What to annotate

Organize notes by theme (Hierarchy, Navigation, Responsiveness, Content Area) rather than listing them flat. Each note should explain **why** a decision was made, not just **what** was done.

Good: "Side panels use flex: 1 while the center uses flex: 2, establishing visual weight hierarchy without subordination."

Bad: "The center panel is wider than the side panels."

## Templates Index Card

Add an entry to `design-studio/app/doc/templates/page.tsx`:

1. Create a thumbnail component showing the spatial arrangement using dashed-border boxes with Lucide icons. Vary box widths to hint at the layout proportions.

2. Add to the `templates` array:

```tsx
{
  slug: "your-slug",
  title: "Template Name",
  description: "One-sentence description of the layout and its use case.",
  icon: SomeIcon,        // Lucide icon for the footer label
  thumbnail: YourThumbnail,  // Component from step 1
},
```

3. The card links to `/templates/<slug>` (the full-screen demo).

## Existing Templates

Reference these for patterns and consistency:

| Template | Slug | Pattern |
|----------|------|---------|
| Multi-Column Expandable | `multi-column-expandable` | 3 co-equal panels, flex-based collapse, preset modes |
| Sidebar + Detail | `sidebar-detail` | Hierarchical sidebar/content, icon-only collapse, SidebarProvider |

## Checklist

- [ ] Demo page at `app/templates/<slug>/page.tsx` with `"use client"` and `h-svh`
- [ ] Uses Frame, FrameHeader, FrameTitle, FramePanel for all sections
- [ ] Includes design notes explaining layout decisions
- [ ] Notes organized by theme, explaining "why" not "what"
- [ ] Responsive: works on mobile with appropriate hiding/Sheet behavior
- [ ] Accessible: sr-only labels, tooltips for icon-only states
- [ ] Card added to templates index with thumbnail and description
- [ ] `npx next build` passes with no errors
