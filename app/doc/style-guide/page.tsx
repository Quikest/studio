"use client"

import { useState, useEffect, useRef } from "react"
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FramePanel,
} from "@/components/ui/frame"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  SearchIcon,
  SettingsIcon,
  PlusIcon,
  BellIcon,
  ChevronRightIcon,
  MailIcon,
  TrashIcon,
  StarIcon,
  CheckIcon,
  ClipboardIcon,
  CodeIcon,
  RotateCcwIcon,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import { useThemeConfig } from "@/components/theme-config-provider"
import { formatThemeCss } from "@/lib/themes"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetTrigger,
  SheetPopup,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetPanel,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { logoShapes, type LogoShapeId } from "@/components/theme-config-provider"

const colorGroups = [
  {
    label: "Backgrounds & Foregrounds",
    tokens: [
      { name: "background", css: "var(--background)" },
      { name: "foreground", css: "var(--foreground)" },
      { name: "card", css: "var(--card)" },
      { name: "card-foreground", css: "var(--card-foreground)" },
      { name: "popover", css: "var(--popover)" },
      { name: "popover-foreground", css: "var(--popover-foreground)" },
    ],
  },
  {
    label: "Brand",
    tokens: [
      { name: "primary", css: "var(--primary)" },
      { name: "primary-foreground", css: "var(--primary-foreground)" },
      { name: "secondary", css: "var(--secondary)" },
      { name: "secondary-foreground", css: "var(--secondary-foreground)" },
      { name: "accent", css: "var(--accent)" },
      { name: "accent-foreground", css: "var(--accent-foreground)" },
      { name: "muted", css: "var(--muted)" },
      { name: "muted-foreground", css: "var(--muted-foreground)" },
    ],
  },
  {
    label: "Semantic",
    tokens: [
      { name: "destructive", css: "var(--destructive)" },
      { name: "destructive-foreground", css: "var(--destructive-foreground)" },
      { name: "info", css: "var(--info)" },
      { name: "info-foreground", css: "var(--info-foreground)" },
      { name: "success", css: "var(--success)" },
      { name: "success-foreground", css: "var(--success-foreground)" },
      { name: "warning", css: "var(--warning)" },
      { name: "warning-foreground", css: "var(--warning-foreground)" },
    ],
  },
  {
    label: "Borders & Inputs",
    tokens: [
      { name: "border", css: "var(--border)" },
      { name: "input", css: "var(--input)" },
      { name: "ring", css: "var(--ring)" },
    ],
  },
  {
    label: "Charts",
    tokens: [
      { name: "chart-1", css: "var(--chart-1)" },
      { name: "chart-2", css: "var(--chart-2)" },
      { name: "chart-3", css: "var(--chart-3)" },
      { name: "chart-4", css: "var(--chart-4)" },
      { name: "chart-5", css: "var(--chart-5)" },
    ],
  },
  {
    label: "Sidebar",
    tokens: [
      { name: "sidebar", css: "var(--sidebar)" },
      { name: "sidebar-foreground", css: "var(--sidebar-foreground)" },
      { name: "sidebar-primary", css: "var(--sidebar-primary)" },
      { name: "sidebar-primary-foreground", css: "var(--sidebar-primary-foreground)" },
      { name: "sidebar-accent", css: "var(--sidebar-accent)" },
      { name: "sidebar-accent-foreground", css: "var(--sidebar-accent-foreground)" },
      { name: "sidebar-border", css: "var(--sidebar-border)" },
      { name: "sidebar-ring", css: "var(--sidebar-ring)" },
    ],
  },
  {
    label: "Code",
    tokens: [
      { name: "code", css: "var(--code)" },
      { name: "code-foreground", css: "var(--code-foreground)" },
      { name: "code-highlight", css: "var(--code-highlight)" },
    ],
  },
]

const typeSizes = [
  { label: "text-xs", className: "text-xs" },
  { label: "text-sm", className: "text-sm" },
  { label: "text-base", className: "text-base" },
  { label: "text-lg", className: "text-lg" },
  { label: "text-xl", className: "text-xl" },
  { label: "text-2xl", className: "text-2xl" },
  { label: "text-3xl", className: "text-3xl" },
  { label: "text-4xl", className: "text-4xl" },
  { label: "text-5xl", className: "text-5xl" },
]

const radiusTokens = [
  { label: "sm", css: "var(--radius-sm)", className: "rounded-sm" },
  { label: "md", css: "var(--radius-md)", className: "rounded-md" },
  { label: "lg", css: "var(--radius-lg)", className: "rounded-lg" },
  { label: "xl", css: "var(--radius-xl)", className: "rounded-xl" },
  { label: "2xl", css: "var(--radius-2xl)", className: "rounded-2xl" },
  { label: "3xl", css: "var(--radius-3xl)", className: "rounded-3xl" },
  { label: "4xl", css: "var(--radius-4xl)", className: "rounded-4xl" },
]

const spacingValues = [
  { label: "1 (4px)", className: "w-1" },
  { label: "2 (8px)", className: "w-2" },
  { label: "3 (12px)", className: "w-3" },
  { label: "4 (16px)", className: "w-4" },
  { label: "6 (24px)", className: "w-6" },
  { label: "8 (32px)", className: "w-8" },
  { label: "12 (48px)", className: "w-12" },
  { label: "16 (64px)", className: "w-16" },
  { label: "24 (96px)", className: "w-24" },
  { label: "32 (128px)", className: "w-32" },
  { label: "48 (192px)", className: "w-48" },
  { label: "64 (256px)", className: "w-64" },
]

const shadowValues = [
  { label: "shadow-xs", className: "shadow-xs", description: "Inputs, toggles, subtle depth" },
  { label: "shadow-sm", className: "shadow-sm", description: "Cards, tabs, floating sidebar" },
  { label: "shadow-md", className: "shadow-md", description: "Hover cards, elevated elements" },
  { label: "shadow-lg", className: "shadow-lg", description: "Dialogs, sheets, toasts, popovers" },
  { label: "shadow-xl", className: "shadow-xl", description: "Command palette, top-level modals" },
]

const iconSizes = [
  { label: "size-3", size: "size-3", px: "12px", use: "Inline indicators, breadcrumb separators" },
  { label: "size-3.5", size: "size-3.5", px: "14px", use: "Small inline icons, card action arrows" },
  { label: "size-4", size: "size-4", px: "16px", use: "Default component icons (sm screens), menu items" },
  { label: "size-4.5", size: "size-4.5", px: "18px", use: "Default component icons (base screens)" },
  { label: "size-5", size: "size-5", px: "20px", use: "Emphasized icons, navigation items" },
  { label: "size-6", size: "size-6", px: "24px", use: "Empty state media, feature highlights" },
]

const sections = [
  { id: "theme", label: "Theme" },
  { id: "logo", label: "Logo" },
  { id: "color-tokens", label: "Color Tokens" },
  { id: "typography", label: "Typography" },
  { id: "border-radius", label: "Border Radius" },
  { id: "spacing", label: "Spacing" },
  { id: "shadows", label: "Shadows" },
  { id: "iconography", label: "Iconography" },
]

function JumpNav() {
  const [activeId, setActiveId] = useState(sections[0].id)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 })

  useEffect(() => {
    const el = itemRefs.current[activeId]
    if (el) {
      setIndicatorStyle({ top: el.offsetTop, height: el.offsetHeight })
    }
  }, [activeId])

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="relative">
      <div
        className="absolute left-0 w-0.5 rounded-full bg-foreground transition-all duration-300 ease-in-out"
        style={{ top: indicatorStyle.top, height: indicatorStyle.height }}
      />
      {sections.map((section) => (
        <a
          key={section.id}
          ref={(el) => { itemRefs.current[section.id] = el }}
          href={`#${section.id}`}
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: "smooth" })
          }}
          className={cn(
            "block border-l border-border py-1 pl-3 text-xs transition-colors",
            activeId === section.id
              ? "font-medium text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {section.label}
        </a>
      ))}
    </nav>
  )
}

const defaultSwatches = {
  "--primary": "#292524",
  "--secondary": "#e7e5e4",
  "--accent": "#e7e5e4",
  "--muted": "#e7e5e4",
  "--destructive": "#ef4444",
}

const swatchKeys = [
  "--primary",
  "--secondary",
  "--accent",
  "--muted",
  "--destructive",
] as const

function getSwatchColors(theme: { light: Record<string, string> }) {
  if (Object.keys(theme.light).length === 0) {
    return swatchKeys.map((key) => defaultSwatches[key])
  }
  return swatchKeys.map((key) => theme.light[key] ?? defaultSwatches[key])
}

function ThemeCard({
  theme,
  isActive,
  onClick,
}: {
  theme: { id: string; label: string; light: Record<string, string> }
  isActive: boolean
  onClick: () => void
}) {
  const swatches = getSwatchColors(theme)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border p-3 text-left transition-all",
        isActive
          ? "border-primary bg-accent/50 ring-2 ring-primary/20"
          : "border-border bg-card hover:border-primary/30 hover:bg-accent/30",
      )}
    >
      <div className="flex items-center gap-1.5">
        {swatches.map((color, i) => (
          <div
            key={i}
            className="size-4 shrink-0 rounded-full border border-black/8 shadow-xs"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium">{theme.label}</span>
        {isActive && <CheckIcon className="size-3.5 shrink-0 text-primary" />}
      </div>
    </button>
  )
}

function LogoCustomizeSection() {
  const {
    logoName,
    setLogoName,
    logoShape,
    setLogoShape,
    logoScale,
    setLogoScale,
    resetLogo,
    isLogoDefault,
  } = useThemeConfig()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Customize
        </h3>
        <Button
          variant="secondary"
          size="sm"
          disabled={isLogoDefault}
          onClick={resetLogo}
        >
          <RotateCcwIcon data-icon="inline-start" />
          Reset
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium shrink-0" data-slot="label">
          Name
        </label>
        <Input
          value={logoName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogoName(e.target.value)}
          placeholder="Brand name"
          className="max-w-56"
          size="sm"
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium shrink-0 w-10" data-slot="label">
          Scale
        </label>
        <Slider
          value={logoScale}
          onValueChange={(v: number) => setLogoScale(v)}
          min={0.4}
          max={1.2}
          step={0.05}
          className="max-w-56"
        />
        <span className="text-xs tabular-nums text-muted-foreground w-8 text-right">
          {logoScale.toFixed(2)}
        </span>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium" data-slot="label">
          Shape
        </label>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
          {logoShapes.map((shape) => (
            <button
              key={shape.id}
              type="button"
              onClick={() => setLogoShape(shape.id as LogoShapeId)}
              className={cn(
                "group flex flex-col items-center gap-1.5 rounded-lg border p-2.5 transition-colors hover:bg-accent",
                logoShape === shape.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border",
              )}
            >
              <svg
                viewBox="0 0 32 32"
                fill="currentColor"
                aria-hidden="true"
                className="size-6"
              >
                <path d={shape.path} />
              </svg>
              <span className="text-[10px] leading-tight text-muted-foreground">
                {shape.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ThemeConfigSection() {
  const {
    activeTheme,
    setActiveTheme,
    themes,
    radius,
    spacing,
    setRadiusOverride,
    setSpacingOverride,
    borderDashed,
    setBorderDashed,
  } = useThemeConfig()
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const css = formatThemeCss(activeTheme)
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Frame id="theme" className="scroll-mt-20">
      <FrameHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <FrameTitle>Theme Configuration</FrameTitle>
            <FrameDescription>
              Select a preset theme to apply globally. Copy the CSS variables to
              customize further.
            </FrameDescription>
          </div>
          <Button
            variant="secondary"
            size="sm"
            disabled={activeTheme.id === "default"}
            onClick={() => setActiveTheme("default")}
          >
            <RotateCcwIcon data-icon="inline-start" />
            Reset
          </Button>
        </div>
      </FrameHeader>
      <FramePanel>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isActive={activeTheme.id === theme.id}
                onClick={() => setActiveTheme(theme.id)}
              />
            ))}
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-sm" data-slot="label">
              <Switch
                checked={borderDashed}
                onCheckedChange={setBorderDashed}
              />
              Dashed borders
            </label>
            <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <CheckIcon data-icon="inline-start" />
              ) : (
                <ClipboardIcon data-icon="inline-start" />
              )}
              {copied ? "Copied" : "Copy CSS"}
            </Button>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="sm" />}>
                <CodeIcon data-icon="inline-start" />
                View CSS
              </SheetTrigger>
              <SheetPopup side="right">
                <SheetHeader>
                  <SheetTitle>{activeTheme.label}</SheetTitle>
                  <SheetDescription>
                    CSS variable overrides for this theme preset.
                  </SheetDescription>
                </SheetHeader>
                <SheetPanel>
                  <pre className="rounded-lg border bg-muted/50 p-4 text-xs leading-relaxed font-mono overflow-x-auto">
                    <code>{formatThemeCss(activeTheme)}</code>
                  </pre>
                </SheetPanel>
              </SheetPopup>
            </Sheet>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Radius</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-14 rounded-md border bg-muted/50 px-2 py-1 text-center text-xs font-mono tabular-nums">
                    {radius.toFixed(radius % 1 === 0 ? 0 : 3)}
                  </span>
                  <span className="text-xs text-muted-foreground">rem</span>
                </div>
              </div>
              <Slider
                min={0}
                max={2}
                step={0.125}
                value={radius}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val
                  setRadiusOverride(v)
                }}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Spacing</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-14 rounded-md border bg-muted/50 px-2 py-1 text-center text-xs font-mono tabular-nums">
                    {spacing.toFixed(spacing % 1 === 0 ? 1 : 2)}
                  </span>
                  <span className="text-xs text-muted-foreground">rem</span>
                </div>
              </div>
              <Slider
                min={0.1}
                max={0.5}
                step={0.01}
                value={spacing}
                onValueChange={(val) => {
                  const v = Array.isArray(val) ? val[0] : val
                  setSpacingOverride(v)
                }}
              />
            </div>
          </div>
        </div>
      </FramePanel>
    </Frame>
  )
}

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-10">
        <div className="min-w-0 max-w-5xl flex-1">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Style Guide
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Visual foundations of the design system. All tokens adapt live to
              the current theme.
            </p>
          </div>

          <div className="space-y-10">
            {/* Theme Configuration */}
            <ThemeConfigSection />

            {/* Logo */}
            <Frame id="logo" className="scroll-mt-20">
          <FrameHeader>
            <FrameTitle>Logo</FrameTitle>
            <FrameDescription>
              Brand mark, wordmark, and lockup configurations. All versions use
              currentColor to adapt between light and dark modes.
            </FrameDescription>
          </FrameHeader>

          <FramePanel>
            <div className="space-y-8">
              <LogoCustomizeSection />

              <Separator />

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Lockups
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {(
                    [
                      { variant: "horizontal", label: "Horizontal" },
                      { variant: "stacked", label: "Stacked" },
                      { variant: "mark", label: "Mark Only" },
                      { variant: "wordmark", label: "Wordmark Only" },
                    ] as const
                  ).map((item) => (
                    <div key={item.variant} className="flex flex-col items-center gap-3">
                      <div className="flex h-28 w-full items-center justify-center rounded-lg border">
                        <Logo variant={item.variant} />
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Color Modes
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">On Light</p>
                    <div className="flex h-32 items-center justify-center rounded-lg border bg-white text-neutral-800">
                      <Logo />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex h-16 items-center justify-center rounded-lg border bg-white text-neutral-800">
                        <Logo variant="mark" />
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg border bg-white text-neutral-800">
                        <Logo variant="wordmark" />
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg border bg-white text-neutral-800">
                        <Logo variant="stacked" markClassName="size-5" wordmarkClassName="text-xs" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium">On Dark</p>
                    <div className="flex h-32 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-100">
                      <Logo />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex h-16 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-100">
                        <Logo variant="mark" />
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-100">
                        <Logo variant="wordmark" />
                      </div>
                      <div className="flex h-16 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-100">
                        <Logo variant="stacked" markClassName="size-5" wordmarkClassName="text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Clear Space &amp; Minimum Size
                </h3>
                <div className="flex flex-wrap items-end gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="rounded-lg border border-dashed p-6">
                      <Logo />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Clear space = mark diameter
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-4 rounded-lg border border-dashed px-4 py-3">
                      <Logo variant="mark" markClassName="size-6" />
                      <Logo variant="mark" markClassName="size-5" />
                      <Logo variant="mark" markClassName="size-4" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Min mark: 16px &middot; Min lockup: 100px wide
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Usage Guidelines
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Preferred lockup</span>
                    <span className="text-muted-foreground">
                      Horizontal for navigation and headers. Stacked for splash screens and favicons.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Mark alone</span>
                    <span className="text-muted-foreground">
                      Use when space is tight (toolbars, app icons) or the brand is already established in context.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Wordmark alone</span>
                    <span className="text-muted-foreground">
                      Use in text-heavy contexts where the mark would feel visually heavy (footers, legal).
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Color</span>
                    <span className="text-muted-foreground">
                      Always foreground on background. Never apply brand colors to the logo — it inherits via currentColor.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Don&apos;t</span>
                    <span className="text-muted-foreground">
                      Rotate, stretch, add drop shadows or effects, rearrange lockup elements, or place on busy backgrounds.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FramePanel>
        </Frame>

            {/* Color Tokens */}
            <Frame id="color-tokens" className="scroll-mt-20">
              <FrameHeader>
                <FrameTitle>Color Tokens</FrameTitle>
            <FrameDescription>
              Semantic color variables used across the design system. Toggle the
              theme to see dark mode equivalents.
            </FrameDescription>
          </FrameHeader>
          <FramePanel>
            <div className="space-y-8">
              {colorGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {group.tokens.map((token) => (
                      <div key={token.name} className="flex items-center gap-3">
                        <div
                          className="size-10 shrink-0 rounded-lg border shadow-xs"
                          style={{ backgroundColor: token.css }}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{token.name}</p>
                          <p className="truncate text-xs text-muted-foreground font-mono">
                            {token.css}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FramePanel>
        </Frame>

            {/* Typography */}
            <Frame id="typography" className="scroll-mt-20">
              <FrameHeader>
                <FrameTitle>Typography</FrameTitle>
            <FrameDescription>
              Font families and the type scale used throughout the system.
            </FrameDescription>
          </FrameHeader>
          <FramePanel>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Font Families
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground font-mono">--font-sans (Geist Sans)</p>
                    <p className="text-lg font-sans">
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground font-mono">--font-mono (Geist Mono)</p>
                    <p className="text-lg font-mono">
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground font-mono">--font-heading</p>
                    <p className="text-lg font-[family-name:var(--font-heading)]">
                      The quick brown fox jumps over the lazy dog
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Type Scale
                </h3>
                <div className="space-y-4">
                  {typeSizes.map((size) => (
                    <div key={size.label} className="flex items-baseline gap-4">
                      <span className="w-20 shrink-0 text-right text-xs text-muted-foreground font-mono">
                        {size.label}
                      </span>
                      <span className={size.className}>
                        Design System
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Font Weights
                </h3>
                <div className="space-y-3">
                  {(
                    [
                      ["font-normal", "Normal (400)"],
                      ["font-medium", "Medium (500)"],
                      ["font-semibold", "Semibold (600)"],
                      ["font-bold", "Bold (700)"],
                    ] as const
                  ).map(([cls, label]) => (
                    <div key={cls} className="flex items-baseline gap-4">
                      <span className="w-20 shrink-0 text-right text-xs text-muted-foreground font-mono">
                        {cls}
                      </span>
                      <span className={`text-lg ${cls}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FramePanel>
        </Frame>

            {/* Border Radius */}
            <Frame id="border-radius" className="scroll-mt-20">
              <FrameHeader>
                <FrameTitle>Border Radius</FrameTitle>
            <FrameDescription>
              Radius tokens from the smallest (sm) to the largest (4xl). Base
              radius is 0.625rem (10px).
            </FrameDescription>
          </FrameHeader>
          <FramePanel>
            <div className="flex flex-wrap gap-6">
              {radiusTokens.map((token) => (
                <div key={token.label} className="flex flex-col items-center gap-2">
                  <div
                    className={`size-16 border-2 border-primary bg-primary/10 ${token.className}`}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium">{token.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {token.css}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FramePanel>
        </Frame>

            {/* Spacing */}
            <Frame id="spacing" className="scroll-mt-20">
              <FrameHeader>
                <FrameTitle>Spacing</FrameTitle>
            <FrameDescription>
              Common spacing values used for padding, margins, and gaps.
            </FrameDescription>
          </FrameHeader>
          <FramePanel>
            <div className="space-y-3">
              {spacingValues.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="w-24 shrink-0 text-right text-xs text-muted-foreground font-mono">
                    {item.label}
                  </span>
                  <div
                    className={`h-4 rounded-sm bg-primary/80 ${item.className}`}
                  />
                </div>
              ))}
            </div>
          </FramePanel>
        </Frame>

            {/* Shadows */}
            <Frame id="shadows" className="scroll-mt-20">
              <FrameHeader>
                <FrameTitle>Shadows</FrameTitle>
            <FrameDescription>
              Elevation scale used throughout the system. Lighter shadows for
              subtle depth, heavier for overlays and modals. All shadows use
              opacity modifiers (e.g. shadow-lg/5) on components.
            </FrameDescription>
          </FrameHeader>
          <FramePanel>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shadowValues.map((shadow) => (
                <div key={shadow.label} className="flex flex-col items-center gap-3">
                  <div
                    className={`size-24 rounded-xl border bg-card ${shadow.className}`}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium">{shadow.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {shadow.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FramePanel>
        </Frame>

            {/* Iconography */}
            <Frame id="iconography" className="scroll-mt-20">
              <FrameHeader>
                <FrameTitle>Iconography</FrameTitle>
            <FrameDescription>
              Icons use Lucide React. Size classes map to Tailwind&apos;s sizing
              scale. Components auto-size icons via [&amp;_svg] selectors — use
              explicit size classes only when overriding.
            </FrameDescription>
          </FrameHeader>
          <FramePanel>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Size Scale
                </h3>
                <div className="space-y-4">
                  {iconSizes.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <span className="w-16 shrink-0 text-right text-xs text-muted-foreground font-mono">
                        {item.label}
                      </span>
                      <div className="flex w-10 shrink-0 justify-center">
                        <SettingsIcon className={item.size} />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {item.px}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.use}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sample Icons
                </h3>
                <div className="flex flex-wrap gap-6">
                  {[
                    { icon: SearchIcon, name: "Search" },
                    { icon: SettingsIcon, name: "Settings" },
                    { icon: PlusIcon, name: "Plus" },
                    { icon: BellIcon, name: "Bell" },
                    { icon: ChevronRightIcon, name: "ChevronRight" },
                    { icon: MailIcon, name: "Mail" },
                    { icon: TrashIcon, name: "Trash" },
                    { icon: StarIcon, name: "Star" },
                  ].map((item) => (
                    <div key={item.name} className="flex flex-col items-center gap-2">
                      <div className="flex size-12 items-center justify-center rounded-lg border bg-card">
                        <item.icon className="size-5" />
                      </div>
                      <p className="text-xs text-muted-foreground font-mono">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Usage Conventions
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Button icons</span>
                    <span className="text-muted-foreground">
                      Use data-icon=&quot;inline-start&quot; for auto-sizing and spacing
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Icon-only buttons</span>
                    <span className="text-muted-foreground">
                      Always add &lt;span className=&quot;sr-only&quot;&gt; for accessibility
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Opacity</span>
                    <span className="text-muted-foreground">
                      Apply opacity-80 to secondary icons; opacity-60 to disabled
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-32 shrink-0 font-medium">Stroke width</span>
                    <span className="text-muted-foreground">
                      Default 2px stroke — don&apos;t override; Lucide&apos;s consistency is intentional
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FramePanel>
            </Frame>
          </div>
        </div>

        <aside className="hidden lg:block lg:w-44 lg:shrink-0">
          <div className="sticky top-20">
            <JumpNav />
          </div>
        </aside>
      </div>
    </div>
  )
}
