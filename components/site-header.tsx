"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "lucide-react"

import { LogoMark, LogoWordmark } from "@/components/logo"
import { SignInDialog } from "@/components/sign-in-dialog"
import { useThemeConfig } from "@/components/theme-config-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Docs", href: "/doc", exact: true },
  { label: "Particles", href: "/doc/particles", exact: false },
  { label: "Style Guide", href: "/doc/style-guide", exact: false },
  { label: "Templates", href: "/doc/templates", exact: false },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { logoScale } = useThemeConfig()

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2.5 gap-2.5"
            render={<Link href="/" />}
          >
            <span
              className="flex items-center gap-2.5 origin-left"
              style={{ transform: `scale(${logoScale})` }}
            >
              <LogoMark />
              <LogoWordmark />
            </span>
          </Button>
          <nav className="hidden items-center md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/")

              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-muted-foreground",
                    isActive && "text-foreground",
                  )}
                  render={<Link href={item.href} />}
                >
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignInDialog />
          <Button size="sm">
            Get started
            <ArrowRightIcon data-icon="inline-start" />
          </Button>
        </div>
      </div>
    </header>
  )
}
