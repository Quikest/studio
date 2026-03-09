"use client"

import * as React from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3Icon,
  ClockIcon,
  CreditCardIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FramePanel,
} from "@/components/ui/frame"
import { ScrollArea } from "@/components/ui/scroll-area"

type TimeRange = "7d" | "30d" | "90d"

interface KpiMetric {
  label: string
  value: string
  change: number
  icon: React.ElementType
}

const KPI_DATA: Record<TimeRange, KpiMetric[]> = {
  "7d": [
    { label: "Revenue", value: "$12,450", change: 8.2, icon: DollarSignIcon },
    { label: "Users", value: "1,243", change: 3.1, icon: UsersIcon },
    { label: "Orders", value: "342", change: -2.4, icon: ShoppingCartIcon },
    { label: "Conversion", value: "3.2%", change: 0.8, icon: TrendingUpIcon },
  ],
  "30d": [
    { label: "Revenue", value: "$48,920", change: 12.5, icon: DollarSignIcon },
    { label: "Users", value: "4,891", change: 7.3, icon: UsersIcon },
    { label: "Orders", value: "1,284", change: 4.1, icon: ShoppingCartIcon },
    { label: "Conversion", value: "3.8%", change: 1.2, icon: TrendingUpIcon },
  ],
  "90d": [
    {
      label: "Revenue",
      value: "$142,300",
      change: 18.7,
      icon: DollarSignIcon,
    },
    { label: "Users", value: "12,450", change: 15.2, icon: UsersIcon },
    { label: "Orders", value: "3,891", change: 9.8, icon: ShoppingCartIcon },
    { label: "Conversion", value: "4.1%", change: 2.3, icon: TrendingUpIcon },
  ],
}

const CHART_BARS = [65, 40, 80, 55, 90, 72, 45, 88, 60, 75, 50, 85]
const CHART_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const ACTIVITY_ITEMS = [
  { text: "New user registration", time: "2 min ago", icon: UsersIcon },
  {
    text: "Payment received — $249",
    time: "15 min ago",
    icon: CreditCardIcon,
  },
  {
    text: "Order #1284 completed",
    time: "1 hr ago",
    icon: ShoppingCartIcon,
  },
  {
    text: "Revenue milestone reached",
    time: "3 hrs ago",
    icon: TrendingUpIcon,
  },
  { text: "New user registration", time: "5 hrs ago", icon: UsersIcon },
]

const TABLE_ROWS = [
  { product: "Pro Plan", revenue: "$24,500", units: 490, growth: 12.3 },
  { product: "Team Plan", revenue: "$18,200", units: 364, growth: 8.7 },
  { product: "Enterprise", revenue: "$45,000", units: 90, growth: 22.1 },
  { product: "Starter", revenue: "$6,800", units: 680, growth: -3.2 },
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

export default function DashboardGridPage() {
  const [timeRange, setTimeRange] = React.useState<TimeRange>("30d")
  const kpis = KPI_DATA[timeRange]

  return (
    <div className="flex h-svh flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <BarChart3Icon className="size-4 text-muted-foreground" />
          <h1 className="text-sm font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center rounded-lg bg-muted p-0.5">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                timeRange === range
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      {/* Scrollable grid content */}
      <ScrollArea scrollFade className="flex-1">
        <div className="space-y-4 p-4 sm:p-6">
          {/* KPI Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon
              const isPositive = kpi.change > 0
              return (
                <Frame key={kpi.label}>
                  <FramePanel>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {kpi.label}
                        </p>
                        <p className="text-2xl font-bold tracking-tight">
                          {kpi.value}
                        </p>
                      </div>
                      <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Icon className="size-4" />
                      </div>
                    </div>
                    <div
                      className={cn(
                        "mt-2 flex items-center gap-1 text-xs font-medium",
                        isPositive ? "text-success" : "text-destructive",
                      )}
                    >
                      {isPositive ? (
                        <ArrowUpIcon className="size-3" />
                      ) : (
                        <ArrowDownIcon className="size-3" />
                      )}
                      <span>{Math.abs(kpi.change)}%</span>
                      <span className="font-normal text-muted-foreground">
                        vs prior period
                      </span>
                    </div>
                  </FramePanel>
                </Frame>
              )
            })}
          </div>

          {/* Chart + Activity Feed */}
          <div className="grid gap-4 lg:grid-cols-5">
            <Frame className="lg:col-span-3">
              <FrameHeader>
                <FrameTitle>Revenue Over Time</FrameTitle>
              </FrameHeader>
              <FramePanel>
                <div className="flex h-48 items-end gap-1.5 sm:gap-2">
                  {CHART_BARS.map((value, i) => (
                    <div
                      key={i}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <div
                        className="w-full rounded-t bg-primary/80 transition-all duration-300"
                        style={{ height: `${value}%` }}
                      />
                      <span className="hidden text-[10px] text-muted-foreground sm:block">
                        {CHART_LABELS[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </FramePanel>
            </Frame>

            <Frame className="lg:col-span-2">
              <FrameHeader>
                <FrameTitle>Recent Activity</FrameTitle>
              </FrameHeader>
              <FramePanel className="p-0">
                <ul>
                  {ACTIVITY_ITEMS.map((item, i) => (
                    <li
                      key={i}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3",
                        i < ACTIVITY_ITEMS.length - 1 && "border-b",
                      )}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                        <item.icon className="size-3.5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{item.text}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </FramePanel>
            </Frame>
          </div>

          {/* Data Table */}
          <Frame>
            <FrameHeader>
              <FrameTitle>Products</FrameTitle>
              <FrameDescription>
                Revenue breakdown by product tier
              </FrameDescription>
            </FrameHeader>
            <FramePanel className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="px-4 py-2.5 font-medium text-muted-foreground">
                        Product
                      </th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                        Revenue
                      </th>
                      <th className="hidden px-4 py-2.5 text-right font-medium text-muted-foreground sm:table-cell">
                        Units
                      </th>
                      <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">
                        Growth
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((row) => (
                      <tr
                        key={row.product}
                        className="border-b last:border-0"
                      >
                        <td className="px-4 py-2.5 font-medium">
                          {row.product}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums">
                          {row.revenue}
                        </td>
                        <td className="hidden px-4 py-2.5 text-right tabular-nums sm:table-cell">
                          {row.units}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-2.5 text-right tabular-nums",
                            row.growth > 0
                              ? "text-success"
                              : "text-destructive",
                          )}
                        >
                          {row.growth > 0 ? "+" : ""}
                          {row.growth}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FramePanel>
          </Frame>

          {/* Design Notes */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Design Notes
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Frame>
                <FrameHeader>
                  <FrameTitle>Grid Strategy</FrameTitle>
                  <FrameDescription>
                    Layout composition and spans
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "KPI cards use a 4-column grid (sm:2, lg:4) — metrics should scan horizontally like a scoreboard, not stack vertically.",
                      "Chart and activity split at 3:2 ratio (lg:col-span-3 / lg:col-span-2) reflecting the chart's primary role vs. the feed's supplementary one.",
                      "The table spans full width at all breakpoints — tabular data needs horizontal room and shouldn't compete side-by-side.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Information Density</FrameTitle>
                  <FrameDescription>
                    Card hierarchy and data presentation
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "KPI cards pair a large value (text-2xl font-bold) with a small label and change indicator — the number is the content, everything else is context.",
                      "Change indicators use semantic colors (success/destructive) with directional arrows so meaning is conveyed by both color and shape.",
                      "The activity feed uses icon + text + timestamp triplets — enough context to understand each event without clicking through.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Interactivity</FrameTitle>
                  <FrameDescription>
                    Time range and state management
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "The segmented time range control uses the same pattern as the multi-column template's presets — visual consistency across templates.",
                      "All KPI values derive from the selected time range via a single state variable, avoiding per-card state duplication.",
                      "The toggle sits in the header bar (not floating or per-card) because the time range is a global filter affecting the entire dashboard.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Responsiveness</FrameTitle>
                  <FrameDescription>
                    Grid reflow strategy
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "KPIs reflow from 1 → 2 → 4 columns, not 1 → 3 → 4. Two columns at the sm breakpoint keeps KPI pairs visually balanced.",
                      "Chart and activity stack vertically below lg — both need enough width to be useful, so side-by-side only works on wide viewports.",
                      "The table hides the Units column below sm (hidden sm:table-cell) to prevent horizontal scroll while keeping the most important columns.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Containers</FrameTitle>
                  <FrameDescription>
                    Frame usage and scroll behavior
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Every dashboard widget is a Frame — consistent borders and the muted → card background layering groups related content visually.",
                      "The page uses flex-col with ScrollArea on the content area, keeping the header fixed while the grid scrolls.",
                      "No max-width container — dashboards should fill available width so grid cards can breathe on wide displays.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Data Tables</FrameTitle>
                  <FrameDescription>
                    Table patterns within Frame
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "FramePanel with p-0 lets the table control its own padding, aligning cell content flush with the Frame edges.",
                      "Tabular numbers (tabular-nums) ensure columns align properly — proportional digits cause visual jitter in numeric columns.",
                      "overflow-x-auto on the table container enables horizontal scroll as a last resort, preferable to text wrapping in data cells.",
                    ]}
                  />
                </FramePanel>
              </Frame>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
