"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  BellIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CodeIcon,
  CreditCardIcon,
  FileAudioIcon,
  FilmIcon,
  GlobeIcon,
  HomeIcon,
  ImageIcon,
  LayoutTemplateIcon,
  LogOutIcon,
  MessageSquareIcon,
  MicIcon,
  MonitorIcon,
  MoonIcon,
  MusicIcon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SpeechIcon,
  SparklesIcon,
  UserIcon,
  Volume2Icon,
  WandSparklesIcon,
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
} from "@/components/ui/tooltip"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Workspace {
  id: string
  name: string
  description: string
  color: string
}

const WORKSPACES: Workspace[] = [
  {
    id: "eleven-creative",
    name: "ElevenCreative",
    description: "Create, edit and localize content with AI",
    color: "bg-gradient-to-br from-amber-300 to-orange-400",
  },
  {
    id: "eleven-agents",
    name: "ElevenAgents",
    description: "Deploy and monitor conversational agents",
    color: "bg-gradient-to-br from-sky-300 to-teal-400",
  },
  {
    id: "eleven-api",
    name: "ElevenAPI",
    description: "Build with our leading AI audio models",
    color: "bg-gradient-to-br from-violet-300 to-purple-400",
  },
]

const mainNav = [
  { title: "Home", icon: HomeIcon, isActive: true },
  { title: "Voices", icon: MicIcon },
  { title: "Files", icon: FileAudioIcon },
]

const playgroundNav = [
  { title: "Text to Speech", icon: SpeechIcon },
  { title: "Voice Changer", icon: WandSparklesIcon },
  { title: "Voice Isolator", icon: AudioLinesIcon },
  { title: "Sound Effects", icon: Volume2Icon },
  { title: "Music", icon: MusicIcon },
  { title: "Image & Video", icon: ImageIcon },
  { title: "Templates", icon: LayoutTemplateIcon },
]

const productsNav = [
  { title: "Studio", icon: MonitorIcon },
  { title: "Audiobooks", icon: BookOpenIcon, badge: "New" },
  { title: "Flows", icon: GlobeIcon, badge: "New" },
  { title: "Dubbing", icon: GlobeIcon },
  { title: "Speech to Text", icon: SpeechIcon },
  { title: "Audio Native", icon: AudioLinesIcon },
  { title: "Productions", icon: FilmIcon },
]

interface FeatureCard {
  title: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Instant speech",
    icon: SpeechIcon,
    gradient: "from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/40",
  },
  {
    title: "Audiobook",
    icon: BookOpenIcon,
    gradient: "from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40",
  },
  {
    title: "Image & Video",
    icon: ImageIcon,
    gradient: "from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/40",
  },
  {
    title: "Agents",
    icon: SparklesIcon,
    gradient: "from-violet-100 to-violet-200 dark:from-violet-900/40 dark:to-violet-800/40",
  },
  {
    title: "Music",
    icon: MusicIcon,
    gradient: "from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40",
  },
  {
    title: "Dubbed video",
    icon: FilmIcon,
    gradient: "from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40",
  },
]

interface LibraryVoice {
  initials: string
  name: string
  description: string
  color: string
}

const LIBRARY_VOICES: LibraryVoice[] = [
  {
    initials: "OH",
    name: "Oliver - Clean, British and Steady",
    description: "A mature voice which is warm and kind with just a hint ...",
    color: "bg-gradient-to-br from-orange-300 to-orange-400",
  },
  {
    initials: "DC",
    name: "Drew - Casual, Curious & Fun",
    description: "Food & travel. Tips & ideas. Social media's narrator for teaching and learnin...",
    color: "bg-gradient-to-br from-rose-300 to-rose-400",
  },
  {
    initials: "HS",
    name: "Haven Sands",
    description: "Youthful General American male Baritone Tenor with a slight millennial fry...",
    color: "bg-gradient-to-br from-amber-300 to-yellow-400",
  },
  {
    initials: "JD",
    name: "Jane Doe - Intimate",
    description: "Voice of a young, warm, smooth and friendly...",
    color: "bg-gradient-to-br from-sky-300 to-sky-400",
  },
  {
    initials: "MM",
    name: "Michael Mouse - Pitchy, Energetic Comic",
    description: "A male American comic character voice, high energy...",
    color: "bg-gradient-to-br from-violet-300 to-violet-400",
  },
]

interface VoiceAction {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

const VOICE_ACTIONS: VoiceAction[] = [
  {
    title: "Voice Design",
    description: "Design an entirely new voice from a text prompt",
    icon: PaletteIcon,
    gradient: "from-rose-400 to-orange-400",
  },
  {
    title: "Clone your Voice",
    description: "Create a realistic digital clone of your voice",
    icon: MicIcon,
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    title: "Voice Collections",
    description: "Curated AI voices for every use case",
    icon: Volume2Icon,
    gradient: "from-violet-400 to-indigo-400",
  },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function WorkspaceSwitcher() {
  const [activeWorkspace, setActiveWorkspace] = React.useState(WORKSPACES[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Menu>
          <MenuTrigger
            render={<SidebarMenuButton tooltip={activeWorkspace.name} />}
          >
            <div
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-md",
                activeWorkspace.color,
              )}
            />
            <span className="truncate">{activeWorkspace.name}</span>
            <ChevronsUpDownIcon className="ml-auto size-3.5 shrink-0 opacity-50" />
          </MenuTrigger>
          <MenuPopup side="bottom" align="start" sideOffset={4} className="w-64">
            <MenuGroup>
              <MenuGroupLabel>Workspaces</MenuGroupLabel>
              {WORKSPACES.map((ws) => (
                <MenuItem
                  key={ws.id}
                  onClick={() => setActiveWorkspace(ws)}
                >
                  <div
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md",
                      ws.color,
                    )}
                  />
                  <span className="truncate">{ws.name}</span>
                  {activeWorkspace.id === ws.id && (
                    <CheckIcon className="ml-auto size-3.5 text-primary" />
                  )}
                </MenuItem>
              ))}
            </MenuGroup>
            <MenuSeparator />
            <MenuItem>
              <PlusIcon />
              Create a workspace
            </MenuItem>
          </MenuPopup>
        </Menu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AppHomePage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex h-8 items-center px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
            <LogoMark className="size-5 shrink-0 text-foreground" />
            <span className="ml-2 font-semibold text-foreground group-data-[collapsible=icon]:hidden">
              Studio
            </span>
          </div>
          <WorkspaceSwitcher />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Playground</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {playgroundNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Products</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {productsNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Developers">
                    <CodeIcon />
                    <span>Developers</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Menu>
                <MenuTrigger
                  render={
                    <SidebarMenuButton tooltip="Account" />
                  }
                >
                  <Avatar className="size-5 shrink-0">
                    <AvatarFallback className="text-[10px]">AK</AvatarFallback>
                  </Avatar>
                  <span>Aaron K.</span>
                </MenuTrigger>
                <MenuPopup side="top" align="start" sideOffset={4}>
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
                    <MenuItem>
                      <BellIcon /> Notifications
                    </MenuItem>
                  </MenuGroup>
                  <MenuSeparator />
                  <MenuItem variant="destructive">
                    <LogOutIcon /> Sign out
                  </MenuItem>
                </MenuPopup>
              </Menu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="flex h-svh flex-col">
          {/* Top bar */}
          <header className="flex h-14 items-center gap-3 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm font-medium">Home</span>
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="xs" className="font-normal text-muted-foreground">
                Feedback
              </Button>
              <Button variant="ghost" size="xs" className="font-normal text-muted-foreground">
                Docs
              </Button>
              <Button variant="ghost" size="xs" className="font-normal text-muted-foreground">
                <MessageSquareIcon data-icon="inline-start" />
                Ask
              </Button>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <Tooltip>
                <TooltipTrigger
                  render={<Button variant="ghost" size="icon-xs" />}
                >
                  <BellIcon className="size-4" />
                  <span className="sr-only">Notifications</span>
                </TooltipTrigger>
                <TooltipPopup>Notifications</TooltipPopup>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={<Button variant="ghost" size="icon-xs" />}
                >
                  <SearchIcon className="size-4" />
                  <span className="sr-only">Search</span>
                </TooltipTrigger>
                <TooltipPopup>Search</TooltipPopup>
              </Tooltip>
              <Avatar className="ml-1 size-7">
                <AvatarFallback className="text-[10px]">AK</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Scrollable content */}
          <ScrollArea scrollFade className="flex-1">
            <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
              {/* Announcement banner */}
              <div className="flex items-center justify-between">
                <button className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm transition-colors hover:bg-accent">
                  <Badge size="sm">New</Badge>
                  <span>Introducing Image and Video on Mobile</span>
                  <ChevronRightIcon className="size-3.5 text-muted-foreground" />
                </button>
                <Tooltip>
                  <TooltipTrigger
                    render={<Button variant="ghost" size="icon-xs" />}
                  >
                    <MoonIcon className="size-4" />
                    <span className="sr-only">Toggle dark mode</span>
                  </TooltipTrigger>
                  <TooltipPopup>Toggle dark mode</TooltipPopup>
                </Tooltip>
              </div>

              {/* Greeting */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  My workspace
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                  Good afternoon
                </h1>
              </div>

              {/* Feature cards grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {FEATURE_CARDS.map((card) => (
                  <button
                    key={card.title}
                    className="group flex flex-col items-center gap-3 text-center"
                  >
                    <div
                      className={cn(
                        "flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-br transition-shadow group-hover:shadow-md",
                        card.gradient,
                      )}
                    >
                      <card.icon className="size-8 text-muted-foreground/60" />
                    </div>
                    <span className="text-sm font-medium">{card.title}</span>
                  </button>
                ))}
              </div>

              {/* Two-column discovery section */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Latest from the library */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Latest from the library</h2>
                  <div className="space-y-1">
                    {LIBRARY_VOICES.map((voice) => (
                      <button
                        key={voice.name}
                        className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-accent"
                      >
                        <Avatar className="size-8 shrink-0">
                          <AvatarFallback
                            className={cn("text-[10px] text-white", voice.color)}
                          >
                            {voice.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {voice.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {voice.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button variant="outline" size="xs">
                    Explore Library
                  </Button>
                </div>

                {/* Create or clone a voice */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Create or clone a voice</h2>
                  <div className="space-y-3">
                    {VOICE_ACTIONS.map((action) => (
                      <button
                        key={action.title}
                        className="flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-accent"
                      >
                        <div
                          className={cn(
                            "flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
                            action.gradient,
                          )}
                        >
                          <action.icon className="size-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{action.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design Notes */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Design Notes
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Frame>
                    <FrameHeader>
                      <FrameTitle>Hierarchy</FrameTitle>
                      <FrameDescription>
                        Sidebar navigation with home hub focal point
                      </FrameDescription>
                    </FrameHeader>
                    <FramePanel>
                      <DesignNotes
                        notes={[
                          "Sidebar serves navigation while the content area is the focal hub. The greeting establishes personal context, making the page feel owned rather than generic.",
                          "Feature cards are the primary action targets — equal sizing avoids implying priority between features, letting users self-select based on intent.",
                          "The top bar is deliberately lightweight (text label, not breadcrumb) because the home page is the root — there is no hierarchy to show above it.",
                        ]}
                      />
                    </FramePanel>
                  </Frame>

                  <Frame>
                    <FrameHeader>
                      <FrameTitle>Content Architecture</FrameTitle>
                      <FrameDescription>
                        Progressive density from top to bottom
                      </FrameDescription>
                    </FrameHeader>
                    <FramePanel>
                      <DesignNotes
                        notes={[
                          "Three tiers of content density: sparse greeting at top, dense feature grid in the middle, detailed list/cards at the bottom. This progressive disclosure moves users from scanning to browsing to reading.",
                          "The announcement banner sits above the greeting to capture attention before the user's eye settles into the page hierarchy. Badge + ChevronRight signals interactivity.",
                          "max-w-5xl constrains content width to prevent the home page from feeling sparse on wide screens while maintaining readable line lengths in the discovery section.",
                        ]}
                      />
                    </FramePanel>
                  </Frame>

                  <Frame>
                    <FrameHeader>
                      <FrameTitle>Feature Launcher Grid</FrameTitle>
                      <FrameDescription>
                        Equal-weight entry points to app features
                      </FrameDescription>
                    </FrameHeader>
                    <FramePanel>
                      <DesignNotes
                        notes={[
                          "Cards use aspect-square with gradient backgrounds and centered icons to create visual identity per feature without requiring real thumbnails or screenshots.",
                          "Rounded-2xl containers with subtle gradient fills create visual separation without heavy borders — the color itself differentiates rather than structural lines.",
                          "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 scales the launcher from a 2-wide mobile grid to a full row on desktop, keeping each card large enough to be a comfortable tap target.",
                        ]}
                      />
                    </FramePanel>
                  </Frame>

                  <Frame>
                    <FrameHeader>
                      <FrameTitle>Discovery Section</FrameTitle>
                      <FrameDescription>
                        Browse existing vs. create new workflows
                      </FrameDescription>
                    </FrameHeader>
                    <FramePanel>
                      <DesignNotes
                        notes={[
                          "Two-column split separates \"browsing existing content\" (library list) from \"starting new workflows\" (voice creation cards) — different intents coexist without competing.",
                          "The library list uses Avatar + truncated text in a compact list pattern optimized for scanning many items quickly. Hover bg-accent provides interactive feedback.",
                          "Voice action cards use gradient circle icons (size-12) that are larger and more prominent than the library avatars, signaling that these are primary actions rather than browsable items.",
                        ]}
                      />
                    </FramePanel>
                  </Frame>

                  <Frame>
                    <FrameHeader>
                      <FrameTitle>Responsive Behavior</FrameTitle>
                      <FrameDescription>
                        Adaptation across viewports
                      </FrameDescription>
                    </FrameHeader>
                    <FramePanel>
                      <DesignNotes
                        notes={[
                          "Below the md breakpoint, the sidebar renders as a Sheet overlay via SidebarProvider, freeing full viewport width for the home content.",
                          "Feature grid collapses from 6 columns to 3 to 2, maintaining usable card sizes at each breakpoint. The two-column discovery section stacks vertically on mobile via lg:grid-cols-2.",
                          "Top bar action buttons (Feedback, Docs, Ask) can be hidden on mobile with hidden sm:flex if viewport space is constrained — the sidebar menu provides equivalent access.",
                        ]}
                      />
                    </FramePanel>
                  </Frame>

                  <Frame>
                    <FrameHeader>
                      <FrameTitle>Navigation</FrameTitle>
                      <FrameDescription>
                        Top bar actions complement sidebar
                      </FrameDescription>
                    </FrameHeader>
                    <FramePanel>
                      <DesignNotes
                        notes={[
                          "The top bar mirrors the screenshot's layout: left-aligned page label, right-aligned utility actions. This is a flatter pattern than the breadcrumb used in sub-pages like Image & Video.",
                          "Feedback/Docs/Ask buttons use ghost variant with text-muted-foreground to stay visually subordinate to the page content below.",
                          "The dark mode toggle (MoonIcon) sits at the end of the announcement row rather than the top bar, matching the screenshot's placement and keeping the top bar focused on navigation utilities.",
                        ]}
                      />
                    </FramePanel>
                  </Frame>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
