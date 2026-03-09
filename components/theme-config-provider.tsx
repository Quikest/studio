"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useTheme } from "next-themes"

import {
  ALL_THEME_VARS,
  getThemeById,
  THEME_STORAGE_KEY,
  themePresets,
  type ThemePreset,
} from "@/lib/themes"

function parseRem(value: string): number {
  const num = parseFloat(value)
  return Number.isFinite(num) ? num : 0
}

const BORDER_DASHED_KEY = "theme-border-dashed"
const LOGO_NAME_KEY = "theme-logo-name"
const LOGO_SHAPE_KEY = "theme-logo-shape"
const LOGO_SCALE_KEY = "theme-logo-scale"

const DEFAULT_LOGO_SCALE = 0.8

export type LogoShapeId =
  | "circle"
  | "square"
  | "rounded-square"
  | "diamond"
  | "hexagon"
  | "octagon"
  | "triangle"
  | "pentagon"
  | "star"
  | "cross"
  | "heart"
  | "shield"

export interface LogoShape {
  id: LogoShapeId
  label: string
  path: string
}

export const logoShapes: LogoShape[] = [
  { id: "circle", label: "Circle", path: "M16 0a16 16 0 1 0 0 32 16 16 0 0 0 0-32Z" },
  { id: "square", label: "Square", path: "M0 0h32v32H0z" },
  { id: "rounded-square", label: "Rounded", path: "M6 0h20a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6Z" },
  { id: "diamond", label: "Diamond", path: "M16 0 32 16 16 32 0 16Z" },
  { id: "hexagon", label: "Hexagon", path: "M16 0 30.9 8v16L16 32 1.1 24V8Z" },
  { id: "octagon", label: "Octagon", path: "M10.7 0h10.6L32 10.7v10.6L21.3 32H10.7L0 21.3V10.7Z" },
  { id: "triangle", label: "Triangle", path: "M16 2 31 30H1Z" },
  { id: "pentagon", label: "Pentagon", path: "M16 0 32 11.8 25.9 30.9H6.1L0 11.8Z" },
  { id: "star", label: "Star", path: "M16 0l4.9 10.4L32 12.2l-8 7.6 1.9 11.2L16 25.8 6.1 31l1.9-11.2-8-7.6 11.1-1.8Z" },
  { id: "cross", label: "Cross", path: "M11 0h10v11h11v10H21v11H11V21H0V11h11Z" },
  { id: "heart", label: "Heart", path: "M16 6.5C14-1 4-2 1 5s-1 11 15 23C29 16 33 9 31 5s-13-6.5-15 1.5Z" },
  { id: "shield", label: "Shield", path: "M16 0 2 5v12c0 8.4 6 14.2 14 15 8-.8 14-6.6 14-15V5Z" },
]

export function getLogoShape(id: string): LogoShape {
  return logoShapes.find((s) => s.id === id) ?? logoShapes[0]
}

interface ThemeConfigContextValue {
  activeTheme: ThemePreset
  setActiveTheme: (id: string) => void
  themes: ThemePreset[]
  radius: number
  spacing: number
  setRadiusOverride: (rem: number) => void
  setSpacingOverride: (rem: number) => void
  borderDashed: boolean
  setBorderDashed: (v: boolean) => void
  logoName: string
  setLogoName: (name: string) => void
  logoShape: LogoShapeId
  setLogoShape: (id: LogoShapeId) => void
  logoScale: number
  setLogoScale: (scale: number) => void
  resetLogo: () => void
  isLogoDefault: boolean
}

const ThemeConfigContext = createContext<ThemeConfigContextValue | null>(null)

function applyThemeVars(vars: Record<string, string>) {
  const root = document.documentElement

  for (const key of ALL_THEME_VARS) {
    root.style.removeProperty(key)
  }

  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value)
  }
}

export function ThemeConfigProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [activeId, setActiveId] = useState("default")
  const [mounted, setMounted] = useState(false)
  const [radiusOverride, setRadiusOverrideState] = useState<number | null>(null)
  const [spacingOverride, setSpacingOverrideState] = useState<number | null>(null)
  const [borderDashed, setBorderDashedState] = useState(false)
  const [logoName, setLogoNameState] = useState("Studio")
  const [logoShape, setLogoShapeState] = useState<LogoShapeId>("circle")
  const [logoScale, setLogoScaleState] = useState(DEFAULT_LOGO_SCALE)

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored && getThemeById(stored)) {
      setActiveId(stored)
    }
    setBorderDashedState(localStorage.getItem(BORDER_DASHED_KEY) === "true")
    const storedName = localStorage.getItem(LOGO_NAME_KEY)
    if (storedName !== null) setLogoNameState(storedName)
    const storedShape = localStorage.getItem(LOGO_SHAPE_KEY)
    if (storedShape) setLogoShapeState(storedShape as LogoShapeId)
    const storedScale = localStorage.getItem(LOGO_SCALE_KEY)
    if (storedScale !== null) {
      const parsed = parseFloat(storedScale)
      if (Number.isFinite(parsed)) setLogoScaleState(parsed)
    }
    setMounted(true)
  }, [])

  const activeTheme = useMemo(
    () => getThemeById(activeId) ?? themePresets[0],
    [activeId],
  )

  const presetRadius = parseRem(activeTheme.light["--radius"] ?? "0.625")
  const presetSpacing = parseRem(activeTheme.light["--spacing"] ?? "0.25")

  const radius = radiusOverride ?? presetRadius
  const spacing = spacingOverride ?? presetSpacing

  useEffect(() => {
    if (!mounted) return
    const isDark = resolvedTheme === "dark"
    const vars = isDark ? activeTheme.dark : activeTheme.light
    applyThemeVars(vars)

    const root = document.documentElement
    if (radiusOverride !== null) {
      root.style.setProperty("--radius", `${radiusOverride}rem`)
    }
    if (spacingOverride !== null) {
      root.style.setProperty("--spacing", `${spacingOverride}rem`)
    }
  }, [activeTheme, resolvedTheme, mounted, radiusOverride, spacingOverride])

  const setActiveTheme = useCallback((id: string) => {
    setActiveId(id)
    localStorage.setItem(THEME_STORAGE_KEY, id)
    setRadiusOverrideState(null)
    setSpacingOverrideState(null)
  }, [])

  const setRadiusOverride = useCallback((rem: number) => {
    setRadiusOverrideState(rem)
    document.documentElement.style.setProperty("--radius", `${rem}rem`)
  }, [])

  const setSpacingOverride = useCallback((rem: number) => {
    setSpacingOverrideState(rem)
    document.documentElement.style.setProperty("--spacing", `${rem}rem`)
  }, [])

  const setBorderDashed = useCallback((v: boolean) => {
    setBorderDashedState(v)
    localStorage.setItem(BORDER_DASHED_KEY, String(v))
    document.documentElement.classList.toggle("border-dashed-global", v)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle("border-dashed-global", borderDashed)
  }, [mounted, borderDashed])

  const setLogoName = useCallback((name: string) => {
    setLogoNameState(name)
    localStorage.setItem(LOGO_NAME_KEY, name)
  }, [])

  const setLogoShape = useCallback((id: LogoShapeId) => {
    setLogoShapeState(id)
    localStorage.setItem(LOGO_SHAPE_KEY, id)
  }, [])

  const setLogoScale = useCallback((scale: number) => {
    setLogoScaleState(scale)
    localStorage.setItem(LOGO_SCALE_KEY, String(scale))
  }, [])

  const resetLogo = useCallback(() => {
    setLogoNameState("Studio")
    setLogoShapeState("circle")
    setLogoScaleState(DEFAULT_LOGO_SCALE)
    localStorage.removeItem(LOGO_NAME_KEY)
    localStorage.removeItem(LOGO_SHAPE_KEY)
    localStorage.removeItem(LOGO_SCALE_KEY)
  }, [])

  const isLogoDefault =
    logoName === "Studio" &&
    logoShape === "circle" &&
    logoScale === DEFAULT_LOGO_SCALE

  const value = useMemo<ThemeConfigContextValue>(
    () => ({
      activeTheme,
      setActiveTheme,
      themes: themePresets,
      radius,
      spacing,
      setRadiusOverride,
      setSpacingOverride,
      borderDashed,
      setBorderDashed,
      logoName,
      setLogoName,
      logoShape,
      setLogoShape,
      logoScale,
      setLogoScale,
      resetLogo,
      isLogoDefault,
    }),
    [activeTheme, setActiveTheme, radius, spacing, setRadiusOverride, setSpacingOverride, borderDashed, setBorderDashed, logoName, setLogoName, logoShape, setLogoShape, logoScale, setLogoScale, resetLogo, isLogoDefault],
  )

  return (
    <ThemeConfigContext.Provider value={value}>
      {children}
    </ThemeConfigContext.Provider>
  )
}

export function useThemeConfig() {
  const ctx = useContext(ThemeConfigContext)
  if (!ctx) {
    throw new Error("useThemeConfig must be used within ThemeConfigProvider")
  }
  return ctx
}
