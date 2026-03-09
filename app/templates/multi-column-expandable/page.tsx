"use client"

import * as React from "react"
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  LogOutIcon,
  MessageSquareIcon,
  MinusIcon,
  PenLineIcon,
  PlusIcon,
  SettingsIcon,
  ShareIcon,
  UserIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Frame,
  FrameHeader,
  FrameTitle,
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

type PanelId = "left" | "center" | "right"

type LayoutPreset =
  | "standard"
  | "reading-chat"
  | "chat-writing"
  | "reading-writing"

const PRESETS: Record<LayoutPreset, { label: string; panels: PanelId[] }> = {
  standard: { label: "Standard", panels: ["left", "center", "right"] },
  "reading-chat": { label: "Reading + Chat", panels: ["left", "center"] },
  "chat-writing": { label: "Chat + Writing", panels: ["center", "right"] },
  "reading-writing": {
    label: "Reading + Writing",
    panels: ["left", "right"],
  },
}

const PANEL_CONFIG: Record<
  PanelId,
  {
    title: string
    description: string
    icon: React.ElementType
    expandedFlex: string
    collapseIcon: React.ElementType
    notes: string[]
  }
> = {
  left: {
    title: "Inputs",
    description: "Sources, documents, and references",
    icon: BookOpenIcon,
    expandedFlex: "1 1 0%",
    collapseIcon: ChevronLeftIcon,
    notes: [
      "Side panels use flex: 1 while the center uses flex: 2, establishing visual weight hierarchy without subordination.",
      "Each panel wraps content in a Frame for consistent borders and the muted \u2192 card background layering.",
      "Independent ScrollArea per panel prevents one panel\u2019s overflow from affecting siblings.",
    ],
  },
  center: {
    title: "Main",
    description: "Primary workspace area",
    icon: MessageSquareIcon,
    expandedFlex: "2 1 0%",
    collapseIcon: MinusIcon,
    notes: [
      "Preset layout modes (Standard, Reading + Chat, etc.) enable one-click context switching rather than per-panel toggling.",
      "Active preset is derived from panel state via useMemo \u2014 toggling individual panels naturally deselects presets without separate state.",
      "transition-[flex] with duration-300 and ease-in-out animates width changes smoothly without layout thrash.",
      "The center panel is always visible on mobile (side panels use hidden md:block), following mobile-first responsive patterns.",
    ],
  },
  right: {
    title: "Outputs",
    description: "Notes, artifacts, and creations",
    icon: PenLineIcon,
    expandedFlex: "1 1 0%",
    collapseIcon: ChevronRightIcon,
    notes: [
      "Collapsed panels shrink to 48px with a vertical text label (writing-mode: vertical-lr) and icon, preserving spatial awareness of hidden content.",
      "Collapse icons are directional \u2014 ChevronLeft for the left panel, ChevronRight for the right \u2014 giving visual cues about collapse direction.",
      "Collapsed state uses a full-height button for easy re-expansion with a generous click target.",
    ],
  },
}

function setsEqual(a: Set<PanelId>, b: Set<PanelId>): boolean {
  if (a.size !== b.size) return false
  for (const item of a) {
    if (!b.has(item)) return false
  }
  return true
}

export default function MultiColumnExpandablePage() {
  const [expandedPanels, setExpandedPanels] = React.useState<Set<PanelId>>(
    new Set(["left", "center", "right"]),
  )

  const activePreset = React.useMemo<LayoutPreset | null>(() => {
    for (const [key, preset] of Object.entries(PRESETS)) {
      if (setsEqual(expandedPanels, new Set(preset.panels))) {
        return key as LayoutPreset
      }
    }
    return null
  }, [expandedPanels])

  const applyPreset = (preset: LayoutPreset) => {
    setExpandedPanels(new Set(PRESETS[preset].panels))
  }

  const togglePanel = (panelId: PanelId) => {
    setExpandedPanels((prev) => {
      const next = new Set(prev)
      if (next.has(panelId)) {
        next.delete(panelId)
      } else {
        next.add(panelId)
      }
      return next
    })
  }

  return (
    <div className="flex h-svh flex-col">
      {/* Header */}
      <div className="hidden items-center justify-between border-b px-3 py-2 md:flex">
        {/* Left – Logo */}
        <div className="flex items-center">
          <Button variant="ghost" size="sm" render={<a href="#" />}>
            <Logo markClassName="size-5" wordmarkClassName="text-base" />
          </Button>
        </div>

        {/* Center – Layout preset tabs */}
        <div className="flex items-center rounded-lg bg-muted p-0.5">
          {(
            Object.entries(PRESETS) as [
              LayoutPreset,
              (typeof PRESETS)[LayoutPreset],
            ][]
          ).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activePreset === key
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Right – Actions & account */}
        <div className="flex items-center gap-1">
          <Button size="sm">
            <PlusIcon data-icon="inline-start" />
            Create
          </Button>
          <Button variant="ghost" size="icon-sm">
            <ShareIcon />
            <span className="sr-only">Share</span>
          </Button>
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">AK</AvatarFallback>
              </Avatar>
              <span className="sr-only">Account</span>
            </MenuTrigger>
            <MenuPopup align="end">
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

      {/* Three-panel container */}
      <div className="flex flex-1 gap-1 overflow-hidden p-1">
        {(["left", "center", "right"] as const).map((panelId) => {
          const config = PANEL_CONFIG[panelId]
          const isExpanded = expandedPanels.has(panelId)
          const Icon = config.icon
          const CollapseIcon = config.collapseIcon

          return (
            <div
              key={panelId}
              className={cn(
                "min-w-0 transition-[flex] duration-300 ease-in-out",
                panelId !== "center" && "hidden md:block",
              )}
              style={{
                flex: isExpanded ? config.expandedFlex : "0 0 48px",
              }}
            >
              <Frame className="h-full overflow-hidden">
                {isExpanded ? (
                  <>
                    <FrameHeader className="flex-row items-center justify-between">
                      <div className="flex min-w-0 items-center gap-2">
                        <Icon className="size-4 shrink-0 text-muted-foreground" />
                        <FrameTitle className="truncate">
                          {config.title}
                        </FrameTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="shrink-0"
                        onClick={() => togglePanel(panelId)}
                      >
                        <CollapseIcon />
                        <span className="sr-only">
                          Collapse {config.title}
                        </span>
                      </Button>
                    </FrameHeader>
                    <FramePanel className="min-h-0 flex-1 overflow-hidden">
                      <ScrollArea scrollFade>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            {config.description}
                          </p>
                          <div className="space-y-3">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Design Notes
                            </h3>
                            <ul className="space-y-2">
                              {config.notes.map((note, i) => (
                                <li
                                  key={i}
                                  className="flex gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                                  <span>{note}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </ScrollArea>
                    </FramePanel>
                  </>
                ) : (
                  <button
                    onClick={() => togglePanel(panelId)}
                    className="flex h-full w-full flex-col items-center gap-2 rounded-xl py-4 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="text-xs font-medium [writing-mode:vertical-lr]">
                      {config.title}
                    </span>
                  </button>
                )}
              </Frame>
            </div>
          )
        })}
      </div>
    </div>
  )
}
