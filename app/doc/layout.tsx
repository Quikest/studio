import { SiteHeader } from "@/components/site-header"

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/50">
      <SiteHeader />
      {children}
    </div>
  )
}
