# Error Handling Strategy

How to handle, display, and recover from errors across the application. This guide maps error types to the correct UI feedback component and defines patterns for form validation, route-level boundaries, and global error recovery.

---

## Error Feedback Components

The design system provides four components for communicating errors and status to users. Each serves a different purpose:

| Component | Persistence | Scope | Use For |
|---|---|---|---|
| `FieldError` | Persistent until fixed | Single form field | Inline validation errors tied to a specific input |
| `Alert` | Persistent until dismissed or resolved | Section / page | Contextual error messages, API failures, permission issues |
| `Toast` | Auto-dismisses | Global | Brief confirmations that an action failed or succeeded |
| `Empty` | Persistent until data exists | Content area | Zero-data or error-state fallbacks for lists and sections |

### Decision Framework

```
Is the error tied to a specific form field?
  └── Yes → FieldError

Is the error contextual to a section of the page?
  └── Yes → Alert (variant="error")

Is the error a brief notification about a failed action?
  └── Yes → Toast (type="error")

Is the error a full-page or route-level failure?
  └── Yes → error.tsx boundary with Empty component

Is the app completely broken?
  └── Yes → global-error.tsx
```

---

## Form Validation

### Field-Level Errors

Use `Field`, `FieldError`, and the `Form` component from Base UI for declarative validation:

```tsx
<Form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" required placeholder="name@example.com" />
    <FieldError />
  </Field>
  <Field>
    <FieldLabel>Password</FieldLabel>
    <Input type="password" required minLength={8} />
    <FieldError />
  </Field>
  <Button type="submit">Sign In</Button>
</Form>
```

- `FieldError` renders automatically when its sibling input fails validation
- Use HTML validation attributes (`required`, `minLength`, `type="email"`, `pattern`) for client-side validation
- `FieldError` uses `text-destructive-foreground text-xs` styling

### Server-Side Validation Errors

When server actions return validation errors, map them back to the appropriate fields:

```tsx
"use client"

import { useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

export function CreateProjectForm() {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await createProject(formData)

    if (result.error) {
      setError(result.error)
      return
    }

    // success path
  }

  return (
    <form action={handleSubmit}>
      {error && (
        <Alert variant="error">
          <AlertCircleIcon />
          <AlertTitle>Failed to create project</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* form fields */}
    </form>
  )
}
```

### Form Error Placement

- **Field errors**: rendered by `FieldError` immediately below the input, inside the `Field` wrapper
- **Form-level errors** (server errors, multi-field validation): use `Alert variant="error"` at the top of the form, before the fields
- **Submission feedback**: use Toast for brief success/failure notifications after form submission

```tsx
<form action={handleSubmit}>
  {/* Form-level error at top */}
  {formError && (
    <Alert variant="error">
      <AlertCircleIcon />
      <AlertTitle>{formError}</AlertTitle>
    </Alert>
  )}

  {/* Fields with inline errors */}
  <Field>
    <FieldLabel>Name</FieldLabel>
    <Input required />
    <FieldError />
  </Field>

  {/* Actions at bottom */}
  <Button type="submit">Submit</Button>
</form>
```

---

## Inline Alerts

Use `Alert` for persistent, contextual error messages that relate to a section of the page (not a specific field):

```tsx
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

<Alert variant="error">
  <AlertCircleIcon />
  <AlertTitle>Connection failed</AlertTitle>
  <AlertDescription>
    Unable to reach the server. Check your network connection and try again.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline" size="sm" onClick={retry}>Retry</Button>
  </AlertAction>
</Alert>
```

### Alert Variants

| Variant | When to Use |
|---|---|
| `error` | API failures, permission errors, blocked actions |
| `warning` | Approaching limits, deprecation notices, partial failures |
| `info` | Feature announcements, neutral status updates |
| `success` | Completed operations, resolved errors |
| `default` | General notices without semantic meaning |

### Alert Placement

- **Page-level**: at the top of the page content, below the page header, above the main content
- **Section-level**: inside a Frame or Card, above the section content
- **Form-level**: inside the form, above the form fields

---

## Toast Notifications

Use Toast for transient error feedback — failed API calls, network errors, or action failures that don't block the user's workflow:

```tsx
import { toastManager } from "@/components/ui/toast"

// Action failed
toastManager.add({
  title: "Failed to save",
  description: "Your changes could not be saved. Please try again.",
  type: "error",
  actionProps: {
    children: "Retry",
    onClick: () => retryAction(),
  },
})

// Action succeeded
toastManager.add({
  title: "Project created",
  type: "success",
})
```

### Alert vs Toast

| Scenario | Use |
|---|---|
| API returns an error for a data fetch | Alert (persistent, contextual) |
| Form submission fails server-side | Alert at top of form |
| Background action fails (delete, update) | Toast with retry action |
| Action succeeds | Toast (brief confirmation) |
| Validation error on a field | FieldError (inline) |
| User's session expired | Alert (requires action) |
| Network connectivity lost | Alert (persistent until resolved) |
| File upload fails | Toast with retry |

---

## Route-Level Error Boundaries

### `error.tsx`

Add `error.tsx` to route segments that perform data fetching or server actions. This catches runtime errors and renders a recovery UI:

```tsx
// app/dashboard/error.tsx
"use client"

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            An unexpected error occurred. Please try again.
          </EmptyDescription>
        </EmptyHeader>
        <Button onClick={reset}>Try Again</Button>
      </Empty>
    </div>
  )
}
```

### Guidelines for `error.tsx`

- Always a client component (`"use client"`)
- Use the `Empty` component for consistent error state presentation
- Always provide a `reset` action so users can retry without refreshing
- Match the page shell (max-width, padding) for visual consistency
- Don't expose technical error details to users — log them server-side
- The `digest` property is a server-generated hash for correlating with server logs

### Where to Add `error.tsx`

Add error boundaries at route segments that are likely to fail:

```
app/
├── error.tsx               # Catches errors from / page
├── dashboard/
│   ├── error.tsx           # Catches errors from /dashboard and children
│   └── [projectId]/
│       └── error.tsx       # Catches errors from /dashboard/:projectId
```

Errors bubble up to the nearest parent `error.tsx`. Place error boundaries at the granularity that makes sense for error recovery — if an error in one section shouldn't break the entire dashboard, add `error.tsx` at the section level.

---

## Global Error Boundary

### `global-error.tsx`

The global error boundary catches errors in the root layout itself. This is the last-resort fallback:

```tsx
// app/global-error.tsx
"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-muted-foreground">
            The application encountered an unexpected error.
          </p>
          <Button className="mt-6" onClick={reset}>
            Try Again
          </Button>
        </div>
      </body>
    </html>
  )
}
```

`global-error.tsx` must include its own `<html>` and `<body>` tags because it replaces the root layout when triggered. Keep this file minimal — it cannot rely on providers, themes, or the design system's full setup.

---

## Not Found Pages

Handle missing resources with `not-found.tsx` and the `notFound()` function:

```tsx
// In a server component
import { notFound } from "next/navigation"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  const project = await getProject(projectId)

  if (!project) {
    notFound()
  }

  return <div>{/* project content */}</div>
}
```

```tsx
// app/dashboard/[projectId]/not-found.tsx
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import Link from "next/link"

export default function ProjectNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchIcon className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Project not found</EmptyTitle>
          <EmptyDescription>
            This project may have been deleted or you may not have access.
          </EmptyDescription>
        </EmptyHeader>
        <Button render={<Link href="/dashboard" />}>Back to Dashboard</Button>
      </Empty>
    </div>
  )
}
```

---

## Error Handling in Server Actions

When server actions fail, return structured error objects rather than throwing:

```tsx
// app/actions.ts
"use server"

type ActionResult =
  | { success: true }
  | { success: false; error: string }

export async function deleteProject(projectId: string): Promise<ActionResult> {
  try {
    await db.projects.delete(projectId)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (e) {
    console.error("Failed to delete project:", e)
    return { success: false, error: "Failed to delete project. Please try again." }
  }
}
```

```tsx
// In a client component
async function handleDelete() {
  const result = await deleteProject(projectId)

  if (result.success) {
    toastManager.add({ title: "Project deleted", type: "success" })
  } else {
    toastManager.add({
      title: "Delete failed",
      description: result.error,
      type: "error",
    })
  }
}
```

### Rules

1. **Never expose raw error messages** to users. Log the technical details server-side, return a human-readable message.
2. **Return, don't throw** from server actions. Thrown errors trigger `error.tsx` boundaries, which is too disruptive for most action failures.
3. **Use typed results** with a discriminated union (`{ success: true } | { success: false; error: string }`) for predictable handling.
4. **Include retry affordances** in error feedback when the action is retryable (Toast with action button, Alert with retry button).

---

## Error Severity Mapping

| Severity | Error Type | UI Component | Recovery |
|---|---|---|---|
| **Field** | Input validation (required, format, length) | `FieldError` | User corrects the field |
| **Form** | Server rejects form data | `Alert variant="error"` at top of form | User corrects and resubmits |
| **Action** | Background mutation fails (delete, update) | `Toast type="error"` with retry | User retries via toast action |
| **Section** | Data fetch fails for one part of the page | `Alert variant="error"` in section, or `Suspense` + `error.tsx` | User retries or navigates away |
| **Page** | Entire route fails to render | `error.tsx` with `Empty` + reset | User clicks "Try Again" |
| **App** | Root layout crashes | `global-error.tsx` | User clicks "Try Again" |

---

## References

- [Design Guide](./design-guide.md) — feedback components, Alert vs Toast decision
- [Coss UI Best Practices](./coss-ui-best-practices.md) — Field, FieldError, Toast, Alert APIs
- [Next.js Patterns](./next-patterns.md) — error.tsx, loading.tsx, not-found.tsx placement
