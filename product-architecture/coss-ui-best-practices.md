# Building Interfaces with Coss UI

Guidelines for building production-quality interfaces using Coss UI components, Base UI primitives, and Tailwind CSS.

---

## Foundation

Coss UI is built on [Base UI](https://base-ui.com/) (not Radix UI) and styled with [Tailwind CSS v4](https://tailwindcss.com/). Components follow a copy-paste ownership model — you own the source code and can modify it freely.

### Three-Layer Architecture

| Layer | Purpose | Example |
|---|---|---|
| **Primitives** | Unstyled, accessible building blocks from Base UI | `Dialog.Root`, `Toggle.Root` |
| **Particles** | Pre-assembled, styled components combining primitives | `Button`, `Card`, `Frame`, `Sheet` |
| **Atoms** | API-enhanced particles that integrate with external data | Auth flows, scheduling components |

Choose the right level of abstraction for each use case. Use primitives when you need full control, particles for standard patterns, atoms when connecting to APIs.

---

## The `render` Prop (Not `asChild`)

The most important pattern in Coss UI. Base UI uses `render` instead of Radix's `asChild` for component composition.

### How It Works

The `render` prop lets one component adopt the appearance and behavior of another. The children of the outer component become the content:

```tsx
// Make a link look like a button
<Button render={<Link href="/login" />}>Login</Button>

// Make a button act as a dialog trigger
<DialogTrigger render={<Button variant="outline" />}>
  Open Dialog
</DialogTrigger>

// Make a badge into a link
<Badge render={<Link href="/new" />}>New</Badge>
```

### Key Difference from Radix

```tsx
// Radix/shadcn (DO NOT USE)
<DialogTrigger asChild>
  <Button>Open</Button>
</DialogTrigger>

// Coss UI (CORRECT)
<DialogTrigger render={<Button />}>Open</DialogTrigger>
```

Notice that with `render`, the children text goes on the outer component, not the inner one.

---

## Component Naming Conventions

Coss UI prefers updated names for clarity, but maintains legacy aliases for compatibility:

| Preferred (Coss UI) | Legacy Alias | Notes |
|---|---|---|
| `*Popup` | `*Content` | `DialogPopup`, `SheetPopup`, `PopoverPopup`, `TooltipPopup` |
| `*Panel` | `*Content` | `AccordionPanel`, `CollapsiblePanel`, `TabsPanel`, `CardPanel` |
| `TabsTab` | `TabsTrigger` | Tab trigger button |
| `Toggle` (in ToggleGroup) | `ToggleGroupItem` | Individual toggle in a group |
| `Radio` | `RadioGroupItem` | Individual radio button |
| `Menu*` | `DropdownMenu*` | Full menu system |
| `MenuPopup` | `DropdownMenuContent` | Menu popup container |
| `MenuGroupLabel` | `DropdownMenuLabel` | Menu group label |

**Recommendation**: Use the preferred names in new code. Legacy aliases exist for migration convenience but the preferred names better reflect the Base UI mental model.

---

## Component Composition Patterns

### Dialog / AlertDialog / Sheet

All modal components follow the same structure:

```tsx
<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Open
  </DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogPanel>
      {/* Scrollable content area */}
    </DialogPanel>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
      <DialogClose render={<Button />}>Confirm</DialogClose>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

Key points:
- Use `DialogPanel` / `SheetPanel` to wrap scrollable content between Header and Footer
- `DialogPopup` automatically handles portal, backdrop, and viewport
- `DialogFooter` has `variant="default"` (with border/background) or `variant="bare"`
- `showCloseButton` prop on `DialogPopup` controls the X button (default: `true`)
- `bottomStickOnMobile` sticks Dialog/AlertDialog to bottom on mobile (default: `true`)

### Accordion

```tsx
<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionPanel>Content</AccordionPanel>
  </AccordionItem>
</Accordion>
```

- Use `multiple` prop (boolean) instead of `type="single"` / `type="multiple"`
- Always pass `defaultValue` as an array: `defaultValue={["item-1"]}`
- No `collapsible` prop — collapsibility is the default behavior

### Select

```tsx
const items = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
]

<Select items={items} defaultValue={null}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectPopup>
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectPopup>
</Select>
```

- Always pass `items` prop to `Select` for SSR compatibility and mount performance
- Placeholder is handled by including `{ label: "Select...", value: null }` in items, or use `defaultValue={null}`
- Use `SelectPopup` (preferred) over `SelectContent`

### Menu (Dropdown)

```tsx
<Menu>
  <MenuTrigger render={<Button />}>Actions</MenuTrigger>
  <MenuPopup>
    <MenuGroup>
      <MenuGroupLabel>Account</MenuGroupLabel>
      <MenuItem onClick={() => console.log("clicked")}>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
    </MenuGroup>
    <MenuSeparator />
    <MenuItem variant="destructive">Sign Out</MenuItem>
  </MenuPopup>
</Menu>
```

- Import from `@/components/ui/menu` (preferred) or `@/components/ui/dropdown-menu` (legacy)
- Use `onClick` instead of Radix's `onSelect`
- `MenuItem` supports `variant="destructive"` and `inset` props
- `MenuCheckboxItem` supports `variant="switch"` for toggle-style items

### Toast

```tsx
// In layout — wrap app with ToastProvider
<ToastProvider>
  <main>{children}</main>
</ToastProvider>

// To trigger a toast
const id = toastManager.add({
  title: "Saved",
  description: "Your changes have been saved.",
  type: "success",
  actionProps: {
    children: "Undo",
    onClick: () => toastManager.close(id),
  },
})
```

- Use `ToastProvider` wrapper instead of a `<Toaster />` component
- Toast types: `"error"` | `"info"` | `"loading"` | `"success"` | `"warning"`
- Position via `<ToastProvider position="bottom-right">`

---

## Sizing System

Coss UI components are more compact than shadcn/ui defaults. This is intentional for dense, production UIs.

### Size Mapping (shadcn -> Coss UI equivalent height)

| shadcn/ui Size | shadcn Height | Coss UI Equivalent | Coss Height |
|---|---|---|---|
| `sm` | 32px | `default` | 32px |
| `default` | 36px | `lg` | 36px |

This applies to: `Button`, `Input`, `Select`, `Textarea`, `Toggle`, `ToggleGroup`.

If you want the original shadcn/ui sizing, use one size up in Coss UI.

### Additional Sizes

Coss UI adds `xs` and `xl` sizes that shadcn doesn't have, plus icon-specific sizes (`icon-xs`, `icon-sm`, `icon-lg`, `icon-xl`) for buttons.

---

## Design Token System

### Color Variables

Coss UI extends the standard shadcn/ui CSS variables with semantic color tokens:

| Token | Purpose |
|---|---|
| `--warning` / `--warning-foreground` | Warning states (amber) |
| `--success` / `--success-foreground` | Success states (emerald) |
| `--info` / `--info-foreground` | Informational states (blue) |
| `--destructive` / `--destructive-foreground` | Error/destructive states (red) |

These are used consistently across `Alert`, `Badge`, `Toast`, and `Field` components.

### Font Variables

| Variable | Usage |
|---|---|
| `--font-sans` | Body text, general UI |
| `--font-heading` | Dialog/Sheet/AlertDialog titles, Empty state titles |
| `--font-mono` | Code blocks, technical content |

Define these via `next/font` in your layout and apply to `<body>`.

### Border System

Coss UI uses opaque borders (`--alpha(var(--color-black) / 8%)`) instead of solid colors. These mix with bottom shadows to create enhanced contrast and visual depth. This is critical for the intended design quality — using conventional solid border colors will look inconsistent.

---

## Stacking Context & Portals

### Root Isolation (Required)

Base UI portals (Dialog, Popover, Select, Tooltip, etc.) require proper stacking context isolation:

```tsx
<body className="relative">
  <div className="isolate relative flex min-h-svh flex-col">
    {children}
  </div>
</body>
```

- `isolation: isolate` on the root wrapper creates a separate stacking context
- `position: relative` on body ensures iOS Safari 26+ compatibility
- Without this, portaled components may render behind page content

---

## Form Patterns

### Field Composition

```tsx
<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="name@example.com" />
  <FieldDescription>We'll never share your email.</FieldDescription>
  <FieldError />
</Field>
```

- Wrap each form control in a `Field` for automatic label association and validation
- Use `Fieldset` + `FieldsetLegend` to group related fields
- Use `Form` component for validation and submission handling

### Input Group

```tsx
<InputGroup>
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>
```

- Use `Button` directly inside `InputGroupAddon` (no `InputGroupButton` component)
- Disable inputs directly on `InputGroupInput` / `InputGroupTextarea`, not on the group

---

## Frame Component

The `Frame` component is unique to Coss UI — a container with a muted background and rounded panels:

```tsx
<Frame>
  <FrameHeader>
    <FrameTitle>Section header</FrameTitle>
    <FrameDescription>Description</FrameDescription>
  </FrameHeader>
  <FramePanel>
    <h3 className="font-semibold text-sm">Panel title</h3>
    <p className="text-muted-foreground text-sm">Panel content</p>
  </FramePanel>
  <FramePanel>
    {/* Multiple panels stack with spacing */}
  </FramePanel>
</Frame>
```

Use Frame for settings sections, grouped content panels, or any area that needs visual containment with a subtle background.

---

## Group (Button Group)

```tsx
<Group>
  <Button variant="outline">Left</Button>
  <GroupSeparator />
  <Button variant="outline">Center</Button>
  <GroupSeparator />
  <Button variant="outline">Right</Button>
</Group>
```

- `GroupSeparator` is **always required** between controls (unlike shadcn where it's optional)
- This ensures consistent focus state handling and accessibility
- Supports `orientation="horizontal"` (default) and `"vertical"`

---

## Primitive Re-exports

Every styled component re-exports its underlying Base UI primitive:

```tsx
import { Slider, SliderValue, SliderPrimitive } from "@/components/ui/slider"
```

- Use the styled component when defaults work
- Use the primitive (`*Primitive`) when you need different compositions or custom styling
- In monorepos, this avoids adding `@base-ui/react` as a direct dependency in each app

### Base UI Utilities

Import shared utilities from `@coss/ui/base-ui/*` instead of `@base-ui/react` directly:

- `useRender` — for custom component rendering
- `mergeProps` — for combining props safely
- `DirectionProvider` — for RTL support
- `CSPProvider` — for Content Security Policy nonces

---

## Common Patterns

### Icon Placement in Buttons

```tsx
<Button>
  <PlusIcon data-icon="inline-start" />
  Add item
</Button>
```

Use `data-icon="inline-start"` on icons inside buttons for proper spacing.

### Destructive Actions

Use two-tier destructive patterns for better UX:
- `destructive-outline` — for secondary/trigger actions (less alarming)
- `destructive` — for the primary destructive confirmation action

```tsx
<Button variant="destructive-outline">Delete</Button>  {/* Trigger */}
<Button variant="destructive">Confirm Delete</Button>   {/* Confirmation */}
```

### Loading States

```tsx
<Skeleton className="h-4 w-3/4" />
<Skeleton className="size-12 rounded-full" />
```

Use `Skeleton` for content loading placeholders. Pair with actual component dimensions for realistic loading states.

### Empty States

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <SearchIcon className="size-6" />
    </EmptyMedia>
    <EmptyTitle>No results found</EmptyTitle>
    <EmptyDescription>Try adjusting your search.</EmptyDescription>
  </EmptyHeader>
</Empty>
```

---

## LLM Integration

Coss UI is designed to be AI-friendly:

- [llms.txt](https://coss.com/ui/llms.txt) provides a machine-readable map of all documentation
- Every doc page has a "Copy Markdown" button for feeding to AI workflows
- Component code is structured for clarity, readability, and predictability
- The [Radix/shadcn migration guide](https://coss.com/ui/docs/radix-shadcn-migration) is structured to be directly consumable by LLMs

When providing context to AI assistants, include the migration guide and relevant component docs for accurate code generation.

---

## References

- [Coss UI Documentation](https://coss.com/ui/docs)
- [Coss UI Particles Browser](https://coss.com/ui/particles)
- [Base UI Documentation](https://base-ui.com/)
- [Coss UI Get Started](https://coss.com/ui/docs/get-started)
- [Coss UI Styling Guide](https://coss.com/ui/docs/styling)
- [Radix/shadcn Migration Guide](https://coss.com/ui/docs/radix-shadcn-migration)
- [Coss UI LLMs.txt](https://coss.com/ui/llms.txt)
