import * as React from "react"
import Link from "next/link"
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CodeIcon,
  LayersIcon,
  LayoutTemplateIcon,
  MoonIcon,
  PaletteIcon,
  ShieldCheckIcon,
  SparklesIcon,
  SunMoonIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Frame,
  FramePanel,
} from "@/components/ui/frame"

const AVATAR_GRID: (string | null)[][] = [
  [null, "1", null, null, "5", null, "7", null, "9", null, null],
  ["11", null, "13", null, "15", "16", null, "18", null, "20", "21"],
  [null, "23", null, "25", null, "27", "28", null, "30", "31", null],
  ["33", null, null, "36", null, null, "39", null, null, "42", null],
]

const TECH_STACK = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Base UI",
  "Lucide",
  "Geist",
]

const BENEFITS = [
  {
    number: "01",
    title: "Production-ready components",
    description:
      "42 categories of pre-built, accessible components styled with Tailwind CSS. From buttons and dialogs to data tables and forms — every particle is copy-paste ready and fully customizable.",
    icon: LayersIcon,
    mockupTitle: "Component Library",
    mockupUrl: "studio/components",
  },
  {
    number: "02",
    title: "Full-page templates",
    description:
      "9 professionally designed layout templates for common app patterns. Dashboards, workspaces, master-detail views, marketing pages, and more — each with design annotations explaining the architectural decisions.",
    icon: LayoutTemplateIcon,
    mockupTitle: "Page Templates",
    mockupUrl: "studio/templates",
  },
  {
    number: "03",
    title: "Design system built in",
    description:
      "Semantic color tokens, typography scale, spacing system, shadows, and dark mode — all pre-configured and documented. Your app looks polished from the first line of code.",
    icon: PaletteIcon,
    mockupTitle: "Design Tokens",
    mockupUrl: "studio/design-system",
  },
]

const FEATURES = [
  {
    icon: ShieldCheckIcon,
    title: "Accessible",
    description:
      "Built on Base UI primitives with WAI-ARIA compliance, keyboard navigation, and screen reader support out of the box.",
  },
  {
    icon: CodeIcon,
    title: "Own the source",
    description:
      "Copy-paste architecture means no black-box dependencies. Extend, modify, or remove anything to fit your exact needs.",
  },
  {
    icon: MoonIcon,
    title: "Dark mode",
    description:
      "Semantic color tokens and next-themes integration give you light, dark, and system themes with zero configuration.",
  },
]

const STATS = [
  { value: "42+", label: "Components", icon: LayersIcon },
  { value: "9", label: "Templates", icon: LayoutTemplateIcon },
  { value: "2", label: "Themes", icon: SunMoonIcon },
  { value: "100%", label: "Accessible", icon: CheckCircleIcon },
]

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

export default function Page() {
  return (
    <div className="h-svh overflow-y-auto">
      <SiteHeader />

      <main>
        {/* Hero with mockup */}
        <section className="mx-auto w-full max-w-5xl overflow-hidden pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full overflow-hidden"
          >
            <div
              className={cn(
                "absolute inset-0 isolate -z-10",
                "bg-[radial-gradient(20%_80%_at_20%_0%,var(--color-foreground)/.1,transparent)]",
              )}
            />
          </div>

          <div
            className={cn(
              "relative z-10 flex max-w-2xl flex-col gap-5 px-4",
            )}
          >
            <Link
              href="/doc"
              className={cn(
                "group flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow-xs",
                "animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards delay-500 duration-500 ease-out",
              )}
            >
              <Badge variant="outline" className="font-mono text-xs">
                NEW
              </Badge>
              <span className="text-xs">open source starter template</span>
              <span className="block h-5 border-l" />
              <div className="pr-1">
                <ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
              </div>
            </Link>

            <h1
              className={cn(
                "text-balance text-4xl font-medium tracking-tight text-foreground md:text-5xl",
                "animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards delay-100 duration-500 ease-out",
              )}
            >
              Build beautiful apps, faster
            </h1>

            <p
              className={cn(
                "text-lg tracking-wider text-muted-foreground sm:text-xl",
                "animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards delay-200 duration-500 ease-out",
              )}
            >
              A production-ready starter with components, templates,
              <br className="hidden sm:block" /> and a design system. Built on
              Next.js, Base UI, and Tailwind CSS.
            </p>

            <div
              className={cn(
                "flex w-fit items-center gap-3 pt-2",
                "animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards delay-300 duration-500 ease-out",
              )}
            >
              <Button variant="outline" render={<Link href="/doc" />}>
                <BookOpenIcon data-icon="inline-start" />
                Browse docs
              </Button>
              <Button>
                Get started
                <ArrowRightIcon data-icon="inline-start" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className={cn(
                "absolute -inset-x-20 inset-y-0 -translate-y-1/3 scale-120 rounded-full",
                "bg-[radial-gradient(ellipse_at_center,var(--color-foreground)/.1,transparent,transparent)]",
                "blur-[50px]",
              )}
            />
            <div
              className={cn(
                "mask-b-from-60% relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20",
                "animate-in fade-in slide-in-from-bottom-5 fill-mode-backwards delay-100 duration-1000 ease-out",
              )}
            >
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border bg-background p-2 shadow-xl ring-1 ring-card inset-shadow-2xs inset-shadow-foreground/10 dark:inset-shadow-xs dark:inset-shadow-foreground/20">
                <img
                  alt="Dashboard preview"
                  className="aspect-video rounded-lg border dark:hidden"
                  height="1080"
                  src="https://storage.efferd.com/screen/dashboard-light.webp"
                  width="1920"
                />
                <img
                  alt="Dashboard preview"
                  className="hidden aspect-video rounded-lg bg-background dark:block"
                  height="1080"
                  src="https://storage.efferd.com/screen/dashboard-dark.webp"
                  width="1920"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden px-4 pb-0 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6">
              Open source starter template
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build beautiful apps, faster
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              A production-ready starter with 42+ components, 9 page templates,
              and a complete design system. Built on Next.js, Base UI, and
              Tailwind CSS.
            </p>
            <div className="mt-8">
              <Button size="lg">
                Get started
                <ArrowRightIcon data-icon="inline-start" />
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-7 gap-3 sm:grid-cols-11">
              {AVATAR_GRID.flat().map((cell, i) => (
                <AvatarGridCell key={i} imgId={cell} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-6">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <p className="shrink-0 text-sm text-muted-foreground">
                Built with the modern
                <br className="hidden sm:block" />
                {" "}web stack you love
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                {TECH_STACK.map((name) => (
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

        <section id="benefits" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <Badge variant="outline" className="mb-4">
                <SparklesIcon className="size-3" />
                What&apos;s included
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything to ship your next app
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Components, templates, and a design system that work together so
                you can focus on building your product.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  Get started
                  <ArrowRightIcon data-icon="inline-start" />
                </Button>
                <Button variant="outline" size="lg">
                  Browse components
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

        <section
          id="features"
          className="border-y bg-muted/30 px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Built for developers
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Modern foundations that let you move fast without cutting
                corners.
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

        <section className="border-t bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to start building?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Clone the repo and start shipping your next project in minutes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">
                Get started
                <ArrowRightIcon data-icon="inline-start" />
              </Button>
              <Button variant="ghost" size="lg">
                View on GitHub
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
