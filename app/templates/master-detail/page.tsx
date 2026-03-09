"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  ClockIcon,
  InboxIcon,
  ListIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FramePanel,
} from "@/components/ui/frame"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type ItemStatus = "open" | "in-progress" | "done"

interface ListItem {
  id: string
  title: string
  description: string
  status: ItemStatus
  priority: "low" | "medium" | "high"
  assignee: string
  tags: string[]
  created: string
}

const STATUS_CONFIG: Record<
  ItemStatus,
  { label: string; icon: React.ElementType; color: string }
> = {
  open: {
    label: "Open",
    icon: CircleIcon,
    color: "text-muted-foreground",
  },
  "in-progress": {
    label: "In Progress",
    icon: ClockIcon,
    color: "text-info",
  },
  done: {
    label: "Done",
    icon: CircleCheckIcon,
    color: "text-success",
  },
}

const PRIORITY_BADGE: Record<string, string> = {
  high: "destructive",
  medium: "warning",
  low: "secondary",
}

const SAMPLE_ITEMS: ListItem[] = [
  {
    id: "1",
    title: "Redesign navigation flow",
    description:
      "Simplify the main navigation to reduce cognitive load. Consolidate top-level items and introduce contextual sub-navigation within each section.",
    status: "in-progress",
    priority: "high",
    assignee: "Alex",
    tags: ["design", "ux"],
    created: "2 hours ago",
  },
  {
    id: "2",
    title: "Add keyboard shortcuts",
    description:
      "Implement global keyboard shortcuts for common actions. Include a discoverable shortcut palette (Cmd+K) and document shortcuts in a help overlay.",
    status: "open",
    priority: "medium",
    assignee: "Jordan",
    tags: ["feature", "accessibility"],
    created: "5 hours ago",
  },
  {
    id: "3",
    title: "Fix mobile scroll performance",
    description:
      "Address janky scrolling in long lists on iOS Safari. Investigate passive event listeners and virtual scrolling as potential solutions.",
    status: "open",
    priority: "high",
    assignee: "Sam",
    tags: ["bug", "performance"],
    created: "1 day ago",
  },
  {
    id: "4",
    title: "Write API documentation",
    description:
      "Document all public endpoints with request/response examples. Include authentication flows, rate limits, and error codes.",
    status: "done",
    priority: "low",
    assignee: "Taylor",
    tags: ["docs"],
    created: "2 days ago",
  },
  {
    id: "5",
    title: "Implement dark mode toggle",
    description:
      "Add system-aware dark mode with a manual override toggle. Persist user preference and ensure all components respect the theme.",
    status: "in-progress",
    priority: "medium",
    assignee: "Alex",
    tags: ["feature", "design"],
    created: "3 days ago",
  },
  {
    id: "6",
    title: "Audit color contrast",
    description:
      "Run WCAG 2.1 AA compliance checks across all text and interactive elements. Fix any contrast ratios below 4.5:1 for normal text.",
    status: "open",
    priority: "medium",
    assignee: "Jordan",
    tags: ["accessibility"],
    created: "4 days ago",
  },
]

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

export default function MasterDetailPage() {
  const [selectedId, setSelectedId] = React.useState<string | null>("1")
  const [listCollapsed, setListCollapsed] = React.useState(false)

  const selectedItem = React.useMemo(
    () => SAMPLE_ITEMS.find((item) => item.id === selectedId) ?? null,
    [selectedId],
  )

  return (
    <div className="flex h-svh flex-col">
      <div className="flex flex-1 gap-1 overflow-hidden p-1">
        {/* List pane */}
        <div
          className={cn(
            "min-w-0 transition-[flex] duration-300 ease-in-out",
            selectedId ? "hidden md:block" : "block",
          )}
          style={{ flex: listCollapsed ? "0 0 48px" : "1 1 0%" }}
        >
          <Frame className="h-full overflow-hidden">
            {listCollapsed ? (
              <button
                onClick={() => setListCollapsed(false)}
                className="flex h-full w-full flex-col items-center gap-2 rounded-xl py-4 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                <ListIcon className="size-4 shrink-0" />
                <span className="text-xs font-medium [writing-mode:vertical-lr]">
                  Items
                </span>
              </button>
            ) : (
              <>
                <FrameHeader className="flex-row items-center justify-between">
                  <div className="flex min-w-0 items-center gap-2">
                    <InboxIcon className="size-4 shrink-0 text-muted-foreground" />
                    <FrameTitle className="truncate">Items</FrameTitle>
                    <Badge variant="secondary" className="tabular-nums">
                      {SAMPLE_ITEMS.length}
                    </Badge>
                  </div>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="hidden shrink-0 md:inline-flex"
                          onClick={() => setListCollapsed(true)}
                        />
                      }
                    >
                      <ChevronLeftIcon />
                      <span className="sr-only">Collapse list</span>
                    </TooltipTrigger>
                    <TooltipPopup>Collapse list</TooltipPopup>
                  </Tooltip>
                </FrameHeader>
                <FramePanel className="min-h-0 flex-1 overflow-hidden p-0">
                  <ScrollArea scrollFade>
                    <ul>
                      {SAMPLE_ITEMS.map((item) => {
                        const StatusIcon = STATUS_CONFIG[item.status].icon
                        const isSelected = item.id === selectedId
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => setSelectedId(item.id)}
                              className={cn(
                                "flex w-full gap-3 px-4 py-3 text-left transition-colors",
                                isSelected
                                  ? "bg-accent"
                                  : "hover:bg-accent/50",
                              )}
                            >
                              <StatusIcon
                                className={cn(
                                  "mt-0.5 size-4 shrink-0",
                                  STATUS_CONFIG[item.status].color,
                                )}
                              />
                              <div className="min-w-0 flex-1">
                                <p
                                  className={cn(
                                    "truncate text-sm",
                                    isSelected
                                      ? "font-medium"
                                      : "font-normal",
                                  )}
                                >
                                  {item.title}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                  {item.assignee} &middot; {item.created}
                                </p>
                              </div>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </ScrollArea>
                </FramePanel>
              </>
            )}
          </Frame>
        </div>

        {/* Detail pane */}
        <div
          className={cn(
            "min-w-0 transition-[flex] duration-300 ease-in-out",
            !selectedId && "hidden md:block",
          )}
          style={{ flex: "2 1 0%" }}
        >
          <Frame className="h-full overflow-hidden">
            {selectedItem ? (
              <>
                <FrameHeader className="flex-row items-center justify-between">
                  <div className="flex min-w-0 items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="shrink-0 md:hidden"
                      onClick={() => setSelectedId(null)}
                    >
                      <ArrowLeftIcon />
                      <span className="sr-only">Back to list</span>
                    </Button>
                    <FrameTitle className="truncate">
                      {selectedItem.title}
                    </FrameTitle>
                  </div>
                  {listCollapsed && (
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            className="hidden shrink-0 md:inline-flex"
                            onClick={() => setListCollapsed(false)}
                          />
                        }
                      >
                        <ChevronRightIcon />
                        <span className="sr-only">Expand list</span>
                      </TooltipTrigger>
                      <TooltipPopup>Expand list</TooltipPopup>
                    </Tooltip>
                  )}
                </FrameHeader>
                <FramePanel className="min-h-0 flex-1 overflow-hidden">
                  <ScrollArea scrollFade>
                    <div className="space-y-6">
                      {/* Metadata row */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          {React.createElement(
                            STATUS_CONFIG[selectedItem.status].icon,
                            {
                              className: cn(
                                "size-3.5",
                                STATUS_CONFIG[selectedItem.status].color,
                              ),
                            },
                          )}
                          <span>
                            {STATUS_CONFIG[selectedItem.status].label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <StarIcon className="size-3.5" />
                          <Badge
                            variant={
                              PRIORITY_BADGE[selectedItem.priority] as
                                | "destructive"
                                | "warning"
                                | "secondary"
                            }
                          >
                            {selectedItem.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <UserIcon className="size-3.5" />
                          <span>{selectedItem.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <ClockIcon className="size-3.5" />
                          <span>{selectedItem.created}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-2">
                        <TagIcon className="size-3.5 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1.5">
                          {selectedItem.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Description</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {selectedItem.description}
                        </p>
                      </div>

                      {/* Design notes */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Design Notes
                        </h3>
                        <div className="grid gap-4 lg:grid-cols-2">
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold">
                              Spatial Roles
                            </h4>
                            <DesignNotes
                              notes={[
                                "The list pane uses flex: 1 and the detail pane flex: 2, reflecting the subordinate–primary relationship. The list serves the detail.",
                                "Collapsed list shrinks to 48px with a vertical label and icon, preserving spatial awareness without consuming layout space.",
                                "Directional collapse icon (ChevronLeft) hints at where the panel will go, while the detail pane offers a ChevronRight to restore it.",
                              ]}
                            />
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold">
                              Selection Model
                            </h4>
                            <DesignNotes
                              notes={[
                                "Selection state drives the entire detail pane — a single source of truth avoids sync bugs between list highlighting and detail rendering.",
                                "The active item uses bg-accent for full-row highlighting, with font-medium on the title to reinforce the selected state without relying on color alone.",
                                "An empty state in the detail pane guides the user when nothing is selected, preventing a confusing blank panel.",
                              ]}
                            />
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold">
                              Responsiveness
                            </h4>
                            <DesignNotes
                              notes={[
                                "Mobile uses a stack pattern: only the list or detail is visible at a time, toggled by selection and a back button.",
                                "The back arrow (ArrowLeftIcon) appears only on mobile (md:hidden), deselecting the item to reveal the list.",
                                "Collapse controls are hidden on mobile (hidden md:inline-flex) since the stack pattern already solves the space problem.",
                              ]}
                            />
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold">
                              List Design
                            </h4>
                            <DesignNotes
                              notes={[
                                "Each list item shows just enough metadata (status icon, assignee, time) to enable scanning without opening the detail.",
                                "Status icons use semantic colors (muted for open, info for in-progress, success for done) so state is visible at a glance.",
                                "List items use full-width buttons for the entire row, maximizing the click target and supporting keyboard navigation.",
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </FramePanel>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                <InboxIcon className="size-10 opacity-30" />
                <p className="text-sm">Select an item to view details</p>
              </div>
            )}
          </Frame>
        </div>
      </div>
    </div>
  )
}
