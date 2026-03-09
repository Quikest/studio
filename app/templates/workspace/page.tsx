"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CreditCardIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  GitBranchIcon,
  LogOutIcon,
  PanelBottomIcon,
  SearchIcon,
  SettingsIcon,
  TerminalIcon,
  TriangleAlertIcon,
  UserIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo"
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
// Types
// ---------------------------------------------------------------------------

type ActivitySection = "files" | "search" | "settings"
type MainTab = "layout" | "panels" | "notes"
type BottomTab = "output" | "problems"

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ACTIVITY_ITEMS: {
  id: ActivitySection
  icon: React.ElementType
  label: string
}[] = [
  { id: "files", icon: FileTextIcon, label: "Explorer" },
  { id: "search", icon: SearchIcon, label: "Search" },
  { id: "settings", icon: SettingsIcon, label: "Settings" },
]

const MAIN_TABS: { id: MainTab; label: string }[] = [
  { id: "layout", label: "Layout.tsx" },
  { id: "panels", label: "Panels.tsx" },
  { id: "notes", label: "README.md" },
]

const BOTTOM_TABS: { id: BottomTab; label: string; count?: number }[] = [
  { id: "output", label: "Output" },
  { id: "problems", label: "Problems", count: 3 },
]

const FILE_TREE: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Layout.tsx", type: "file" },
          { name: "Panels.tsx", type: "file" },
          { name: "Toolbar.tsx", type: "file" },
        ],
      },
      {
        name: "lib",
        type: "folder",
        children: [{ name: "utils.ts", type: "file" }],
      },
      { name: "app.tsx", type: "file" },
    ],
  },
  { name: "README.md", type: "file" },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
]

const OUTPUT_LINES = [
  { text: "$ next build", dim: false },
  { text: "  ▲ Next.js 16.1.6 (Turbopack)", dim: true },
  { text: "", dim: true },
  { text: "  Creating an optimized production build ...", dim: true },
  { text: "  ✓ Compiled successfully in 3.2s", dim: false },
  { text: "  Running TypeScript ...", dim: true },
  { text: "  ✓ Generating static pages (12/12) in 320ms", dim: false },
  { text: "", dim: true },
  { text: "  Route (app)", dim: true },
  { text: "  ├ ○ /", dim: true },
  { text: "  ├ ○ /doc/templates", dim: true },
  { text: "  └ ○ /templates/workspace", dim: false },
]

const PROBLEMS = [
  {
    type: "warning" as const,
    text: "'activeSection' is assigned but its value is never read",
    file: "Panels.tsx",
    line: 24,
  },
  {
    type: "warning" as const,
    text: "Unexpected any. Specify a different type",
    file: "utils.ts",
    line: 8,
  },
  {
    type: "error" as const,
    text: "Property 'onClick' does not exist on type 'IntrinsicAttributes'",
    file: "Toolbar.tsx",
    line: 42,
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

function FileTree({
  nodes,
  depth = 0,
}: {
  nodes: FileNode[]
  depth?: number
}) {
  const [openFolders, setOpenFolders] = React.useState<Set<string>>(
    () => new Set(["src", "components"]),
  )

  const toggle = (name: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <ul>
      {nodes.map((node) => {
        const isOpen = openFolders.has(node.name)
        const FolderIcn = isOpen ? FolderOpenIcon : FolderIcon
        return (
          <li key={node.name}>
            <button
              onClick={() => node.type === "folder" && toggle(node.name)}
              className={cn(
                "flex w-full items-center gap-1.5 py-1 text-left text-xs hover:bg-accent/50",
                node.type === "file" && "text-muted-foreground",
              )}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
              {node.type === "folder" ? (
                <>
                  <ChevronRightIcon
                    className={cn(
                      "size-3 shrink-0 transition-transform",
                      isOpen && "rotate-90",
                    )}
                  />
                  <FolderIcn className="size-3.5 shrink-0 text-muted-foreground" />
                </>
              ) : (
                <>
                  <span className="size-3 shrink-0" />
                  <FileIcon className="size-3.5 shrink-0" />
                </>
              )}
              <span className="truncate">{node.name}</span>
            </button>
            {node.type === "folder" && isOpen && node.children && (
              <FileTree nodes={node.children} depth={depth + 1} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// Tab Content
// ---------------------------------------------------------------------------

function LayoutTabContent() {
  return (
    <div className="space-y-6 p-6">
      <Frame>
        <FrameHeader>
          <FrameTitle>Compound Layout</FrameTitle>
          <FrameDescription>
            Combining horizontal and vertical splits
          </FrameDescription>
        </FrameHeader>
        <FramePanel>
          <DesignNotes
            notes={[
              "This template nests a vertical split (editor + bottom panel) inside a horizontal split (activity bar + explorer + main). No previous template combines both axes.",
              "The activity bar is a fixed 48px icon strip — always visible, never collapsible. It anchors spatial memory so the user always knows where they are.",
              "The explorer panel (240px) slides in/out based on which activity icon is active. Clicking the same icon again collapses it, a toggle-on-reclick pattern.",
              "The bottom panel splits the main area vertically at a 65/35 ratio. It collapses to a thin tab bar (32px) rather than disappearing entirely.",
            ]}
          />
        </FramePanel>
      </Frame>
      <Frame>
        <FrameHeader>
          <FrameTitle>State Architecture</FrameTitle>
          <FrameDescription>
            Independent panel states, zero derived redundancy
          </FrameDescription>
        </FrameHeader>
        <FramePanel>
          <DesignNotes
            notes={[
              "Four independent state variables: activeSection (nullable), activeTab, bottomOpen, activeBottomTab. No state is derived from other state.",
              "Setting activeSection to null collapses the explorer. Setting it to a section opens/switches it. This single nullable value replaces two variables (isOpen + whichPanel).",
              "The tab bar and bottom tab bar use a flat list of tab IDs — adding a new tab requires only a data change, not a structural one.",
            ]}
          />
        </FramePanel>
      </Frame>
    </div>
  )
}

function PanelsTabContent() {
  return (
    <div className="space-y-6 p-6">
      <Frame>
        <FrameHeader>
          <FrameTitle>Activity Bar</FrameTitle>
          <FrameDescription>
            Persistent icon navigation strip
          </FrameDescription>
        </FrameHeader>
        <FramePanel>
                  <DesignNotes
                    notes={[
                      "The activity bar never collapses — it provides a stable reference frame. Even when the explorer closes, the icons remain, preserving spatial awareness.",
                      "LogoMark at the top and Avatar at the bottom create a bookend pattern — brand identity anchored high, user identity anchored low. This matches the Command Center template's rail convention.",
                      "Each icon uses a Tooltip positioned to the right, so labels are discoverable without taking space. This follows the same pattern as the sidebar-detail template's collapsed state.",
                      "Active state uses variant=\"secondary\" (tinted background) rather than a border or underline, keeping the visual treatment consistent with the rest of the design system.",
                    ]}
                  />
        </FramePanel>
      </Frame>
      <Frame>
        <FrameHeader>
          <FrameTitle>Bottom Panel</FrameTitle>
          <FrameDescription>
            Collapsible output area with tab switching
          </FrameDescription>
        </FrameHeader>
        <FramePanel>
          <DesignNotes
            notes={[
              "Collapsed state shows bottom tabs as clickable text buttons in a thin bar — clicking any tab both opens the panel and switches to that tab in one action.",
              "The expand/collapse toggle uses ChevronDown (collapse) and ChevronUp (expand), matching the directional icon convention from the multi-column template.",
              "The bottom panel uses percentage-based flex (flex: 35) rather than fixed pixels, so it scales proportionally as the viewport height changes.",
            ]}
          />
        </FramePanel>
      </Frame>
    </div>
  )
}

function NotesTabContent() {
  return (
    <div className="space-y-6 p-6">
      <Frame>
        <FrameHeader>
          <FrameTitle>Responsiveness</FrameTitle>
          <FrameDescription>
            Adapting a 4-region layout to mobile
          </FrameDescription>
        </FrameHeader>
        <FramePanel>
          <DesignNotes
            notes={[
              "On mobile, the activity bar, explorer, and bottom panel are all hidden (hidden md:flex). Only the tab bar + main content remain — the simplest viable workspace.",
              "This follows the same progressive disclosure pattern as other templates: mobile shows the primary region, desktop reveals supporting panels.",
              "The tab bar is always visible, even on mobile, because tabs are the primary navigation within the workspace. Hiding them would break the mental model.",
            ]}
          />
        </FramePanel>
      </Frame>
      <Frame>
        <FrameHeader>
          <FrameTitle>Status Bar</FrameTitle>
          <FrameDescription>
            Persistent contextual information
          </FrameDescription>
        </FrameHeader>
        <FramePanel>
          <DesignNotes
            notes={[
              "The status bar uses bg-primary with primary-foreground text — a deliberate visual break from the workspace above. It anchors the bottom edge with high contrast.",
              "Left side shows global context (branch, diagnostics), right side shows local context (cursor position, language). This left-global / right-local pattern mirrors IDE conventions.",
              "At 24px tall (h-6), the status bar is the thinnest persistent element. It should never compete with content for attention — just be there when you glance down.",
            ]}
          />
        </FramePanel>
      </Frame>
      <Frame>
        <FrameHeader>
          <FrameTitle>Tab Architecture</FrameTitle>
          <FrameDescription>
            Main tabs vs bottom tabs
          </FrameDescription>
        </FrameHeader>
        <FramePanel>
          <DesignNotes
            notes={[
              "Main tabs use a border-b active indicator (bg-background vs bg-muted/30), mimicking editor tabs. The close button (XIcon) on each tab reinforces the document metaphor.",
              "Bottom tabs use a text-only style without close buttons — they represent fixed views (Output, Problems), not user-opened documents.",
              "Both tab systems use the same state pattern (activeTab / activeBottomTab) but different visual treatments to signal their different roles.",
            ]}
          />
        </FramePanel>
      </Frame>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function WorkspacePage() {
  const [activeSection, setActiveSection] =
    React.useState<ActivitySection | null>("files")
  const [activeTab, setActiveTab] = React.useState<MainTab>("layout")
  const [bottomOpen, setBottomOpen] = React.useState(true)
  const [activeBottomTab, setActiveBottomTab] =
    React.useState<BottomTab>("output")

  const toggleSection = (section: ActivitySection) => {
    setActiveSection((prev) => (prev === section ? null : section))
  }

  return (
    <div className="flex h-svh flex-col">
      {/* ─── Main horizontal split ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="hidden w-12 flex-col items-center gap-1 border-r bg-muted/30 py-2 md:flex">
          <LogoMark className="size-5" />
          <div className="mx-auto my-2 h-px w-6 bg-border" />

          {ACTIVITY_ITEMS.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger
                render={
                  <Button
                    variant={
                      activeSection === item.id ? "secondary" : "ghost"
                    }
                    size="icon-sm"
                    onClick={() => toggleSection(item.id)}
                  />
                }
              >
                <item.icon className="size-4" />
                <span className="sr-only">{item.label}</span>
              </TooltipTrigger>
              <TooltipPopup>{item.label}</TooltipPopup>
            </Tooltip>
          ))}

          <div className="mt-auto flex flex-col items-center gap-1">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setBottomOpen((p) => !p)}
                  />
                }
              >
                <PanelBottomIcon className="size-4" />
                <span className="sr-only">Toggle bottom panel</span>
              </TooltipTrigger>
              <TooltipPopup>Toggle panel</TooltipPopup>
            </Tooltip>

            <Menu>
              <MenuTrigger
                openOnHover
                delay={200}
                closeDelay={300}
                render={<Button variant="ghost" size="icon-sm" />}
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
        </div>

        {/* Explorer Panel */}
        <div
          className={cn(
            "hidden flex-col border-r bg-muted/20 transition-[width] duration-200 ease-in-out md:flex",
            activeSection ? "w-60" : "w-0 overflow-hidden border-r-0",
          )}
        >
          {activeSection && (
            <>
              <div className="flex h-9 items-center justify-between px-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {
                    ACTIVITY_ITEMS.find((i) => i.id === activeSection)
                      ?.label
                  }
                </span>
              </div>
              <ScrollArea className="flex-1">
                {activeSection === "files" && (
                  <FileTree nodes={FILE_TREE} />
                )}
                {activeSection === "search" && (
                  <div className="space-y-3 px-3">
                    <Input placeholder="Search files…" className="h-7 text-xs" />
                    <div className="space-y-1">
                      {["Layout.tsx", "Panels.tsx", "utils.ts"].map(
                        (file) => (
                          <div
                            key={file}
                            className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-accent/50"
                          >
                            <FileIcon className="size-3 shrink-0" />
                            <span>{file}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
                {activeSection === "settings" && (
                  <div className="space-y-1 px-3">
                    {[
                      "Editor",
                      "Theme",
                      "Keybindings",
                      "Extensions",
                      "Profiles",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent/50"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </>
          )}
        </div>

        {/* ─── Main vertical split ─── */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Tab bar */}
          <div className="flex h-9 items-end bg-muted/30">
            {MAIN_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "group flex h-full items-center gap-1.5 border-r px-3 text-xs transition-colors",
                  activeTab === tab.id
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <FileIcon className="size-3 shrink-0 text-muted-foreground" />
                <span>{tab.label}</span>
                <XIcon className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>

          {/* Editor + Bottom split */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Editor area */}
            <ScrollArea
              scrollFade
              className="min-h-0"
              style={{ flex: bottomOpen ? "65" : "1" }}
            >
              {activeTab === "layout" && <LayoutTabContent />}
              {activeTab === "panels" && <PanelsTabContent />}
              {activeTab === "notes" && <NotesTabContent />}
            </ScrollArea>

            {/* Bottom panel — expanded */}
            {bottomOpen && (
              <div
                className="hidden flex-col border-t md:flex"
                style={{ flex: "35" }}
              >
                <div className="flex h-8 shrink-0 items-center justify-between bg-muted/30 px-2">
                  <div className="flex items-center">
                    {BOTTOM_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveBottomTab(tab.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1 text-xs transition-colors",
                          activeBottomTab === tab.id
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span>{tab.label}</span>
                        {tab.count && (
                          <Badge
                            variant="secondary"
                            className="h-4 min-w-4 px-1 text-[10px] tabular-nums"
                          >
                            {tab.count}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setBottomOpen(false)}
                  >
                    <ChevronDownIcon className="size-3.5" />
                    <span className="sr-only">Collapse panel</span>
                  </Button>
                </div>

                <ScrollArea className="flex-1">
                  {activeBottomTab === "output" && (
                    <div className="p-3 font-mono text-xs leading-5">
                      {OUTPUT_LINES.map((line, i) => (
                        <div
                          key={i}
                          className={cn(
                            line.dim
                              ? "text-muted-foreground"
                              : "text-foreground",
                          )}
                        >
                          {line.text || "\u00A0"}
                        </div>
                      ))}
                    </div>
                  )}
                  {activeBottomTab === "problems" && (
                    <div className="divide-y">
                      {PROBLEMS.map((p, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 px-4 py-2"
                        >
                          {p.type === "error" ? (
                            <CircleAlertIcon className="mt-0.5 size-3.5 shrink-0 text-destructive" />
                          ) : (
                            <TriangleAlertIcon className="mt-0.5 size-3.5 shrink-0 text-warning" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs">{p.text}</p>
                            <p className="text-[11px] text-muted-foreground">
                              {p.file}:{p.line}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}

            {/* Bottom panel — collapsed tab bar */}
            {!bottomOpen && (
              <div className="hidden h-8 items-center border-t bg-muted/30 px-2 md:flex">
                {BOTTOM_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setBottomOpen(true)
                      setActiveBottomTab(tab.id)
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{tab.label}</span>
                    {tab.count && (
                      <Badge
                        variant="secondary"
                        className="h-4 min-w-4 px-1 text-[10px] tabular-nums"
                      >
                        {tab.count}
                      </Badge>
                    )}
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="ml-auto"
                  onClick={() => setBottomOpen(true)}
                >
                  <ChevronUpIcon className="size-3.5" />
                  <span className="sr-only">Expand panel</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Status Bar ─── */}
      <div className="flex h-6 items-center justify-between border-t bg-primary px-3 text-[11px] text-primary-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <GitBranchIcon className="size-3" />
            main
          </span>
          <span className="flex items-center gap-1">
            <CircleAlertIcon className="size-3" />1
            <TriangleAlertIcon className="size-3 ml-1" />2
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ln 42, Col 18</span>
          <span>UTF-8</span>
          <span className="flex items-center gap-1">
            <TerminalIcon className="size-3" />
            TypeScript
          </span>
        </div>
      </div>
    </div>
  )
}
