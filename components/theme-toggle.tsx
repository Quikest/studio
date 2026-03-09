"use client"

import * as React from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <SunIcon />
      </Button>
    )
  }

  function cycleTheme() {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const icon =
    theme === "dark" ? <MoonIcon /> : theme === "light" ? <SunIcon /> : <MonitorIcon />

  const label =
    theme === "dark" ? "Dark mode" : theme === "light" ? "Light mode" : "System theme"

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label={label}>
      {icon}
    </Button>
  )
}
