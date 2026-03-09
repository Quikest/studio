"use client"

import { ArrowRightIcon } from "lucide-react"

import { useThemeConfig } from "@/components/theme-config-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogPanel,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function SignInDialog() {
  const { logoName } = useThemeConfig()

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Sign in
      </DialogTrigger>
      <DialogPopup className="max-w-sm">
        <DialogHeader className="items-center text-center">
          <DialogTitle>Sign in to {logoName}</DialogTitle>
          <DialogDescription>
            Welcome back! Please sign in to continue
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-5">
          <Button
            variant="outline"
            className="w-full gap-3"
            onClick={() => console.log("Google sign-in clicked")}
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-sm">or</span>
            <Separator className="flex-1" />
          </div>

          <Field>
            <FieldLabel>Email address</FieldLabel>
            <Input
              type="email"
              placeholder="Enter your email address"
            />
          </Field>

          <Button
            className="w-full"
            onClick={() => console.log("Continue clicked")}
          >
            Continue
            <ArrowRightIcon data-icon="inline-start" />
          </Button>

          <Button
            variant="ghost"
            className="w-full font-semibold"
            onClick={() => console.log("Passkey sign-in clicked")}
          >
            Sign in with passkey
          </Button>
        </DialogPanel>
        <DialogFooter className="justify-center sm:justify-center">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="font-semibold text-foreground underline underline-offset-2"
              onClick={() => console.log("Sign up clicked")}
            >
              Sign up
            </button>
          </p>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
