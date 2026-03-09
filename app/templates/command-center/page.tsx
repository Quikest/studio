"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  BellIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  FileTextIcon,
  FolderPlusIcon,
  GlobeIcon,
  KeyboardIcon,
  ListTodoIcon,
  LogOutIcon,
  MessageSquareIcon,
  MicIcon,
  PaletteIcon,
  PlusIcon,
  SettingsIcon,
  ShuffleIcon,
  StarIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FramePanel,
} from "@/components/ui/frame"
import {
  Menu,
  MenuTrigger,
  MenuPopup,
  MenuItem,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
} from "@/components/ui/menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

type NavItem = {
  id: string
  icon: React.ElementType
  label: string
  items: { label: string; icon: React.ElementType }[]
}

const navItems: NavItem[] = [
  {
    id: "new",
    icon: PlusIcon,
    label: "New",
    items: [
      { label: "Project", icon: FolderPlusIcon },
      { label: "Document", icon: FileTextIcon },
      { label: "Task", icon: ListTodoIcon },
    ],
  },
  {
    id: "messages",
    icon: MessageSquareIcon,
    label: "Messages",
    items: [
      { label: "Inbox", icon: MessageSquareIcon },
      { label: "Starred", icon: StarIcon },
      { label: "Notifications", icon: BellIcon },
    ],
  },
  {
    id: "tasks",
    icon: CheckIcon,
    label: "Tasks",
    items: [
      { label: "My tasks", icon: CheckIcon },
      { label: "Assigned to me", icon: UserIcon },
      { label: "Completed", icon: CheckIcon },
    ],
  },
  {
    id: "documents",
    icon: FileTextIcon,
    label: "Documents",
    items: [
      { label: "All documents", icon: FileTextIcon },
      { label: "Recent", icon: FileTextIcon },
      { label: "Shared with me", icon: UserIcon },
    ],
  },
  {
    id: "actions",
    icon: ZapIcon,
    label: "Actions",
    items: [
      { label: "Run action", icon: ZapIcon },
      { label: "Automations", icon: ZapIcon },
      { label: "History", icon: ListTodoIcon },
    ],
  },
  {
    id: "settings",
    icon: SettingsIcon,
    label: "Settings",
    items: [
      { label: "General", icon: SettingsIcon },
      { label: "Appearance", icon: PaletteIcon },
      { label: "Keyboard shortcuts", icon: KeyboardIcon },
    ],
  },
  {
    id: "library",
    icon: BookOpenIcon,
    label: "Library",
    items: [
      { label: "Templates", icon: BookOpenIcon },
      { label: "Snippets", icon: FileTextIcon },
      { label: "Integrations", icon: ZapIcon },
    ],
  },
]

const THREAD_ENTRIES = [
  { title: "Interactive policy impact map", time: "2m ago" },
  { title: "Market trends report Q4", time: "1h ago" },
  { title: "Exercise tracker app design", time: "3h ago" },
  { title: "Database migration plan", time: "Yesterday" },
  { title: "API documentation draft", time: "2 days ago" },
]

const suggestions = [
  {
    icon: GlobeIcon,
    text: "Create an interactive map of the United States showing the geographic density of the impact of policy changes.",
  },
  {
    icon: FileTextIcon,
    text: "Generate a report on current market trends using real-time data sources, optimized for web and mobile.",
  },
  {
    icon: ZapIcon,
    text: "Build a mobile web app with exercise guides, logging, and downloadable reports.",
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

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

function ThreadList() {
  return (
    <div className="flex flex-col">
      <div className="px-3 py-2">
        <Button variant="outline" size="sm" className="w-full justify-start">
          <PlusIcon data-icon="inline-start" />
          New thread
        </Button>
      </div>
      <div className="flex flex-col">
        {THREAD_ENTRIES.map((thread) => (
          <button
            key={thread.title}
            className="flex flex-col gap-0.5 px-3 py-2 text-left hover:bg-accent/50"
          >
            <span className="truncate text-xs font-medium">
              {thread.title}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {thread.time}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SectionMenuItems({ items }: { items: NavItem["items"] }) {
  return (
    <div className="flex flex-col">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.label}
            className="flex items-center gap-2 px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          >
            <Icon className="size-3.5 shrink-0" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CommandCenterPage() {
  const [activeSection, setActiveSection] = React.useState<string | null>("new")

  const activeNav = navItems.find((item) => item.id === activeSection)

  return (
    <div className="flex h-svh bg-muted/50">
      {/* Icon Rail */}
      <nav className="hidden w-12 flex-col items-center gap-1 border-r bg-background py-3 md:flex">
        <LogoMark className="size-5" />
        <div className="mx-auto my-2 h-px w-6 bg-border" />

        <div className="flex flex-col items-center gap-1">
          {navItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger
                render={
                  <Button
                    variant={
                      activeSection === item.id ? "secondary" : "ghost"
                    }
                    size="icon"
                    onClick={() =>
                      setActiveSection((prev) =>
                        prev === item.id ? null : item.id,
                      )
                    }
                  />
                }
              >
                <item.icon className="size-4" />
                <span className="sr-only">{item.label}</span>
              </TooltipTrigger>
              <TooltipPopup side="right">{item.label}</TooltipPopup>
            </Tooltip>
          ))}
        </div>

        <div className="mt-auto">
          <Menu>
            <MenuTrigger
              openOnHover
              delay={200}
              closeDelay={300}
              render={<Button variant="ghost" size="icon" />}
            >
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">AK</AvatarFallback>
              </Avatar>
              <span className="sr-only">Account</span>
            </MenuTrigger>
            <MenuPopup side="right" align="end" sideOffset={4}>
              <MenuGroup>
                <MenuGroupLabel>Account</MenuGroupLabel>
                <MenuItem>
                  <UserIcon /> Profile
                </MenuItem>
                <MenuItem>
                  <CreditCardIcon /> Billing
                </MenuItem>
                <MenuItem>
                  <SettingsIcon /> Preferences
                </MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuItem variant="destructive">
                <LogOutIcon /> Sign out
              </MenuItem>
            </MenuPopup>
          </Menu>
        </div>
      </nav>

      {/* Secondary Panel */}
      <div
        className={cn(
          "hidden flex-col border-r bg-muted/20 transition-[width] duration-200 ease-in-out md:flex",
          activeSection ? "w-60" : "w-0 overflow-hidden border-r-0",
        )}
      >
        {activeNav && (
          <>
            <div className="flex h-9 shrink-0 items-center justify-between px-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {activeNav.label}
              </span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setActiveSection(null)}
              >
                <ChevronLeftIcon className="size-3.5" />
                <span className="sr-only">Close panel</span>
              </Button>
            </div>
            <ScrollArea className="flex-1">
              {activeSection === "new" ? (
                <ThreadList />
              ) : (
                <SectionMenuItems items={activeNav.items} />
              )}
            </ScrollArea>
          </>
        )}
      </div>

      {/* Workspace */}
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-16">
        <div className="w-full max-w-2xl space-y-8">
          {/* Hero */}
          <div className="space-y-3 text-center">
            <div className="mx-auto flex size-10 items-center justify-center rounded-xl border bg-card">
              <ZapIcon className="size-5 text-muted-foreground" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              What will you build?
            </h1>
            <p className="mx-auto max-w-md text-lg text-muted-foreground">
              Describe a task and the workspace handles the rest.
            </p>
          </div>

          {/* Prompt Input */}
          <Frame>
            <FramePanel className="p-0">
              <div className="px-4 pb-1 pt-3">
                <p className="text-sm text-muted-foreground">
                  What should we work on next?
                </p>
              </div>
              <div className="flex items-center gap-1 px-2 pb-2">
                <Button variant="ghost" size="icon-xs">
                  <PlusIcon />
                  <span className="sr-only">Attach file</span>
                </Button>
                <div className="flex-1" />
                <Button variant="ghost" size="icon-xs">
                  <MicIcon />
                  <span className="sr-only">Voice input</span>
                </Button>
                <Button size="icon-xs" className="rounded-full">
                  <ArrowRightIcon />
                  <span className="sr-only">Submit</span>
                </Button>
              </div>
            </FramePanel>
          </Frame>

          {/* Suggestions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Example tasks</h2>
              <Button variant="ghost" size="xs">
                <ShuffleIcon data-icon="inline-start" />
                Shuffle
              </Button>
            </div>
            <div className="space-y-3">
              {suggestions.map((item, i) => {
                const Icon = item.icon
                return (
                  <button
                    key={i}
                    className="flex w-full items-start gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-accent/50"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Design Notes */}
          <div className="space-y-4 border-t pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Design Notes
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Frame>
                <FrameHeader>
                  <FrameTitle>Icon Rail + Secondary Panel</FrameTitle>
                  <FrameDescription>
                    Two-tier navigation without flyout menus
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "The icon rail (48px) provides first-level navigation via icon buttons with tooltips. Clicking an icon opens the full-height secondary panel (240px) to that section, replacing hover-based flyout menus with a persistent, scannable list.",
                      "Toggle-on-reclick: clicking the active icon collapses the panel. A ChevronLeft close button in the panel header provides an explicit alternative, following the directional-hint convention from other templates.",
                      "The default section (\u201cNew\u201d) renders an AI-chat thread list with a \u201cNew thread\u201d action at top, resembling conversation history. Other sections show categorized menu items.",
                      "Active state uses variant=\"secondary\" (tinted background) on the rail button, visually linking the icon to the open panel content.",
                      "Avatar with account Menu remains at the rail\u2019s bottom, using openOnHover for quick access to Profile, Billing, Preferences, and Sign out.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Centered Workspace</FrameTitle>
                  <FrameDescription>
                    Focus through constraint and whitespace
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Content is constrained to max-w-2xl with auto centering, creating generous negative space that draws the eye inward.",
                      "bg-muted/50 on the page container gives a subtle warm gray backdrop, while the rail uses bg-background to visually separate navigation from workspace.",
                      "The workspace scrolls independently (overflow-y-auto) while the icon rail and secondary panel stay fixed \u2014 persistent navigation context.",
                      "On mobile (below md), both the icon rail and secondary panel hide entirely, giving the workspace full viewport width.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Input-First Hierarchy</FrameTitle>
                  <FrameDescription>
                    The prompt as the primary action
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "The hero section establishes context (brand, headline, subtitle), then immediately yields to the input \u2014 the page\u2019s primary call to action.",
                      "The input uses Frame for consistent container styling, maintaining the muted \u2192 card background layering system.",
                      "Action icons (attach, mic, submit) are embedded inside the input container, reducing clutter and keeping related actions co-located.",
                      "The submit button uses a filled variant while attach and mic use ghost \u2014 establishing clear action priority through visual weight.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Suggestion Cards</FrameTitle>
                  <FrameDescription>
                    Discoverability for uncertain users
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Suggestions are vertically stacked (not a grid) to encourage natural top-to-bottom scanning.",
                      "Each card pairs a categorizing icon with descriptive text, providing both visual anchor and context.",
                      "Cards use bg-card with hover:bg-accent/50 \u2014 a subtle interactive affordance that doesn\u2019t compete with the primary input.",
                      "The Shuffle button offers content refresh without navigation, keeping users in the flow state.",
                    ]}
                  />
                </FramePanel>
              </Frame>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
