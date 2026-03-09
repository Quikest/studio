import Link from "next/link"
import {
  ArrowRightIcon,
  BarChart3Icon,
  BookOpenIcon,
  CalendarIcon,
  ColumnsIcon,
  FileTextIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  LayoutGridIcon,
  LayoutIcon,
  ListIcon,
  LockIcon,
  MessageSquareIcon,
  PanelBottomIcon,
  PanelLeftIcon,
  PenLineIcon,
  SparklesIcon,
  TerminalIcon,
  ZapIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Frame,
  FramePanel,
  FrameFooter,
} from "@/components/ui/frame"

function MultiColumnThumbnail() {
  const icons = [BookOpenIcon, MessageSquareIcon, PenLineIcon]
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 p-6">
      {icons.map((Icon, i) => (
        <div
          key={i}
          className="flex h-24 flex-1 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground"
        >
          <Icon className="size-5" />
        </div>
      ))}
    </div>
  )
}

function SidebarDetailThumbnail() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 p-6">
      <div className="flex h-24 w-14 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
        <PanelLeftIcon className="size-5" />
      </div>
      <div className="flex h-24 flex-1 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
        <LayoutIcon className="size-5" />
      </div>
    </div>
  )
}

function MarketingPageThumbnail() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-6">
      <div className="flex h-5 w-full items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
        <span className="text-[10px] font-medium">NAV</span>
      </div>
      <div className="flex h-10 w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed bg-background text-muted-foreground">
        <div className="h-1 w-8 rounded-full bg-muted-foreground/30" />
        <div className="h-1.5 w-16 rounded-full bg-muted-foreground/40" />
      </div>
      <div className="grid w-full grid-cols-5 gap-1">
        {[1, 0, 1, 0, 1, 0, 1, 0, 1, 0].map((filled, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square rounded-sm",
              filled ? "border border-dashed bg-background" : "bg-muted/60",
            )}
          />
        ))}
      </div>
      <div className="flex h-4 w-full items-center justify-between rounded border border-dashed bg-background px-2 text-muted-foreground">
        <span className="text-[7px]">Trusted by</span>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-1 w-4 rounded-full bg-muted-foreground/30" />
          ))}
        </div>
      </div>
      <div className="flex w-full gap-2">
        <div className="flex h-10 flex-1 items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
          <span className="text-[8px] font-medium">01</span>
        </div>
        <div className="flex h-10 flex-1 items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
          <span className="text-[8px] font-medium">02</span>
        </div>
      </div>
    </div>
  )
}

function DashboardGridThumbnail() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-6">
      <div className="flex w-full gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex h-7 flex-1 items-center justify-center rounded border border-dashed bg-background"
          />
        ))}
      </div>
      <div className="flex w-full gap-2">
        <div className="flex h-16 flex-[3] items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
          <BarChart3Icon className="size-5" />
        </div>
        <div className="flex h-16 flex-[2] items-center justify-center rounded border border-dashed bg-background" />
      </div>
      <div className="flex h-10 w-full items-center justify-center rounded border border-dashed bg-background" />
    </div>
  )
}

function WorkspaceThumbnail() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-1.5 p-6">
      {/* Activity bar */}
      <div className="flex h-24 w-6 flex-col items-center justify-center gap-1.5 rounded border border-dashed bg-background text-muted-foreground">
        <FileTextIcon className="size-2.5" />
        <PanelBottomIcon className="size-2.5" />
      </div>
      {/* Explorer */}
      <div className="flex h-24 w-12 items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
        <span className="text-[8px] font-medium [writing-mode:vertical-lr]">
          Explorer
        </span>
      </div>
      {/* Main area */}
      <div className="flex h-24 flex-1 flex-col gap-1.5">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
          <TerminalIcon className="size-5" />
        </div>
        <div className="flex h-6 items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
          <span className="text-[8px] font-medium">Output</span>
        </div>
      </div>
    </div>
  )
}

function MasterDetailThumbnail() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 p-6">
      <div className="flex h-24 w-24 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed bg-background text-muted-foreground">
        <ListIcon className="size-5" />
      </div>
      <div className="flex h-24 flex-[2] items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
        <InboxIcon className="size-5" />
      </div>
    </div>
  )
}

function CommandCenterThumbnail() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 p-6">
      <div className="flex h-24 w-8 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed bg-background text-muted-foreground">
        <div className="size-2 rounded-full bg-muted-foreground/30" />
        <div className="size-2 rounded-full bg-muted-foreground/30" />
        <div className="size-2 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="flex h-24 flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-background text-muted-foreground">
        <ZapIcon className="size-4" />
        <div className="h-2 w-20 rounded-full bg-muted-foreground/20" />
      </div>
    </div>
  )
}

function MasonryGalleryThumbnail() {
  const heights = ["h-12", "h-8", "h-10", "h-14", "h-9", "h-11", "h-7", "h-13"]
  return (
    <div className="flex min-h-[200px] items-end justify-center gap-2 p-6">
      {[0, 1, 2, 3].map((col) => (
        <div key={col} className="flex flex-1 flex-col gap-2">
          {[0, 1].map((row) => (
            <div
              key={row}
              className={cn(
                "rounded border border-dashed bg-background",
                heights[col * 2 + row],
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function ImageGeneratorThumbnail() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 p-6">
      <div className="flex h-24 w-10 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
        <PanelLeftIcon className="size-4" />
      </div>
      <div className="flex h-24 flex-1 flex-col gap-1.5">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
          <LayoutGridIcon className="size-5" />
        </div>
        <div className="flex h-6 items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
          <span className="text-[8px] font-medium">Prompt</span>
        </div>
      </div>
    </div>
  )
}

function LoginThumbnail() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 p-6">
      <div className="flex h-24 flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-background text-muted-foreground">
        <div className="h-1 w-10 rounded-full bg-muted-foreground/40" />
        <div className="h-1 w-14 rounded-full bg-muted-foreground/20" />
        <div className="mt-1 flex w-14 flex-col gap-1.5">
          <div className="h-3 w-full rounded-sm border border-dashed" />
          <div className="h-3 w-full rounded-sm border border-dashed" />
          <div className="h-3 w-full rounded bg-muted-foreground/30" />
        </div>
      </div>
      <div className="flex h-24 flex-1 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground">
        <ImageIcon className="size-5 opacity-40" />
      </div>
    </div>
  )
}

function NotesDashboardThumbnail() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 p-6">
      <div className="flex h-24 w-14 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed bg-background text-muted-foreground">
        <PanelLeftIcon className="size-4" />
        <div className="flex flex-col gap-1">
          <div className="h-0.5 w-6 rounded-full bg-muted-foreground/30" />
          <div className="h-0.5 w-5 rounded-full bg-muted-foreground/20" />
          <div className="h-0.5 w-6 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
      <div className="flex h-24 flex-1 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
        <FileTextIcon className="size-5" />
      </div>
      <div className="flex h-24 w-16 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed bg-background text-muted-foreground">
        <CalendarIcon className="size-4" />
        <div className="flex flex-col gap-1">
          <div className="h-0.5 w-7 rounded-full bg-muted-foreground/30" />
          <div className="h-0.5 w-5 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  )
}

function AppHomeThumbnail() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3 p-6">
      <div className="flex h-24 w-10 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground">
        <PanelLeftIcon className="size-4" />
      </div>
      <div className="flex h-24 flex-1 flex-col gap-1.5">
        <div className="flex h-4 items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>
        <div className="flex h-5 items-center gap-1 px-1">
          <div className="h-1.5 w-12 rounded-full bg-muted-foreground/40" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-1 px-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square flex-1 rounded-sm border border-dashed bg-background"
            />
          ))}
        </div>
        <div className="flex gap-1.5 px-1">
          <div className="flex h-8 flex-1 items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
            <ListIcon className="size-3" />
          </div>
          <div className="flex h-8 flex-1 items-center justify-center rounded border border-dashed bg-background text-muted-foreground">
            <LayoutGridIcon className="size-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

const templates = [
  {
    slug: "multi-column-expandable",
    title: "Multi-Column Expandable",
    description:
      "A 3-panel layout with collapsible panels and preset layout modes. Inspired by NotebookLM\u2019s adaptive panel system.",
    icon: ColumnsIcon,
    thumbnail: MultiColumnThumbnail,
  },
  {
    slug: "sidebar-detail",
    title: "Sidebar + Detail",
    description:
      "A collapsible sidebar with grouped navigation alongside a main content area. Icon-only collapse, tooltips, and mobile Sheet.",
    icon: PanelLeftIcon,
    thumbnail: SidebarDetailThumbnail,
  },
  {
    slug: "master-detail",
    title: "Master-Detail",
    description:
      "A list/detail split with item selection, collapsible list pane, and mobile stack navigation. Common in email, tasks, and CRM apps.",
    icon: ListIcon,
    thumbnail: MasterDetailThumbnail,
  },
  {
    slug: "marketing-page",
    title: "Marketing Page",
    description:
      "A scrolling landing page with avatar mosaic hero, social proof logo strip, numbered key benefits, features grid, and stats. Cal.com-inspired layout.",
    icon: SparklesIcon,
    thumbnail: MarketingPageThumbnail,
  },
  {
    slug: "dashboard-grid",
    title: "Dashboard Grid",
    description:
      "A grid-based dashboard with KPI cards, chart, activity feed, and data table. Time range filter drives all metrics.",
    icon: BarChart3Icon,
    thumbnail: DashboardGridThumbnail,
  },
  {
    slug: "workspace",
    title: "Workspace",
    description:
      "An IDE-style compound layout with activity bar, collapsible explorer, editor tabs, bottom panel, and status bar. Both axes split.",
    icon: TerminalIcon,
    thumbnail: WorkspaceThumbnail,
  },
  {
    slug: "command-center",
    title: "Command Center",
    description:
      "An icon rail with a centered, input-first workspace. Maximizes focus on a single primary action with minimal persistent navigation.",
    icon: ZapIcon,
    thumbnail: CommandCenterThumbnail,
  },
  {
    slug: "masonry-gallery",
    title: "Masonry Gallery",
    description:
      "A Pinterest-style masonry layout for content-rich visual discovery. Category filtering, hover actions, and CSS-columns-based responsive grid.",
    icon: LayoutGridIcon,
    thumbnail: MasonryGalleryThumbnail,
  },
  {
    slug: "image-generator",
    title: "Image Generator",
    description:
      "A sidebar + gallery layout with a sticky bottom prompt bar for AI generation. Combines navigation, content discovery, and input-first creation.",
    icon: ImageIcon,
    thumbnail: ImageGeneratorThumbnail,
  },
  {
    slug: "login",
    title: "Login",
    description:
      "A split-screen login page with form on the left and decorative media panel on the right. Responsive single-column on mobile.",
    icon: LockIcon,
    thumbnail: LoginThumbnail,
  },
  {
    slug: "notes-dashboard",
    title: "Notes Dashboard",
    description:
      "A Notion-style workspace with navigation sidebar, content area, and calendar panel. Dual-sidebar layout with hierarchical nav and contextual tools.",
    icon: BookOpenIcon,
    thumbnail: NotesDashboardThumbnail,
  },
  {
    slug: "app-home",
    title: "App Home",
    description:
      "A sidebar + scrollable home hub with feature launcher grid, content discovery, and announcements. App launchpad for SaaS dashboards.",
    icon: HomeIcon,
    thumbnail: AppHomeThumbnail,
  },
]

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Templates
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Full-page layout patterns you can use as starting points. Each
          template demonstrates a different spatial arrangement for
          multi-panel interfaces.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template) => (
          <Link
            key={template.slug}
            href={`/templates/${template.slug}`}
            className="group"
          >
            <Frame className="transition-shadow group-hover:shadow-md">
              <FramePanel className="p-0">
                <template.thumbnail />
              </FramePanel>
              <FrameFooter className="flex items-center px-4 py-2.5">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-sm">
                    <template.icon className="size-3.5 text-muted-foreground" />
                    <span className="font-medium">{template.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
                  View
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </FrameFooter>
            </Frame>
          </Link>
        ))}
      </div>
    </div>
  )
}
