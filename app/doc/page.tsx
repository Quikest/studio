import Link from "next/link"
import { ArrowRightIcon, ComponentIcon, LayoutIcon, PaletteIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardPanel } from "@/components/ui/card"
import { componentRegistry } from "./registry"

const sections = [
  {
    href: "/doc/particles",
    title: "Particles",
    description: `Browse ${componentRegistry.length} ready-to-use components — buttons, inputs, dialogs, and more.`,
    icon: ComponentIcon,
  },
  {
    href: "/doc/style-guide",
    title: "Style Guide",
    description: "Color tokens, typography scale, border radii, and spacing reference.",
    icon: PaletteIcon,
  },
  {
    href: "/doc/templates",
    title: "Templates",
    description: "Full-page layout patterns you can use as starting points for multi-panel interfaces.",
    icon: LayoutIcon,
  },
]

export default function DocPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Design System
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Everything you need to build consistent, beautiful interfaces.
          Explore the component library or review the visual foundations.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="size-5" />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardPanel>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardPanel>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
