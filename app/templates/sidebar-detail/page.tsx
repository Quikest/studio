"use client"

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  HelpCircleIcon,
  HomeIcon,
  LayoutIcon,
  MailIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FramePanel,
} from "@/components/ui/frame"
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

const mainNav = [
  { title: "Home", icon: HomeIcon, isActive: true },
  { title: "Inbox", icon: MailIcon, badge: "3" },
  { title: "Documents", icon: FileTextIcon },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Notifications", icon: BellIcon },
]

const secondaryNav = [
  { title: "Settings", icon: SettingsIcon },
  { title: "Help", icon: HelpCircleIcon },
]

export default function SidebarDetailPage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="App Name">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">App Name</span>
                  <span className="text-xs text-muted-foreground">
                    Workspace
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
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
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondaryNav.map((item) => (
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
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="User">
                <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  U
                </div>
                <span>User Name</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <h1 className="text-sm font-semibold">Dashboard</h1>
        </header>

        <div className="flex-1 space-y-6 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Frame>
              <FrameHeader>
                <FrameTitle>Hierarchy</FrameTitle>
                <FrameDescription>
                  Layout structure and spatial roles
                </FrameDescription>
              </FrameHeader>
              <FramePanel>
                <DesignNotes
                  notes={[
                    "Hierarchical layout \u2014 the sidebar serves the content area. Navigation is secondary to the workspace.",
                    "collapsible=\"icon\" shrinks the sidebar to 3rem width, maintaining spatial memory for quick re-expansion.",
                    "SidebarInset automatically adjusts margins when the sidebar toggles \u2014 no manual CSS calculations needed.",
                  ]}
                />
              </FramePanel>
            </Frame>

            <Frame>
              <FrameHeader>
                <FrameTitle>Navigation</FrameTitle>
                <FrameDescription>
                  Grouping, badges, and discoverability
                </FrameDescription>
              </FrameHeader>
              <FramePanel>
                <DesignNotes
                  notes={[
                    "Grouped navigation (SidebarGroup + SidebarGroupLabel) creates scannable sections separated by purpose.",
                    "SidebarMenuBadge surfaces notification counts inline without interrupting workflow.",
                    "Tooltip affordance: icon-only collapsed state shows tooltips on hover, maintaining label discoverability.",
                  ]}
                />
              </FramePanel>
            </Frame>

            <Frame>
              <FrameHeader>
                <FrameTitle>Responsiveness</FrameTitle>
                <FrameDescription>
                  Adaptation across viewports
                </FrameDescription>
              </FrameHeader>
              <FramePanel>
                <DesignNotes
                  notes={[
                    "Mobile Sheet adaptation: below the md breakpoint, the sidebar renders as a Sheet overlay with full navigation.",
                    "Keyboard shortcut (Cmd+B) via SidebarRail enables power-user sidebar toggle.",
                    "SidebarRail also provides a visual drag handle at the sidebar edge for click-to-toggle.",
                  ]}
                />
              </FramePanel>
            </Frame>
          </div>

          <Frame>
            <FrameHeader>
              <FrameTitle>Content Area</FrameTitle>
              <FrameDescription>
                Layout and container decisions
              </FrameDescription>
            </FrameHeader>
            <FramePanel>
              <DesignNotes
                notes={[
                  "Content grid follows mobile-first responsive pattern: grid-cols-1 \u2192 md:grid-cols-2 \u2192 lg:grid-cols-3.",
                  "Frame as section container provides consistent visual grouping with the muted \u2192 card background layering.",
                  "Content area expands fluidly as the sidebar transitions between expanded and collapsed states.",
                  "The top bar pairs SidebarTrigger with a vertical Separator and page title \u2014 a common shell header pattern.",
                ]}
              />
            </FramePanel>
          </Frame>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
