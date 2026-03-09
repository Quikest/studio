"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  BarChartIcon,
  ClockIcon,
  GlobeIcon,
  LayersIcon,
  MonitorIcon,
  ShieldIcon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react"

import { LogoMark, LogoWordmark } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FramePanel,
} from "@/components/ui/frame"

const NAV_ITEMS = ["Benefits", "Features", "Stats", "Notes"]

const AVATAR_GRID: (string | null)[][] = [
  [null, "1", null, null, "5", null, "7", null, "9", null, null],
  ["11", null, "13", null, "15", "16", null, "18", null, "20", "21"],
  [null, "23", null, "25", null, "27", "28", null, "30", "31", null],
  ["33", null, null, "36", null, null, "39", null, null, "42", null],
]

const LOGOS = ["Vercel", "Supabase", "Linear", "Resend", "Loom", "Framer"]

const BENEFITS = [
  {
    number: "01",
    title: "Better team meetings",
    description:
      "Simplify team collaboration across time zones with features like dynamic team meetings that automatically handle availability. Support instant meetings, screen sharing, and optional recordings to keep projects on track.",
    icon: VideoIcon,
    mockupTitle: "Instant Meeting",
    mockupUrl: "app/instant-meeting",
  },
  {
    number: "02",
    title: "Seamless integrations",
    description:
      "Connect with the tools your team already uses. From calendars and video conferencing to CRMs and project management — everything syncs automatically so nothing falls through the cracks.",
    icon: GlobeIcon,
    mockupTitle: "Integrations",
    mockupUrl: "app/integrations",
  },
  {
    number: "03",
    title: "Enterprise-grade analytics",
    description:
      "Gain insights into team productivity with detailed analytics dashboards. Track meeting frequency, response times, and collaboration patterns to optimize how your team works together.",
    icon: MonitorIcon,
    mockupTitle: "Analytics",
    mockupUrl: "app/analytics",
  },
]

const FEATURES = [
  {
    icon: ZapIcon,
    title: "Lightning Fast",
    description:
      "Optimized performance with sub-second load times and instant interactions across every device.",
  },
  {
    icon: ShieldIcon,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption and role-based access controls built in.",
  },
  {
    icon: LayersIcon,
    title: "Composable",
    description:
      "Mix and match components to build exactly what you need — nothing more, nothing less.",
  },
]

const STATS = [
  { value: "99.9%", label: "Uptime SLA", icon: BarChartIcon },
  { value: "50ms", label: "Avg Response", icon: ClockIcon },
  { value: "10K+", label: "Active Teams", icon: UsersIcon },
  { value: "4.9/5", label: "User Rating", icon: SparklesIcon },
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

function AvatarGridCell({ imgId }: { imgId: string | null }) {
  if (!imgId) {
    return <div className="aspect-square rounded-xl bg-muted/60" />
  }
  return (
    <div className="aspect-square overflow-hidden rounded-xl bg-muted">
      <img
        src={`https://i.pravatar.cc/150?img=${imgId}`}
        alt=""
        className="size-full object-cover"
      />
    </div>
  )
}

function BrowserMockup({
  title,
  url,
  icon: Icon,
}: {
  title: string
  url: string
  icon: React.ElementType
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="flex items-center gap-2 border-b px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-muted-foreground/20" />
          <div className="size-2.5 rounded-full bg-muted-foreground/20" />
          <div className="size-2.5 rounded-full bg-muted-foreground/20" />
        </div>
        <div className="mx-auto rounded-md bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
          {url}
        </div>
      </div>
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-muted/20 p-8">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-6" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </div>
    </div>
  )
}

export default function MarketingPageTemplate() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="h-svh overflow-y-auto">
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="-ml-2.5 gap-2.5">
              <LogoMark className="size-5" />
              <LogoWordmark className="text-base" />
            </Button>
            <nav className="hidden items-center md:flex">
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => scrollTo(item.toLowerCase())}
                >
                  {item}
                </Button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Sign in
            </Button>
            <Button size="sm">
              Get started
              <ArrowRightIcon data-icon="inline-start" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="overflow-hidden px-4 pb-0 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6">
              We now offer a 14-day free trial
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Simple scheduling for teams
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Give your team the gift of better scheduling. Built for
              collaboration and efficiency.
            </p>
            <div className="mt-8">
              <Button size="lg">
                Get started free
                <ArrowRightIcon data-icon="inline-start" />
              </Button>
            </div>
          </div>

          {/* Avatar Mosaic Grid */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-7 gap-3 sm:grid-cols-11">
              {AVATAR_GRID.flat().map((cell, i) => (
                <AvatarGridCell key={i} imgId={cell} />
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="border-y bg-muted/30 py-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <p className="shrink-0 text-sm text-muted-foreground">
                Trusted by fast-growing
                <br className="hidden sm:block" />
                {" "}companies around the world
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                {LOGOS.map((name) => (
                  <span
                    key={name}
                    className="text-base font-semibold tracking-tight text-foreground/70 sm:text-lg"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section id="benefits" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-4">
                <SparklesIcon className="size-3" />
                Key benefits
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How it works for teams
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Discover how you can streamline scheduling and collaboration for
                seamless teamwork by using our product.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  Get started free
                  <ArrowRightIcon data-icon="inline-start" />
                </Button>
                <Button variant="outline" size="lg">
                  Talk to sales
                  <ArrowRightIcon data-icon="inline-start" />
                </Button>
              </div>
            </div>

            <div className="space-y-12">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={benefit.number}
                  className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-12 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <BrowserMockup
                      title={benefit.mockupTitle}
                      url={benefit.mockupUrl}
                      icon={benefit.icon}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <Badge
                      variant="outline"
                      size="sm"
                      className="w-fit tabular-nums"
                    >
                      {benefit.number}
                    </Badge>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="border-y bg-muted/30 px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful features designed for modern teams.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <Frame key={feature.title}>
                  <FramePanel>
                    <div className="space-y-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="size-5" />
                      </div>
                      <h3 className="text-sm font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </FramePanel>
                </Frame>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="mx-auto mb-3 size-5 text-muted-foreground" />
                  <p className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of teams building better products.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">
                Start free trial
                <ArrowRightIcon data-icon="inline-start" />
              </Button>
              <Button variant="ghost" size="lg">
                Talk to sales
              </Button>
            </div>
          </div>
        </section>

        {/* Design Notes */}
        <section
          id="notes"
          className="border-t px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Design Notes
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Frame>
                <FrameHeader>
                  <FrameTitle>Hero & Trust</FrameTitle>
                  <FrameDescription>
                    First impression and credibility
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "The announcement badge above the hero heading creates urgency and draws the eye before the main value prop — a common SaaS pattern for highlighting time-sensitive offers.",
                      "A single primary CTA reduces decision friction compared to two-button layouts. The arrow icon reinforces forward momentum.",
                      "The avatar mosaic grid humanizes the product by showing real people, creating social proof through visual density rather than explicit claims.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Avatar Grid</FrameTitle>
                  <FrameDescription>
                    Photo mosaic construction
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "The grid mixes filled photo cells with empty muted cells at roughly 40% fill rate — too many photos feel stock-like, too few feel empty.",
                      "Responsive column count (7 on mobile, 11 on sm+) ensures the grid feels dense on all viewports without cards becoming too small.",
                      "aspect-square on each cell plus gap-3 creates a uniform grid that doesn't depend on image dimensions, preventing layout shift.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Social Proof Strip</FrameTitle>
                  <FrameDescription>
                    Logo bar layout decisions
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Left-aligned descriptive text with right-aligned logos follows the Cal.com pattern — the text explains context while logos provide recognition at a glance.",
                      "Company names use font-semibold at foreground/70 opacity to suggest logo weight without actual logo assets, keeping the template self-contained.",
                      "The strip stacks to centered layout on mobile, maintaining scannability when horizontal space is constrained.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Key Benefits</FrameTitle>
                  <FrameDescription>
                    Numbered feature cards
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Numbered badges (01, 02, 03) create a sense of progression and completeness — users perceive the product as having a structured, thoughtful workflow.",
                      "Alternating layout direction (left-right, right-left) prevents visual monotony in long scrolling sections and keeps the eye moving.",
                      "Browser mockups with chrome (dots + URL bar) establish credibility by showing the product in a realistic context, even with placeholder content.",
                    ]}
                  />
                </FramePanel>
              </Frame>

              <Frame>
                <FrameHeader>
                  <FrameTitle>Navigation</FrameTitle>
                  <FrameDescription>
                    Sticky header and scroll behavior
                  </FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <DesignNotes
                    notes={[
                      "Sticky nav uses backdrop-blur with bg-background/95 for a frosted-glass effect that keeps context without fully obscuring scrolling content.",
                      "Nav CTA mirrors the hero button style (Get started + arrow) for consistency — every touchpoint reinforces the same primary action.",
                      "Smooth scroll via scrollIntoView creates a spatial connection between nav links and their targets, reinforcing page structure.",
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
                      "Key benefits cards stack vertically on mobile and go side-by-side on md:, with browser mockups taking full width to remain legible.",
                      "Social proof switches from horizontal split to centered stack below sm: breakpoint, keeping all logos visible without horizontal scroll.",
                      "The page uses h-svh + overflow-y-auto instead of normal document flow, keeping the template self-contained within the viewport.",
                    ]}
                  />
                </FramePanel>
              </Frame>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
