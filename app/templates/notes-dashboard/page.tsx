"use client"

import { useState } from "react"
import {
  BookOpenIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  FileTextIcon,
  HomeIcon,
  InboxIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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

const favoritePages = [
  { emoji: "📋", title: "Project Management & Ta..." },
  { emoji: "🍳", title: "Family Recipe Collection ..." },
  { emoji: "🏃", title: "Fitness Tracker & Workout..." },
  { emoji: "📖", title: "Book Notes & Reading List" },
  { emoji: "🌱", title: "Sustainable Gardening Tip..." },
  { emoji: "💧", title: "Language Learning Progre..." },
  { emoji: "🏠", title: "Home Renovation Ideas & ..." },
  { emoji: "💰", title: "Personal Finance & Invest..." },
  { emoji: "🎬", title: "Movie & TV Show Watchlis..." },
  { emoji: "✅", title: "Daily Habit Tracker & Goal ..." },
]

const workspaces = [
  { emoji: "👤", title: "Personal Life Management" },
  { emoji: "💼", title: "Professional Development" },
  { emoji: "🎨", title: "Creative Projects" },
  { emoji: "🏡", title: "Home Management" },
  { emoji: "🧳", title: "Travel & Adventure" },
]

const myCalendars = [
  { name: "Personal", color: "bg-blue-500", defaultChecked: true },
  { name: "Work", color: "bg-green-500", defaultChecked: true },
  { name: "Family", color: "bg-muted-foreground/30", defaultChecked: false },
]

function RightPanel() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 2, 3))

  return (
    <aside className="hidden w-[260px] shrink-0 border-l lg:flex lg:flex-col">
      <ScrollArea scrollFade>
        <div className="flex flex-col">
          {/* User profile */}
          <div className="flex items-center gap-3 px-4 py-3">
            <Avatar className="size-9">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="shadcn"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold">shadcn</span>
              <span className="truncate text-xs text-muted-foreground">
                m@example.com
              </span>
            </div>
            <Button variant="ghost" size="icon-xs">
              <ChevronsUpDownIcon />
              <span className="sr-only">Account settings</span>
            </Button>
          </div>

          <Separator />

          {/* Calendar */}
          <div className="flex justify-center px-2 py-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={new Date(2026, 2)}
              className="w-full"
            />
          </div>

          <Separator />

          {/* My Calendars */}
          <Collapsible defaultOpen>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-sm font-semibold">My Calendars</span>
              <CollapsibleTrigger>
                <ChevronDownIcon className="size-4 text-muted-foreground transition-transform [[data-panel-open]_&]:rotate-0 [[data-panel-hidden]_&]:-rotate-90" />
                <span className="sr-only">Toggle calendars</span>
              </CollapsibleTrigger>
            </div>
            <CollapsiblePanel>
              <div className="space-y-1 px-4 pb-3">
                {myCalendars.map((cal) => (
                  <div key={cal.name} className="flex items-center gap-2.5 py-1">
                    <Checkbox
                      defaultChecked={cal.defaultChecked}
                      className={
                        cal.defaultChecked
                          ? `border-transparent [&_[data-slot=checkbox-indicator]]:${cal.color}`
                          : undefined
                      }
                    />
                    <Label className="cursor-pointer text-sm font-normal">
                      {cal.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsiblePanel>
          </Collapsible>

          <Separator />

          {/* Favorites */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2.5">
              <span className="text-sm font-semibold">Favorites</span>
              <ChevronRightIcon className="size-4 text-muted-foreground transition-transform [[data-panel-open]_&]:rotate-90" />
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <div className="px-4 pb-3">
                <p className="text-sm text-muted-foreground">
                  No favorite calendars yet.
                </p>
              </div>
            </CollapsiblePanel>
          </Collapsible>

          <Separator />

          {/* Other */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2.5">
              <span className="text-sm font-semibold">Other</span>
              <ChevronRightIcon className="size-4 text-muted-foreground transition-transform [[data-panel-open]_&]:rotate-90" />
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <div className="px-4 pb-3">
                <p className="text-sm text-muted-foreground">
                  No other calendars.
                </p>
              </div>
            </CollapsiblePanel>
          </Collapsible>

          <Separator />

          {/* New Calendar */}
          <div className="px-4 py-3">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <PlusIcon data-icon="inline-start" />
              New Calendar
            </Button>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

export default function NotesDashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Acme Inc">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpenIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Acme Inc</span>
                </div>
                <ChevronDownIcon className="ml-auto size-4 text-muted-foreground" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {/* Top navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Search">
                    <SearchIcon />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Ask AI">
                    <SparklesIcon />
                    <span>Ask AI</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Home">
                    <HomeIcon />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Inbox">
                    <InboxIcon />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Favorites */}
          <SidebarGroup>
            <SidebarGroupLabel>Favorites</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {favoritePages.map((page) => (
                  <SidebarMenuItem key={page.title}>
                    <SidebarMenuButton tooltip={page.title}>
                      <span className="text-base leading-none">
                        {page.emoji}
                      </span>
                      <span className="truncate">{page.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="More"
                    className="text-muted-foreground"
                  >
                    <MoreHorizontalIcon />
                    <span>More</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Workspaces */}
          <SidebarGroup>
            <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {workspaces.map((ws) => (
                  <SidebarMenuItem key={ws.title}>
                    <SidebarMenuButton tooltip={ws.title}>
                      <span className="text-base leading-none">
                        {ws.emoji}
                      </span>
                      <span className="truncate">{ws.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="More"
                    className="text-muted-foreground"
                  >
                    <MoreHorizontalIcon />
                    <span>More</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter />
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <FileTextIcon className="size-4 text-muted-foreground" />
          <h1 className="text-sm font-semibold">
            Project Management & Task Tracking
          </h1>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto">
            <div className="space-y-6 p-6">
              {/* Placeholder content blocks matching the screenshot */}
              <div className="h-24 rounded-lg bg-muted/40" />
              <div className="h-[calc(100vh-280px)] rounded-lg bg-muted/25" />

              {/* Design notes */}
              <div className="grid gap-4 md:grid-cols-2">
                <Frame>
                  <FrameHeader>
                    <FrameTitle>Spatial Roles</FrameTitle>
                    <FrameDescription>
                      Three-region asymmetric layout
                    </FrameDescription>
                  </FrameHeader>
                  <FramePanel>
                    <DesignNotes
                      notes={[
                        "The left sidebar serves navigation — hierarchical page browsing with favorites and workspaces. It uses SidebarProvider for collapsible behavior, mobile Sheet overlay, and Cmd+B keyboard shortcut.",
                        "The right panel serves contextual tools — calendar, account info, and calendar management. It is implemented as a plain aside element because it provides utilities, not navigation, and does not need collapse-to-icon behavior.",
                        "The center content area takes remaining flex space, expanding as either panel hides. This asymmetric trio (nav / workspace / tools) is the standard productivity app shell.",
                      ]}
                    />
                  </FramePanel>
                </Frame>

                <Frame>
                  <FrameHeader>
                    <FrameTitle>Information Density</FrameTitle>
                    <FrameDescription>
                      Scanability and progressive disclosure
                    </FrameDescription>
                  </FrameHeader>
                  <FramePanel>
                    <DesignNotes
                      notes={[
                        "Favorites use emoji prefixes as visual markers — they provide instant recognition without icon overhead. Text is truncated to maintain consistent row height across varying title lengths.",
                        "The right panel layers information by urgency: profile (identity) → calendar (time awareness) → calendar list (filtering) → collapsible sections (secondary). Each section uses Separator to create clear visual boundaries.",
                        "Workspace entries use emoji + label pairs to create scannable lists. The 'More' affordance signals additional items without overwhelming the visible list.",
                      ]}
                    />
                  </FramePanel>
                </Frame>

                <Frame>
                  <FrameHeader>
                    <FrameTitle>Responsive Strategy</FrameTitle>
                    <FrameDescription>
                      Adaptation across viewports
                    </FrameDescription>
                  </FrameHeader>
                  <FramePanel>
                    <DesignNotes
                      notes={[
                        "The left Sidebar uses collapsible='icon' — on collapse it shrinks to icon-only width (48px) with tooltips preserving label discoverability. On mobile it renders as a Sheet overlay.",
                        "The right panel uses 'hidden lg:flex' — it disappears entirely below the lg breakpoint. Unlike navigation, contextual tools are non-essential on smaller screens and can be accessed through other flows.",
                        "The main content area fills all available horizontal space, ensuring the workspace remains usable at any viewport width regardless of which panels are visible.",
                      ]}
                    />
                  </FramePanel>
                </Frame>

                <Frame>
                  <FrameHeader>
                    <FrameTitle>Calendar Integration</FrameTitle>
                    <FrameDescription>
                      Persistent temporal context
                    </FrameDescription>
                  </FrameHeader>
                  <FramePanel>
                    <DesignNotes
                      notes={[
                        "The calendar widget is always visible in the right panel rather than hidden behind a page route. This provides persistent temporal awareness — users can reference dates while working on any page.",
                        "Calendar categories use colored checkboxes for quick filtering. The color-coding creates an at-a-glance visual system that maps to the calendar grid without requiring labels.",
                        "Collapsible sections (Favorites, Other) use Collapsible with animated CollapsiblePanel for smooth height transitions. The chevron icon rotates to indicate open/closed state.",
                      ]}
                    />
                  </FramePanel>
                </Frame>
              </div>
            </div>
          </main>

          {/* Right panel */}
          <RightPanel />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
