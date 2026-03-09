"use client"

import Link from "next/link"
import { GithubIcon, ImageIcon } from "lucide-react"

import { LogoMark } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Frame,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FramePanel,
} from "@/components/ui/frame"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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

function GeometricPattern() {
  return (
    <svg
      className="absolute inset-0 size-full"
      viewBox="0 0 800 800"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <line
        x1="500"
        y1="100"
        x2="700"
        y2="300"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
      <line
        x1="700"
        y1="300"
        x2="500"
        y2="500"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
      <line
        x1="500"
        y1="500"
        x2="300"
        y2="300"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
      <line
        x1="300"
        y1="300"
        x2="500"
        y2="100"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
      <line
        x1="500"
        y1="0"
        x2="500"
        y2="800"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
      <line
        x1="0"
        y1="300"
        x2="800"
        y2="300"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
      <circle
        cx="500"
        cy="300"
        r="120"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
      <circle
        cx="500"
        cy="300"
        r="80"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
      <circle
        cx="500"
        cy="300"
        r="40"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/[6%]"
      />
    </svg>
  )
}

export default function LoginTemplate() {
  return (
    <div className="h-svh overflow-y-auto">
      <div className="flex min-h-full">
        {/* Form Panel */}
        <div className="flex w-full flex-col px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-6" />
            <span className="text-lg font-semibold tracking-tight">
              Acme Inc.
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  Login to your account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>

              <div className="space-y-4">
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    size="lg"
                  />
                </Field>

                <Field>
                  <div className="flex w-full items-center justify-between">
                    <FieldLabel>Password</FieldLabel>
                    <Link
                      href="#"
                      className="text-sm font-medium underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input type="password" size="lg" />
                </Field>

                <Button className="w-full" size="lg">
                  Login
                </Button>

                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="shrink-0 text-xs text-muted-foreground">
                    Or continue with
                  </span>
                  <Separator className="flex-1" />
                </div>

                <Button variant="outline" className="w-full" size="lg">
                  <GithubIcon data-icon="inline-start" />
                  Login with GitHub
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Media Panel */}
        <div className="relative hidden overflow-hidden bg-muted lg:block lg:w-1/2">
          <GeometricPattern />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-foreground/[4%]">
              <ImageIcon className="size-6 text-foreground/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Design Notes */}
      <section className="border-t px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Design Notes
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Frame>
              <FrameHeader>
                <FrameTitle>Split Layout</FrameTitle>
                <FrameDescription>
                  Form and media panel relationship
                </FrameDescription>
              </FrameHeader>
              <FramePanel>
                <DesignNotes
                  notes={[
                    "The 50/50 split gives equal visual weight to the form and the media panel, preventing the login form from feeling lost in a full-width layout while providing space for branding.",
                    "The media panel hides on mobile (hidden lg:block) so the form occupies the full viewport — login is the primary task and shouldn't compete for space on small screens.",
                    "The form panel uses flex-1 with items-center/justify-center to vertically center the form regardless of viewport height, avoiding awkward top-heavy layouts on tall screens.",
                  ]}
                />
              </FramePanel>
            </Frame>

            <Frame>
              <FrameHeader>
                <FrameTitle>Form Hierarchy</FrameTitle>
                <FrameDescription>
                  Input ordering and visual flow
                </FrameDescription>
              </FrameHeader>
              <FramePanel>
                <DesignNotes
                  notes={[
                    "max-w-sm constrains the form to a comfortable reading width (~384px), preventing inputs from stretching too wide on the half-panel and maintaining visual density.",
                    "The 'Forgot your password?' link sits inline with the Password label rather than below the field, reducing vertical height and keeping the form compact.",
                    "The primary Login button uses full width (w-full) to create a clear end-of-form anchor — its visual weight signals the primary action.",
                  ]}
                />
              </FramePanel>
            </Frame>

            <Frame>
              <FrameHeader>
                <FrameTitle>Social Login</FrameTitle>
                <FrameDescription>
                  OAuth and separator pattern
                </FrameDescription>
              </FrameHeader>
              <FramePanel>
                <DesignNotes
                  notes={[
                    "The 'Or continue with' separator uses two flex-1 dividers flanking centered text — a pattern that scales cleanly without hard-coded widths or absolute positioning.",
                    "The GitHub button uses outline variant to subordinate it to the primary Login action, establishing a clear visual hierarchy between email and OAuth flows.",
                    "The 'Sign up' link at the bottom provides an escape hatch for users who arrived at the wrong page without cluttering the form area itself.",
                  ]}
                />
              </FramePanel>
            </Frame>

            <Frame>
              <FrameHeader>
                <FrameTitle>Media Panel</FrameTitle>
                <FrameDescription>
                  Decorative pattern and placeholder
                </FrameDescription>
              </FrameHeader>
              <FramePanel>
                <DesignNotes
                  notes={[
                    "The geometric SVG pattern provides visual interest without requiring an actual hero image, keeping the template self-contained and asset-free.",
                    "The image placeholder icon inside a subtle circle signals where a real product screenshot or illustration should go — making the template's intent clear.",
                    "The muted background with low-opacity pattern lines ensures the right panel enhances rather than distracts from the form on the left.",
                  ]}
                />
              </FramePanel>
            </Frame>

            <Frame>
              <FrameHeader>
                <FrameTitle>Branding</FrameTitle>
                <FrameDescription>
                  Logo placement and identity
                </FrameDescription>
              </FrameHeader>
              <FramePanel>
                <DesignNotes
                  notes={[
                    "The logo sits in the top-left of the form panel (not a shared header), tying branding to the interactive area and keeping the media panel fully available for content.",
                    "Logo uses the mark + wordmark pattern at compact size (size-6 mark, text-lg wordmark) to establish identity without competing with the form heading.",
                    "No navigation links appear in the header area — login pages are intentionally dead-end to minimize escape routes and focus on conversion.",
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
                    "Below lg breakpoint, the layout collapses to a single-column form with the media panel removed entirely — no Sheet or drawer replacement, because decoration shouldn't occupy mobile real estate.",
                    "Padding scales from px-4 on mobile to px-12 on desktop, maintaining visual breathing room proportional to available space.",
                    "The page uses h-svh with overflow-y-auto so the design notes section scrolls below the viewport-filling login layout.",
                  ]}
                />
              </FramePanel>
            </Frame>
          </div>
        </div>
      </section>
    </div>
  )
}
