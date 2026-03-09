"use client"

import Link from "next/link"
import { GithubIcon, ImageIcon } from "lucide-react"

import { LogoMark, LogoWordmark } from "@/components/logo"
import { useThemeConfig } from "@/components/theme-config-provider"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

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

export default function SignUpPage() {
  const { logoScale } = useThemeConfig()

  return (
    <div className="h-svh overflow-y-auto">
      <div className="flex min-h-full">
        {/* Form Panel */}
        <div className="flex w-full flex-col px-4 py-8 sm:px-8 lg:w-1/2 lg:px-12">
          <div className="flex items-center gap-2.5">
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
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your details below to get started
                </p>
              </div>

              <div className="space-y-4">
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input placeholder="Jane Doe" size="lg" />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    size="lg"
                  />
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" size="lg" />
                </Field>

                <Button className="w-full" size="lg">
                  Create account
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
                  Sign up with GitHub
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/templates/login"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                  Log in
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
    </div>
  )
}
