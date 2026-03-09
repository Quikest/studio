"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  AudioLinesIcon,
  BellIcon,
  BookOpenIcon,
  BrushIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  CirclePlayIcon,
  CodeIcon,
  CreditCardIcon,
  FileAudioIcon,
  FilmIcon,
  FrameIcon,
  GlobeIcon,
  HomeIcon,
  ImageIcon,
  LayoutTemplateIcon,
  LogOutIcon,
  MicIcon,
  MonitorIcon,
  MusicIcon,
  PlayIcon,
  PlusIcon,
  RatioIcon,
  RectangleHorizontalIcon,
  SearchIcon,
  SettingsIcon,
  SpeechIcon,
  UserIcon,
  VideoIcon,
  Volume2Icon,
  VolumeOffIcon,
  WandSparklesIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
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
  { title: "Home", icon: HomeIcon },
  { title: "Voices", icon: MicIcon },
  { title: "Files", icon: FileAudioIcon },
]

const playgroundNav = [
  { title: "Text to Speech", icon: SpeechIcon },
  { title: "Voice Changer", icon: WandSparklesIcon },
  { title: "Voice Isolator", icon: AudioLinesIcon },
  { title: "Sound Effects", icon: Volume2Icon },
  { title: "Music", icon: MusicIcon },
  { title: "Image & Video", icon: ImageIcon, isActive: true },
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

interface GalleryItem {
  id: number
  height: string
  isVideo: boolean
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, height: "h-48", isVideo: false },
  { id: 2, height: "h-56", isVideo: false },
  { id: 3, height: "h-40", isVideo: false },
  { id: 4, height: "h-64", isVideo: true },
  { id: 5, height: "h-44", isVideo: false },
  { id: 6, height: "h-52", isVideo: true },
  { id: 7, height: "h-48", isVideo: false },
  { id: 8, height: "h-56", isVideo: false },
  { id: 9, height: "h-36", isVideo: true },
  { id: 10, height: "h-48", isVideo: false },
  { id: 11, height: "h-44", isVideo: false },
  { id: 12, height: "h-60", isVideo: true },
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

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-xs/5">
      <div className={cn("relative w-full bg-muted", item.height)}>
        <span className="absolute inset-x-0 top-3 text-center font-mono text-[10px] text-muted-foreground">
          {item.isVideo ? "Video" : "Image"}
        </span>
        {item.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-black/10 text-muted-foreground">
              <PlayIcon className="size-4 fill-current" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PromptBar() {
  const [mode, setMode] = React.useState<"image" | "video">("video")
  const [soundEnabled, setSoundEnabled] = React.useState(false)

  return (
    <div className="border-t bg-background p-3">
      <Frame>
        <FramePanel className="space-y-2 p-3">
          {/* Top row: frame buttons + mode toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="xs">
                <FrameIcon data-icon="inline-start" />
                Start frame
              </Button>
              <Button variant="outline" size="xs">
                <FrameIcon data-icon="inline-start" />
                End frame
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant={mode === "image" ? "secondary" : "ghost"}
                      size="icon-xs"
                      onClick={() => setMode("image")}
                    />
                  }
                >
                  <ImageIcon className="size-3.5" />
                  <span className="sr-only">Image mode</span>
                </TooltipTrigger>
                <TooltipPopup>Image</TooltipPopup>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant={mode === "video" ? "secondary" : "ghost"}
                      size="icon-xs"
                      onClick={() => setMode("video")}
                    />
                  }
                >
                  <VideoIcon className="size-3.5" />
                  <span className="sr-only">Video mode</span>
                </TooltipTrigger>
                <TooltipPopup>Video</TooltipPopup>
              </Tooltip>
            </div>
          </div>

          {/* Prompt input */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Describe your video or reference by using @..."
              className="flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
            <Button size="icon" className="shrink-0 rounded-full">
              <ArrowUpIcon />
              <span className="sr-only">Generate</span>
            </Button>
          </div>

          {/* Settings row */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Button variant="ghost" size="xs" className="gap-1 font-normal">
              <WandSparklesIcon className="size-3" />
              Veo 3.1 Fast
            </Button>
            <Separator orientation="vertical" className="mx-0.5 h-4" />
            <Button variant="ghost" size="xs" className="gap-1 font-normal">
              <RectangleHorizontalIcon className="size-3" />
              16:9
            </Button>
            <Button variant="ghost" size="xs" className="gap-1 font-normal">
              <RatioIcon className="size-3" />
              720p
            </Button>
            <Button variant="ghost" size="xs" className="gap-1 font-normal">
              <CirclePlayIcon className="size-3" />
              4s
            </Button>
            <Separator orientation="vertical" className="mx-0.5 h-4" />
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  />
                }
              >
                {soundEnabled ? (
                  <Volume2Icon className="size-3.5" />
                ) : (
                  <VolumeOffIcon className="size-3.5" />
                )}
                <span className="sr-only">
                  {soundEnabled ? "Disable sound" : "Enable sound"}
                </span>
              </TooltipTrigger>
              <TooltipPopup>
                {soundEnabled ? "Sound on" : "Sound off"}
              </TooltipPopup>
            </Tooltip>
            <Button variant="ghost" size="xs" className="gap-1 font-normal">
              <BrushIcon className="size-3" />1
            </Button>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-muted-foreground">27 left</span>
            </div>
          </div>
        </FramePanel>
      </Frame>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ImageGeneratorPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredItems = React.useMemo(() => {
    return GALLERY_ITEMS
  }, [])

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
          {/* Main nav */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNav.map((item) => (
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

          {/* Playground */}
          <SidebarGroup>
            <SidebarGroupLabel>Playground</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {playgroundNav.map((item) => (
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

          {/* Products */}
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

          {/* Developers */}
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
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Image & Video</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Explore</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Content area */}
          <Tabs defaultValue="explore" className="flex min-h-0 flex-1 flex-col">
            <div className="space-y-4 px-4 pt-6 sm:px-6">
              {/* Page title */}
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">
                  Image & Video
                </h1>
                <Badge variant="outline" size="sm">
                  Beta
                </Badge>
              </div>

              {/* Tabs */}
              <TabsList variant="underline">
                <TabsTab value="explore">Explore</TabsTab>
                <TabsTab value="history">History</TabsTab>
              </TabsList>

              {/* Search */}
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search images and videos"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-9"
                />
              </div>
            </div>

            {/* Explore tab */}
            <TabsPanel value="explore" className="min-h-0 flex-1">
              <ScrollArea scrollFade className="h-full">
                <div className="p-4 sm:p-6">
                  <div className="columns-1 gap-3 sm:columns-2 md:columns-3 lg:columns-4">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="mb-3 break-inside-avoid">
                        <GalleryCard item={item} />
                      </div>
                    ))}
                  </div>

                  {/* Design Notes */}
                  <div className="mt-10 space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Design Notes
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Frame>
                        <FrameHeader>
                          <FrameTitle>Hierarchy</FrameTitle>
                          <FrameDescription>
                            Sidebar, gallery, and prompt roles
                          </FrameDescription>
                        </FrameHeader>
                        <FramePanel>
                          <DesignNotes
                            notes={[
                              "Three spatial regions with distinct roles: sidebar for navigation, scrollable gallery for discovery, and sticky prompt bar for creation. The sidebar is hierarchical — it serves the content area.",
                              "SidebarProvider + Sidebar with collapsible=\"icon\" enables icon-only collapse while maintaining spatial memory of the nav structure.",
                              "SidebarInset auto-adjusts margins when the sidebar toggles, keeping the gallery and prompt bar fluid without manual width calculations.",
                            ]}
                          />
                        </FramePanel>
                      </Frame>

                      <Frame>
                        <FrameHeader>
                          <FrameTitle>Gallery Discovery</FrameTitle>
                          <FrameDescription>
                            Masonry layout with tabs and search
                          </FrameDescription>
                        </FrameHeader>
                        <FramePanel>
                          <DesignNotes
                            notes={[
                              "CSS columns (columns-1 sm:columns-2 md:columns-3 lg:columns-4) create the masonry effect, maximizing content density without fixed row heights.",
                              "Underline-variant tabs (Explore / History) sit below the title, separating content modes without the visual weight of pill-style tabs.",
                              "Video items show a centered play icon overlay on a frosted backdrop, differentiating them from static images at a glance.",
                            ]}
                          />
                        </FramePanel>
                      </Frame>

                      <Frame>
                        <FrameHeader>
                          <FrameTitle>Prompt-First Creation</FrameTitle>
                          <FrameDescription>
                            Sticky bottom bar for generation
                          </FrameDescription>
                        </FrameHeader>
                        <FramePanel>
                          <DesignNotes
                            notes={[
                              "The prompt bar anchors to the bottom of the viewport, always visible regardless of scroll position. This keeps the primary action (generation) permanently accessible.",
                              "Frame wraps the prompt area to maintain consistent container styling with the muted-to-card background layering system.",
                              "Settings (model, aspect ratio, resolution, duration) use ghost-variant xs buttons, keeping them compact and subordinate to the prompt input.",
                              "Image/Video mode toggle uses icon-only buttons with tooltips, mirroring the source layout's compact toggle pattern.",
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
                              "Below the md breakpoint, the sidebar renders as a Sheet overlay via SidebarProvider, freeing full viewport width for the gallery.",
                              "Gallery columns scale from 1 on mobile to 4 on large screens, maintaining ~240-280px card widths at each breakpoint.",
                              "The prompt bar remains sticky at all viewport sizes — on mobile the settings row may wrap but the input and submit button stay accessible.",
                            ]}
                          />
                        </FramePanel>
                      </Frame>

                      <Frame>
                        <FrameHeader>
                          <FrameTitle>Navigation</FrameTitle>
                          <FrameDescription>
                            Grouped sidebar with badges
                          </FrameDescription>
                        </FrameHeader>
                        <FramePanel>
                          <DesignNotes
                            notes={[
                              "SidebarGroup with SidebarGroupLabel creates scannable sections (Playground, Products) separated by purpose, matching the source layout's nav hierarchy.",
                              "SidebarMenuBadge surfaces status labels (\"New\") inline without interrupting the nav flow.",
                              "The active item (Image & Video) uses isActive styling to anchor the user's location within the grouped navigation.",
                            ]}
                          />
                        </FramePanel>
                      </Frame>

                      <Frame>
                        <FrameHeader>
                          <FrameTitle>Content Area Structure</FrameTitle>
                          <FrameDescription>
                            Vertical stacking of header, tabs, search, gallery
                          </FrameDescription>
                        </FrameHeader>
                        <FramePanel>
                          <DesignNotes
                            notes={[
                              "The content area uses flex-col with the gallery in a ScrollArea (flex-1) to fill remaining height, while the header, tabs, and search remain fixed above.",
                              "Breadcrumb in the top bar provides wayfinding context (Image & Video > Explore) without consuming vertical space in the content area.",
                              "The Beta badge uses variant=\"outline\" for subtle emphasis — it signals status without competing with the page title for visual weight.",
                            ]}
                          />
                        </FramePanel>
                      </Frame>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsPanel>

            {/* History tab */}
            <TabsPanel value="history" className="min-h-0 flex-1">
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <SearchIcon className="mb-3 size-8 text-muted-foreground/40" />
                <p className="text-sm font-medium">No history yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Generated images and videos will appear here.
                </p>
              </div>
            </TabsPanel>

            {/* Prompt bar */}
            <PromptBar />
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
