import { cn } from "@/lib/utils"
import { useThemeConfig, getLogoShape } from "@/components/theme-config-provider"

export function LogoMark({ className }: { className?: string }) {
  const { logoShape } = useThemeConfig()
  const shape = getLogoShape(logoShape)

  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-7 shrink-0 opacity-100", className)}
    >
      <path d={shape.path} />
    </svg>
  )
}

export function LogoWordmark({ className }: { className?: string }) {
  const { logoName } = useThemeConfig()

  return (
    <span
      className={cn(
        "text-3xl font-semibold tracking-tight leading-none",
        className,
      )}
    >
      {logoName}
    </span>
  )
}

export type LogoVariant = "horizontal" | "stacked" | "mark" | "wordmark"

interface LogoProps {
  variant?: LogoVariant
  className?: string
  markClassName?: string
  wordmarkClassName?: string
}

export function Logo({
  variant = "horizontal",
  className,
  markClassName,
  wordmarkClassName,
}: LogoProps) {
  if (variant === "mark") {
    return <LogoMark className={cn(className, markClassName)} />
  }

  if (variant === "wordmark") {
    return <LogoWordmark className={cn(className, wordmarkClassName)} />
  }

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <LogoMark className={markClassName} />
        <LogoWordmark className={wordmarkClassName} />
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <LogoWordmark className={wordmarkClassName} />
    </div>
  )
}
