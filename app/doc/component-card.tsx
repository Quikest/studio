"use client"

import * as React from "react"
import { CircleDashedIcon, CopyIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Frame, FramePanel, FrameFooter } from "@/components/ui/frame"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetPanel,
} from "@/components/ui/sheet"
import { categoryDescriptions, type ComponentEntry } from "./registry"

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon-xs"
        className="absolute right-2 top-2"
        onClick={handleCopy}
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </Button>
      <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-[13px] leading-relaxed">
        <code className="font-[family-name:var(--font-geist-mono)]">{code}</code>
      </pre>
    </div>
  )
}

function ClientPreview({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="flex min-h-[200px] flex-1 items-center justify-center p-6">
        <div className="size-6 animate-pulse rounded-full bg-muted" />
      </div>
    )
  }

  return (
    <div className="flex min-h-[200px] flex-1 items-center justify-center p-6">
      {children}
    </div>
  )
}

export function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const description = categoryDescriptions[entry.category]

  return (
    <Frame className="group">
      <FramePanel className="p-0">
        <ClientPreview>{entry.preview}</ClientPreview>
      </FramePanel>
      <FrameFooter className="px-4 py-2.5">
        <div className="flex items-center">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CircleDashedIcon className="size-3.5" />
            <span>{entry.name}</span>
          </div>
          <Sheet>
            <SheetTrigger
              render={<Button variant="outline" size="xs" className="ml-auto" />}
            >
              View code
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>{entry.name}</SheetTitle>
                <SheetDescription>{entry.category} component</SheetDescription>
              </SheetHeader>
              <SheetPanel>
                <div className="space-y-6">
                  {description && (
                    <div>
                      <h4 className="mb-2 text-sm font-semibold">Best practices</h4>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">Code</h4>
                    <CodeBlock code={entry.code} />
                  </div>
                </div>
              </SheetPanel>
            </SheetContent>
          </Sheet>
        </div>
        {description && (
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </FrameFooter>
    </Frame>
  )
}
