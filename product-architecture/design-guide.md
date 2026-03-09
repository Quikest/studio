# Design Guide: Assembling Interfaces with Coss UI

How to compose Coss UI particles into pages and features. This guide covers layout, hierarchy, and assembly patterns. For individual component APIs and the `render` prop, see [coss-ui-best-practices.md](./coss-ui-best-practices.md).

---

## Page Layout Foundations

### Root Structure

Every page requires the stacking context isolation defined in `coss-ui-best-practices.md`. Build page content inside that wrapper.

### Page Shell

Use a max-width container with responsive horizontal padding. The standard page shell:

```tsx
<div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
  {/* Page header */}
  {/* Page sections */}
</div>
```

Adjust `max-w-*` to the content type:

| Container | Use Case |
|---|---|
| `max-w-md` (448px) | Single-column forms, auth pages |
| `max-w-lg` (512px) | Focused content, settings panels |
| `max-w-2xl` (672px) | Article-style content, detail views |
| `max-w-4xl` (896px) | Dashboard content, data tables |
| `max-w-5xl` (1024px) | Standard pages, documentation |
| `max-w-7xl` (1280px) | Wide layouts, multi-column dashboards |

### Page Header

Every page starts with a header block — title, optional description, and optional actions:

```tsx
<div className="mb-12">
  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
    Page Title
  </h1>
  <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
    A brief description of what this page does.
  </p>
</div>
```

When a page header includes actions, align them to the right:

```tsx
<div className="mb-12 flex items-start justify-between gap-4">
  <div>
    <h1 className="text-4xl font-bold tracking-tight">Page Title</h1>
    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Description.</p>
  </div>
  <Button>
    <PlusIcon data-icon="inline-start" />
    Create New
  </Button>
</div>
```

### Vertical Rhythm

Stack page sections with consistent spacing. Use `space-y-*` on the section container:

| Spacing | Tailwind | Use |
|---|---|---|
| 40px | `space-y-10` | Between major page sections (Frame blocks, Card groups) |
| 32px | `space-y-8` | Between subsections within a Frame or Card |
| 24px | `space-y-6` | Between content groups within a section |
| 16px | `space-y-4` | Between form fields or list items |

```tsx
<div className="space-y-10">
  <Frame>{/* Section 1 */}</Frame>
  <Frame>{/* Section 2 */}</Frame>
  <Frame>{/* Section 3 */}</Frame>
</div>
```

---

## Visual Hierarchy

### Typography Scale

Apply the type scale consistently to establish clear information hierarchy:

| Element | Classes | Example |
|---|---|---|
| Page title | `text-4xl font-bold tracking-tight sm:text-5xl` | Top-level heading |
| Page description | `text-lg text-muted-foreground` | Subtitle under page title |
| Section title | `FrameTitle` or `text-lg font-semibold` | Frame/Card headers |
| Section description | `FrameDescription` or `text-sm text-muted-foreground` | Frame/Card descriptions |
| Panel heading | `text-sm font-semibold` | Heading within a FramePanel |
| Body text | `text-sm` | Standard content |
| Label / metadata | `text-xs font-semibold uppercase tracking-wider text-muted-foreground` | Category labels, group headers |
| Caption / help text | `text-xs text-muted-foreground` | Field descriptions, timestamps |
| Code / technical | `text-sm font-mono` | Variable names, token references |

### Font Families

| Font | Variable | When to Use |
|---|---|---|
| Geist Sans | `--font-sans` | All body text, labels, descriptions, and general UI |
| Heading font | `--font-heading` | Dialog titles, Sheet titles, AlertDialog titles, Empty state titles |
| Geist Mono | `--font-mono` | Code blocks, keyboard shortcuts, technical identifiers, token names |

The heading font is applied automatically by the `DialogTitle`, `SheetTitle`, `AlertDialogTitle`, and `EmptyTitle` components. Use it manually only when building custom title elements outside those components.

### Weight Hierarchy

Use font weight to reinforce visual importance:

| Weight | Class | Use |
|---|---|---|
| Bold (700) | `font-bold` | Page titles only |
| Semibold (600) | `font-semibold` | Section headings, card titles, panel headings, labels |
| Medium (500) | `font-medium` | Token names, interactive element labels |
| Normal (400) | `font-normal` | Body text, descriptions, help text |

---

## Color Application

### Background Layering

Create visual depth by layering background colors. Each layer steps down in visual prominence:

```
Page background (--background)
  └── Card / Popover (--card / --popover)
       └── Frame muted background (--muted)
            └── FramePanel white surface (--card)
```

This is the foundation of the design system's depth model. The `Frame` component handles the muted-to-card transition automatically — its container uses `--muted` and its `FramePanel` children use `--card`.

### Semantic Colors

Use semantic tokens for meaning, not decoration:

| Token | When to Use | Components That Apply It |
|---|---|---|
| `destructive` | Errors, delete actions, critical alerts | Alert, Badge, Toast, Button, MenuItem |
| `info` | Informational notices, neutral status | Alert, Badge, Toast |
| `success` | Completion confirmations, positive status | Alert, Badge, Toast |
| `warning` | Caution notices, approaching limits | Alert, Badge, Toast |

Never use semantic colors for branding or visual variety. They carry meaning.

### Brand Colors

| Token | Purpose |
|---|---|
| `primary` / `primary-foreground` | Primary actions (CTAs, submit buttons), key interactive elements |
| `secondary` / `secondary-foreground` | Secondary actions, less prominent interactive elements |
| `accent` / `accent-foreground` | Hover states, subtle highlights |
| `muted` / `muted-foreground` | Subdued backgrounds, secondary text, descriptions, placeholders |

### Borders

Coss UI uses alpha-based borders (`--alpha(var(--color-black) / 8%)`) rather than solid colors. These blend with shadows to create depth. Do not override borders with solid colors — the alpha approach is intentional and consistent across light and dark themes.

---

## Spacing and Density

### Spacing Scale

Coss UI favors compact, dense interfaces. Use the Tailwind spacing scale consistently:

| Gap | Value | Use Case |
|---|---|---|
| `gap-1` | 4px | Icon-to-text spacing inside buttons (handled by `data-icon`) |
| `gap-2` | 8px | Tight groups: buttons in a row, badge clusters, inline actions |
| `gap-3` | 12px | Color swatches, token grids, compact lists |
| `gap-4` | 16px | Form fields, card content items, list entries |
| `gap-6` | 24px | Card body sections, frame panel content |
| `gap-8` | 32px | Between subsections within a frame or panel |

### Compact by Default

Coss UI components are one size smaller than shadcn/ui defaults. When assembling interfaces, this means:

- Default-size buttons, inputs, and selects are 32px tall (not 36px)
- Use `size="lg"` when you need the conventional 36px height
- Use `size="xs"` for toolbars, table actions, and inline controls
- Icon buttons use `size="icon"` (or `icon-xs`, `icon-sm`, `icon-lg`, `icon-xl`)

### Padding Conventions

| Context | Padding | Example |
|---|---|---|
| Page container | `px-4 py-16 sm:px-6 lg:px-8` | Page shell |
| Card content | Handled by `CardContent` | Automatic |
| Frame panels | Handled by `FramePanel` | Automatic |
| Custom sections | `p-4` or `p-6` | Manual containers |
| Inline groups | `px-2 py-1` or `px-3 py-1.5` | Custom badges, tags |

---

## Section and Content Composition

### Choosing a Container

| Component | Use When | Visual Treatment |
|---|---|---|
| **Frame** | Grouping related content or settings into a section | Muted background with white panels. Best for settings pages, content groups, and any area needing visual containment. |
| **Card** | Displaying a standalone content block with metadata and actions | White surface with border, optional header/footer. Best for previews, summaries, and interactive content items. |
| **Separator** | Dividing content within a flat layout (no container needed) | Horizontal or vertical line. Use between logically distinct groups in a list or toolbar. |
| **Tabs** | Offering multiple views of related content in the same space | Tab bar with panels. Best for switching between related data views without navigation. |

### Frame-Based Sections

Frame is the primary section container. Use it for settings pages, grouped content, and configuration panels:

```tsx
<div className="space-y-10">
  <Frame>
    <FrameHeader>
      <FrameTitle>General</FrameTitle>
      <FrameDescription>Basic account settings.</FrameDescription>
    </FrameHeader>
    <FramePanel>
      <Field>
        <FieldLabel>Display Name</FieldLabel>
        <Input placeholder="Your name" />
      </Field>
    </FramePanel>
    <FramePanel>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
      </Field>
    </FramePanel>
  </Frame>

  <Frame>
    <FrameHeader>
      <FrameTitle>Danger Zone</FrameTitle>
      <FrameDescription>Irreversible account actions.</FrameDescription>
    </FrameHeader>
    <FramePanel>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Delete Account</h3>
          <p className="text-sm text-muted-foreground">
            Permanently remove your account and all data.
          </p>
        </div>
        <Button variant="destructive-outline" size="sm">Delete</Button>
      </div>
    </FramePanel>
  </Frame>
</div>
```

### Card-Based Content

Use Card for standalone content items — previews, summaries, list entries with actions:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Project Alpha</CardTitle>
    <CardDescription>Last updated 2 hours ago</CardDescription>
    <CardAction>
      <Menu>
        <MenuTrigger render={<Button variant="ghost" size="icon" />}>
          <MoreVerticalIcon />
          <span className="sr-only">More options</span>
        </MenuTrigger>
        <MenuPopup>{/* Menu items */}</MenuPopup>
      </Menu>
    </CardAction>
  </CardHeader>
  <CardContent>{/* Card body */}</CardContent>
  <CardFooter>
    <Button>Open</Button>
    <Badge variant="secondary" className="ml-auto">Active</Badge>
  </CardFooter>
</Card>
```

### Tabbed Sections

Use Tabs when a single area needs to show different views of related content:

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="analytics">Analytics</TabsTab>
    <TabsTab value="settings">Settings</TabsTab>
  </TabsList>
  <TabsPanel value="overview">{/* Overview content */}</TabsPanel>
  <TabsPanel value="analytics">{/* Analytics content */}</TabsPanel>
  <TabsPanel value="settings">{/* Settings content */}</TabsPanel>
</Tabs>
```

---

## Form Layout Patterns

### Field Wrapping

Every form control must be wrapped in a `Field`. This handles label association, description, and validation state automatically:

```tsx
<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="name@example.com" />
  <FieldDescription>We'll never share your email.</FieldDescription>
  <FieldError />
</Field>
```

### Form Grids

Place related fields side-by-side with grid layouts. Collapse to single column on mobile:

```tsx
<div className="flex flex-col gap-4">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <Field>
      <FieldLabel>First Name</FieldLabel>
      <Input placeholder="Jane" />
    </Field>
    <Field>
      <FieldLabel>Last Name</FieldLabel>
      <Input placeholder="Doe" />
    </Field>
  </div>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="jane@example.com" />
  </Field>
  <Field>
    <FieldLabel>Bio</FieldLabel>
    <Textarea placeholder="Tell us about yourself" />
  </Field>
</div>
```

### Grouping Related Fields

Use `Fieldset` and `FieldsetLegend` to semantically group related fields:

```tsx
<Fieldset>
  <FieldsetLegend>Notification Preferences</FieldsetLegend>
  <div className="space-y-4">
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel>Email notifications</FieldLabel>
        <Switch />
      </div>
    </Field>
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel>Push notifications</FieldLabel>
        <Switch />
      </div>
    </Field>
  </div>
</Fieldset>
```

### Form Actions

Place form actions at the bottom. Primary action comes first, secondary action second:

```tsx
<div className="flex gap-2">
  <Button type="submit">Save Changes</Button>
  <Button variant="outline" type="button">Cancel</Button>
</div>
```

For forms inside a Card, use `CardFooter`:

```tsx
<CardFooter>
  <Button type="submit">Save</Button>
  <Button variant="ghost" type="button">Cancel</Button>
</CardFooter>
```

For forms inside a Dialog, use `DialogFooter`:

```tsx
<DialogFooter>
  <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
  <Button type="submit">Confirm</Button>
</DialogFooter>
```

### Compound Inputs

Use `InputGroup` to combine inputs with addons (text prefixes, suffixes, or action buttons):

```tsx
<InputGroup>
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
  <InputGroupAddon>
    <Button variant="outline" size="sm">Verify</Button>
  </InputGroupAddon>
</InputGroup>
```

---

## Feedback and Status Communication

### Inline Feedback: Alert

Use `Alert` for persistent, contextual messages that relate to nearby content:

```tsx
<Alert variant="info">
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>
    You can now export data in CSV format.
  </AlertDescription>
</Alert>
```

| Variant | When to Use |
|---|---|
| Default | General information, neutral notices |
| `error` | Validation failures, API errors, blocked actions |
| `success` | Completed operations, successful saves |
| `warning` | Approaching limits, deprecation notices, partial failures |

### Transient Feedback: Toast

Use Toast for ephemeral confirmations of user actions — things that don't need to persist:

```tsx
toastManager.add({
  title: "Changes saved",
  description: "Your settings have been updated.",
  type: "success",
})
```

**Alert vs Toast decision**: If the user needs to read it and potentially act on it, use Alert. If it's a brief confirmation that can disappear, use Toast.

### Status Indicators: Badge

Use Badge to label status, categories, or counts on other elements:

```tsx
<Badge variant="secondary">Draft</Badge>
<Badge variant="outline">v2.1.0</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Expiring</Badge>
<Badge variant="destructive">Failed</Badge>
```

Badges work well inside CardHeader, table cells, and list items for at-a-glance status.

### Empty States

Every list, table, or content area must handle the zero-data case. Use the `Empty` component:

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <InboxIcon className="size-6" />
    </EmptyMedia>
    <EmptyTitle>No messages yet</EmptyTitle>
    <EmptyDescription>
      Messages from your team will appear here.
    </EmptyDescription>
  </EmptyHeader>
  <Button variant="outline">
    <PlusIcon data-icon="inline-start" />
    Compose Message
  </Button>
</Empty>
```

Include an action when the user can resolve the empty state themselves (e.g., "Create first item").

### Loading States

Use `Skeleton` to show content placeholders that match the dimensions of the real content:

```tsx
{/* Loading state for a card */}
<Card>
  <CardHeader>
    <Skeleton className="h-5 w-2/3" />
    <Skeleton className="h-4 w-1/2" />
  </CardHeader>
  <CardContent>
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  </CardContent>
</Card>
```

Match skeleton dimensions to the actual content they replace for a smooth transition.

### Quantitative Feedback

Use `Progress` for determinate operations (file uploads, multi-step workflows) and `Meter` for measured values (storage used, quota remaining):

```tsx
<Progress value={65} />
<Meter value={80} max={100} />
```

---

## Overlay and Modal Patterns

### Choosing the Right Overlay

| Component | Purpose | Trigger | Dismissal |
|---|---|---|---|
| **Dialog** | Focused task that requires user input (forms, multi-step flows) | Button click | Close button, backdrop click, Escape |
| **AlertDialog** | Confirmation before a significant or destructive action | Button click | Explicit confirm/cancel only (no backdrop dismiss) |
| **Sheet** | Supplementary panel for detail views, filters, or secondary content | Button click | Close button, backdrop click, Escape |
| **Popover** | Contextual information or small controls anchored to a trigger | Button click | Click outside, Escape |
| **Tooltip** | Brief explanatory text on hover/focus | Hover / focus | Mouse leave, blur |
| **Menu** | List of actions or options | Button click | Selection, click outside, Escape |

### Modal Structure

All modal overlays (Dialog, AlertDialog, Sheet) follow the same internal structure:

```
Popup
  ├── Header (title + description)
  ├── Panel (scrollable content)
  └── Footer (actions)
```

This structure keeps headers and footers fixed while allowing the content area to scroll. Always use this pattern for modals with more than a short message.

### Dialog for Data Entry

Use Dialog when the user needs to input or edit data without leaving their current context:

```tsx
<Dialog>
  <DialogTrigger render={<Button />}>Add Member</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Add Team Member</DialogTitle>
      <DialogDescription>Invite someone to your workspace.</DialogDescription>
    </DialogHeader>
    <DialogPanel>
      <div className="space-y-4">
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="colleague@company.com" />
        </Field>
        <Field>
          <FieldLabel>Role</FieldLabel>
          <Select items={roleItems} defaultValue={null}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectPopup>
              <SelectGroup>
                {roleItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectPopup>
          </Select>
        </Field>
      </div>
    </DialogPanel>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
      <Button>Send Invite</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

### AlertDialog for Destructive Confirmation

Always gate irreversible actions behind an AlertDialog:

```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive-outline" />}>
    Delete Project
  </AlertDialogTrigger>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete "Project Alpha"?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete the project and all associated data.
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose render={<Button variant="ghost" />}>
        Cancel
      </AlertDialogClose>
      <AlertDialogClose render={<Button variant="destructive" />}>
        Delete Project
      </AlertDialogClose>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
```

Notice the two-tier destructive pattern: the trigger uses `destructive-outline` (less alarming), the confirmation uses `destructive` (full emphasis).

### Sheet for Supplementary Content

Use Sheet for side panels that show details, filters, or secondary workflows:

```tsx
<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>
    View Details
  </SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Order Details</SheetTitle>
      <SheetDescription>Order #12345</SheetDescription>
    </SheetHeader>
    <SheetPanel>{/* Scrollable detail content */}</SheetPanel>
    <SheetFooter>
      <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
    </SheetFooter>
  </SheetPopup>
</Sheet>
```

---

## Navigation and Wayfinding

### Breadcrumbs

Use Breadcrumb at the top of nested pages to show location within a hierarchy:

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard/projects">Projects</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Project Alpha</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

Place breadcrumbs above the page header, below any persistent navigation.

### In-Page Navigation with Tabs

Use Tabs to switch between related views without a full page navigation:

```tsx
<Tabs defaultValue="members">
  <TabsList>
    <TabsTab value="members">Members</TabsTab>
    <TabsTab value="permissions">Permissions</TabsTab>
    <TabsTab value="billing">Billing</TabsTab>
  </TabsList>
  <TabsPanel value="members">{/* Members list */}</TabsPanel>
  <TabsPanel value="permissions">{/* Permissions settings */}</TabsPanel>
  <TabsPanel value="billing">{/* Billing info */}</TabsPanel>
</Tabs>
```

### Contextual Actions with Menu

Place a Menu inside `CardAction` for per-item actions in card layouts:

```tsx
<CardAction>
  <Menu>
    <MenuTrigger render={<Button variant="ghost" size="icon" />}>
      <MoreVerticalIcon />
      <span className="sr-only">Options</span>
    </MenuTrigger>
    <MenuPopup align="end">
      <MenuGroup>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuItem variant="destructive">Delete</MenuItem>
    </MenuPopup>
  </Menu>
</CardAction>
```

Always place destructive menu items after a `MenuSeparator` at the bottom of the menu.

### Pagination

Use Pagination for large lists or tables that span multiple pages:

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

---

## Responsive and Adaptive Patterns

### Mobile-First Approach

Build layouts mobile-first, then add complexity at larger breakpoints:

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <Card>{/* Item */}</Card>
  <Card>{/* Item */}</Card>
  <Card>{/* Item */}</Card>
</div>
```

### Common Responsive Patterns

| Pattern | Implementation |
|---|---|
| Single to multi-column grids | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| Stack to inline actions | `flex flex-col gap-2 sm:flex-row` |
| Responsive page title | `text-4xl sm:text-5xl` |
| Responsive padding | `px-4 sm:px-6 lg:px-8` |
| Hide on mobile | `hidden sm:block` |
| Show only on mobile | `sm:hidden` |

### Mobile Modal Behavior

Dialogs and AlertDialogs use `bottomStickOnMobile` (enabled by default) to anchor to the bottom of the viewport on mobile. This gives them a sheet-like feel on small screens. Do not disable this unless you have a specific reason.

### Responsive Form Grids

Collapse multi-column form layouts to single column on mobile:

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <Field>
    <FieldLabel>First Name</FieldLabel>
    <Input />
  </Field>
  <Field>
    <FieldLabel>Last Name</FieldLabel>
    <Input />
  </Field>
</div>
```

Full-width fields (email, textarea, etc.) should always span the full grid:

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <Field>
    <FieldLabel>First Name</FieldLabel>
    <Input />
  </Field>
  <Field>
    <FieldLabel>Last Name</FieldLabel>
    <Input />
  </Field>
  <Field className="sm:col-span-2">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" />
  </Field>
</div>
```

---

## Destructive Action Safety

### Two-Tier Pattern

Destructive actions use two visual tiers to reduce accidental triggers:

1. **Trigger** — `variant="destructive-outline"`: lower visual weight, signals danger without alarming
2. **Confirmation** — `variant="destructive"`: full visual weight inside AlertDialog

```tsx
{/* Step 1: Trigger in the UI */}
<Button variant="destructive-outline">Delete Account</Button>

{/* Step 2: Confirmation in AlertDialog */}
<AlertDialogFooter>
  <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>
  <AlertDialogClose render={<Button variant="destructive" />}>
    Delete Account
  </AlertDialogClose>
</AlertDialogFooter>
```

### Placement Rules

- In menus: place destructive items last, after a `MenuSeparator`
- In cards/panels: place destructive actions away from primary actions (e.g., in a separate "Danger Zone" Frame)
- In forms: never place destructive buttons adjacent to submit buttons without clear visual differentiation

### Always Require Confirmation

Never execute destructive actions on a single click. Always use AlertDialog for:

- Deleting resources (accounts, projects, data)
- Revoking access or permissions
- Any action labeled as "cannot be undone"

---

## Accessibility Checklist

### Icon-Only Buttons

Every icon-only button must include a screen reader label:

```tsx
<Button variant="ghost" size="icon">
  <SettingsIcon />
  <span className="sr-only">Settings</span>
</Button>
```

### Icon + Label Buttons

Use `data-icon="inline-start"` on icons inside buttons for consistent spacing:

```tsx
<Button>
  <PlusIcon data-icon="inline-start" />
  Add Item
</Button>
```

### Form Controls

- Always wrap form controls in `Field` — it auto-associates labels, descriptions, and error messages via `aria-*` attributes
- Always provide a `FieldLabel` for every input (use `sr-only` on the label if you need a visually hidden label)
- Use `FieldDescription` for help text and `FieldError` for validation messages

### Keyboard Navigation

- All interactive components from Coss UI handle keyboard navigation through Base UI primitives
- `Group` requires `GroupSeparator` between items for proper focus management
- Modal overlays trap focus automatically and return focus on close
- `Menu` and `Select` support type-ahead search

### Color Contrast

- Never rely on color alone to communicate meaning — always pair with text labels or icons
- Semantic colors (`destructive`, `info`, `success`, `warning`) are pre-tuned for WCAG contrast in both light and dark themes
- `text-muted-foreground` maintains readable contrast against `background` in both themes

---

## Page Assembly Recipes

### Settings Page

```tsx
<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mb-12">
    <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
    <p className="mt-4 text-lg text-muted-foreground">
      Manage your account preferences.
    </p>
  </div>

  <div className="space-y-10">
    <Frame>
      <FrameHeader>
        <FrameTitle>Profile</FrameTitle>
        <FrameDescription>Your public identity.</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel>First Name</FieldLabel>
              <Input />
            </Field>
            <Field>
              <FieldLabel>Last Name</FieldLabel>
              <Input />
            </Field>
          </div>
          <Field>
            <FieldLabel>Bio</FieldLabel>
            <Textarea />
          </Field>
        </div>
      </FramePanel>
    </Frame>

    <Frame>
      <FrameHeader>
        <FrameTitle>Notifications</FrameTitle>
        <FrameDescription>Choose what you hear about.</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Email Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Receive updates via email.
            </p>
          </div>
          <Switch />
        </div>
      </FramePanel>
      <FramePanel>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Push Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Receive push notifications in your browser.
            </p>
          </div>
          <Switch />
        </div>
      </FramePanel>
    </Frame>

    <Frame>
      <FrameHeader>
        <FrameTitle>Danger Zone</FrameTitle>
        <FrameDescription>Irreversible actions.</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive-outline" size="sm" />}>
              Delete
            </AlertDialogTrigger>
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose render={<Button variant="ghost" />}>Cancel</AlertDialogClose>
                <AlertDialogClose render={<Button variant="destructive" />}>Delete</AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog>
        </div>
      </FramePanel>
    </Frame>
  </div>
</div>
```

### Data List Page

```tsx
<div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mb-12 flex items-start justify-between gap-4">
    <div>
      <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        All your team's projects.
      </p>
    </div>
    <Button>
      <PlusIcon data-icon="inline-start" />
      New Project
    </Button>
  </div>

  {/* Empty state (when no data) */}
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderIcon className="size-6" />
      </EmptyMedia>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>Create your first project to get started.</EmptyDescription>
    </EmptyHeader>
    <Button>
      <PlusIcon data-icon="inline-start" />
      Create Project
    </Button>
  </Empty>

  {/* Populated state */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Updated 2 hours ago</CardDescription>
        <CardAction>
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="icon" />}>
              <MoreVerticalIcon />
              <span className="sr-only">Options</span>
            </MenuTrigger>
            <MenuPopup align="end">
              <MenuItem>Edit</MenuItem>
              <MenuItem>Duplicate</MenuItem>
              <MenuSeparator />
              <MenuItem variant="destructive">Delete</MenuItem>
            </MenuPopup>
          </Menu>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Badge variant="success">Active</Badge>
      </CardFooter>
    </Card>
  </div>

  <div className="mt-8">
    <Pagination>{/* Pagination controls */}</Pagination>
  </div>
</div>
```
