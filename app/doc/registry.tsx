"use client"

import * as React from "react"
import {
  ArchiveIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ChevronRightIcon,
  CopyIcon,
  EditIcon,
  EllipsisIcon,
  FilesIcon,
  FilmIcon,
  TrashIcon,
  SettingsIcon,
  ShareIcon,
  UserIcon,
  MailIcon,
  BellIcon,
  SearchIcon,
  HomeIcon,
  FileIcon,
  PlusIcon,
  InfoIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
  EyeIcon,
  LinkIcon,
  HashIcon,
  CalendarIcon,
  StarIcon,
  MoreVerticalIcon,
} from "lucide-react"

import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset"
import { Frame, FramePanel, FrameHeader, FrameTitle, FrameDescription } from "@/components/ui/frame"
import { Group, GroupSeparator } from "@/components/ui/group"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupInput } from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Meter, MeterTrack, MeterIndicator } from "@/components/ui/meter"
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
} from "@/components/ui/popover"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { RadioGroup, Radio } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import {
  Menu, MenuTrigger, MenuPopup, MenuGroup,
  MenuItem, MenuSeparator, MenuGroupLabel,
} from "@/components/ui/menu"
import {
  Sheet, SheetTrigger, SheetPopup, SheetHeader,
  SheetTitle, SheetDescription, SheetPanel,
  SheetFooter, SheetClose,
} from "@/components/ui/sheet"
import { ToastProvider, toastManager } from "@/components/ui/toast"
import { Spinner } from "@/components/ui/spinner"
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarButton } from "@/components/ui/toolbar"
import { PreviewCard, PreviewCardTrigger, PreviewCardPopup } from "@/components/ui/preview-card"
import { CheckboxGroup } from "@/components/ui/checkbox-group"

export interface ComponentEntry {
  name: string
  slug: string
  category: string
  preview: React.ReactNode
  code: string
}

function ToastDemo() {
  return (
    <ToastProvider position="bottom-right">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toastManager.add({
              title: "Changes saved",
              description: "Your settings have been updated.",
              type: "success",
            })
          }
        >
          Success
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toastManager.add({
              title: "Something went wrong",
              description: "Please try again later.",
              type: "error",
            })
          }
        >
          Error
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toastManager.add({
              title: "Update available",
              description: "A new version is ready to install.",
              type: "info",
            })
          }
        >
          Info
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toastManager.add({
              title: "Storage almost full",
              description: "You have used 90% of your storage.",
              type: "warning",
            })
          }
        >
          Warning
        </Button>
      </div>
    </ToastProvider>
  )
}

const selectItems = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
]

export const componentRegistry: ComponentEntry[] = [
  // ── Accordion ──
  {
    name: "Basic accordion",
    slug: "basic-accordion",
    category: "Accordion",
    preview: (
      <Accordion className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionPanel>Yes. It adheres to the WAI-ARIA design pattern.</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionPanel>Yes. It comes with default styles from Coss UI.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    ),
    code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion"

export default function Example() {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionPanel>Yes. It adheres to the WAI-ARIA design pattern.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionPanel>Yes. It comes with default styles from Coss UI.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}`,
  },

  // ── Alert ──
  {
    name: "Default alert",
    slug: "default-alert",
    category: "Alert",
    preview: (
      <Alert className="w-full">
        <InfoIcon className="size-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
    ),
    code: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function Example() {
  return (
    <Alert>
      <InfoIcon className="size-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  )
}`,
  },
  {
    name: "Error alert",
    slug: "error-alert",
    category: "Alert",
    preview: (
      <Alert variant="error" className="w-full">
        <CircleAlertIcon className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    ),
    code: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CircleAlertIcon } from "lucide-react"

export default function Example() {
  return (
    <Alert variant="error">
      <CircleAlertIcon className="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong. Please try again.</AlertDescription>
    </Alert>
  )
}`,
  },
  {
    name: "Success alert",
    slug: "success-alert",
    category: "Alert",
    preview: (
      <Alert variant="success" className="w-full">
        <CircleCheckIcon className="size-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
    ),
    code: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CircleCheckIcon } from "lucide-react"

export default function Example() {
  return (
    <Alert variant="success">
      <CircleCheckIcon className="size-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  )
}`,
  },
  {
    name: "Warning alert",
    slug: "warning-alert",
    category: "Alert",
    preview: (
      <Alert variant="warning" className="w-full">
        <TriangleAlertIcon className="size-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your session is about to expire.</AlertDescription>
      </Alert>
    ),
    code: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { TriangleAlertIcon } from "lucide-react"

export default function Example() {
  return (
    <Alert variant="warning">
      <TriangleAlertIcon className="size-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Your session is about to expire.</AlertDescription>
    </Alert>
  )
}`,
  },

  // ── Alert Dialog ──
  {
    name: "Basic alert dialog",
    slug: "basic-alert-dialog",
    category: "AlertDialog",
    preview: (
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose>Cancel</AlertDialogClose>
            <AlertDialogClose render={<Button />}>Continue</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    code: `import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter, AlertDialogTitle,
  AlertDialogDescription, AlertDialogClose,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Open Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button />}>Continue</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
  },

  // ── Avatar ──
  {
    name: "Avatar with image",
    slug: "avatar-with-image",
    category: "Avatar",
    preview: (
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Example() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
  },

  // ── Badge ──
  {
    name: "Default badge",
    slug: "default-badge",
    category: "Badge",
    preview: <Badge>Badge</Badge>,
    code: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return <Badge>Badge</Badge>
}`,
  },
  {
    name: "Outline badge",
    slug: "outline-badge",
    category: "Badge",
    preview: <Badge variant="outline">Badge</Badge>,
    code: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return <Badge variant="outline">Badge</Badge>
}`,
  },
  {
    name: "Secondary badge",
    slug: "secondary-badge",
    category: "Badge",
    preview: <Badge variant="secondary">Badge</Badge>,
    code: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return <Badge variant="secondary">Badge</Badge>
}`,
  },
  {
    name: "Destructive badge",
    slug: "destructive-badge",
    category: "Badge",
    preview: <Badge variant="destructive">Badge</Badge>,
    code: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return <Badge variant="destructive">Badge</Badge>
}`,
  },
  {
    name: "Info badge",
    slug: "info-badge",
    category: "Badge",
    preview: <Badge variant="info">Badge</Badge>,
    code: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return <Badge variant="info">Badge</Badge>
}`,
  },
  {
    name: "Success badge",
    slug: "success-badge",
    category: "Badge",
    preview: <Badge variant="success">Badge</Badge>,
    code: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return <Badge variant="success">Badge</Badge>
}`,
  },
  {
    name: "Warning badge",
    slug: "warning-badge",
    category: "Badge",
    preview: <Badge variant="warning">Badge</Badge>,
    code: `import { Badge } from "@/components/ui/badge"

export default function Example() {
  return <Badge variant="warning">Badge</Badge>
}`,
  },

  // ── Breadcrumb ──
  {
    name: "Basic breadcrumb",
    slug: "basic-breadcrumb",
    category: "Breadcrumb",
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
  },

  // ── Button ──
  {
    name: "Default button",
    slug: "default-button",
    category: "Button",
    preview: <Button>Button</Button>,
    code: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button>Button</Button>
}`,
  },
  {
    name: "Outline button",
    slug: "outline-button",
    category: "Button",
    preview: <Button variant="outline">Outline</Button>,
    code: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button variant="outline">Outline</Button>
}`,
  },
  {
    name: "Secondary button",
    slug: "secondary-button",
    category: "Button",
    preview: <Button variant="secondary">Secondary</Button>,
    code: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button variant="secondary">Secondary</Button>
}`,
  },
  {
    name: "Ghost button",
    slug: "ghost-button",
    category: "Button",
    preview: <Button variant="ghost">Ghost</Button>,
    code: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button variant="ghost">Ghost</Button>
}`,
  },
  {
    name: "Destructive button",
    slug: "destructive-button",
    category: "Button",
    preview: <Button variant="destructive">Destructive</Button>,
    code: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button variant="destructive">Destructive</Button>
}`,
  },
  {
    name: "Button with icon",
    slug: "button-with-icon",
    category: "Button",
    preview: (
      <Button>
        <PlusIcon data-icon="inline-start" />
        Add item
      </Button>
    ),
    code: `import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function Example() {
  return (
    <Button>
      <PlusIcon data-icon="inline-start" />
      Add item
    </Button>
  )
}`,
  },
  {
    name: "Button sizes",
    slug: "button-sizes",
    category: "Button",
    preview: (
      <div className="flex items-center gap-2">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="default">Default</Button>
        <Button size="lg">LG</Button>
      </div>
    ),
    code: `import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="default">Default</Button>
      <Button size="lg">LG</Button>
    </div>
  )
}`,
  },

  // ── Calendar ──
  {
    name: "Basic calendar",
    slug: "basic-calendar",
    category: "Calendar",
    preview: <Calendar className="rounded-lg border" />,
    code: `import { Calendar } from "@/components/ui/calendar"

export default function Example() {
  return <Calendar className="rounded-lg border" />
}`,
  },

  // ── Card ──
  {
    name: "Basic card",
    slug: "basic-card",
    category: "Card",
    preview: (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Card content area.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
    ),
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Card content area.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  )
}`,
  },

  // ── Checkbox ──
  {
    name: "Basic checkbox",
    slug: "basic-checkbox",
    category: "Checkbox",
    preview: (
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    ),
    code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`,
  },

  // ── Collapsible ──
  {
    name: "Basic collapsible",
    slug: "basic-collapsible",
    category: "Collapsible",
    preview: (
      <Collapsible className="w-full space-y-2">
        <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
          Toggle content
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="rounded-lg border p-4 text-sm">
            This is the collapsible content area.
          </div>
        </CollapsibleContent>
      </Collapsible>
    ),
    code: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Collapsible className="space-y-2">
      <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
        Toggle content
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-lg border p-4 text-sm">
          This is the collapsible content area.
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`,
  },

  // ── Dialog ──
  {
    name: "Basic dialog",
    slug: "basic-dialog",
    category: "Dialog",
    preview: (
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Field>
              <FieldLabel htmlFor="dialog-name">Name</FieldLabel>
              <Input id="dialog-name" placeholder="Enter your name" />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <DialogClose render={<Button />}>Save</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogFooter, DialogTitle,
  DialogDescription, DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Field>
            <FieldLabel htmlFor="dialog-name">Name</FieldLabel>
            <Input id="dialog-name" placeholder="Enter your name" />
          </Field>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  },

  // ── Empty ──
  {
    name: "Empty state",
    slug: "empty-state",
    category: "Empty",
    preview: (
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchIcon className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    ),
    code: `import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { SearchIcon } from "lucide-react"

export default function Example() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}`,
  },

  // ── Field ──
  {
    name: "Field with label",
    slug: "field-with-label",
    category: "Field",
    preview: (
      <Field className="w-full">
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="name@example.com" />
        <FieldDescription>We&apos;ll never share your email.</FieldDescription>
      </Field>
    ),
    code: `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="name@example.com" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  )
}`,
  },

  // ── Fieldset ──
  {
    name: "Basic fieldset",
    slug: "basic-fieldset",
    category: "Fieldset",
    preview: (
      <Fieldset className="w-full">
        <FieldsetLegend>Personal Information</FieldsetLegend>
        <div className="mt-3 space-y-3">
          <Field>
            <FieldLabel>First name</FieldLabel>
            <Input placeholder="John" />
          </Field>
          <Field>
            <FieldLabel>Last name</FieldLabel>
            <Input placeholder="Doe" />
          </Field>
        </div>
      </Fieldset>
    ),
    code: `import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <Fieldset>
      <FieldsetLegend>Personal Information</FieldsetLegend>
      <div className="mt-3 space-y-3">
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input placeholder="John" />
        </Field>
        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input placeholder="Doe" />
        </Field>
      </div>
    </Fieldset>
  )
}`,
  },

  // ── Frame ──
  {
    name: "Basic frame",
    slug: "basic-frame",
    category: "Frame",
    preview: (
      <Frame className="w-full">
        <FrameHeader>
          <FrameTitle>Section header</FrameTitle>
          <FrameDescription>Brief description about the section</FrameDescription>
        </FrameHeader>
        <FramePanel>
          <h3 className="font-semibold text-sm">Section title</h3>
          <p className="text-muted-foreground text-sm">Section description</p>
        </FramePanel>
      </Frame>
    ),
    code: `import { Frame, FramePanel, FrameHeader, FrameTitle, FrameDescription } from "@/components/ui/frame"

export default function Example() {
  return (
    <Frame>
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Brief description about the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h3 className="font-semibold text-sm">Section title</h3>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
    </Frame>
  )
}`,
  },
  {
    name: "Frame with multiple panels",
    slug: "frame-multiple-panels",
    category: "Frame",
    preview: (
      <Frame className="w-full">
        <FrameHeader>
          <FrameTitle>Section header</FrameTitle>
          <FrameDescription>Brief description about the section</FrameDescription>
        </FrameHeader>
        <FramePanel>
          <h3 className="font-semibold text-sm">Separated panel</h3>
          <p className="text-muted-foreground text-sm">Section description</p>
        </FramePanel>
        <FramePanel>
          <h3 className="font-semibold text-sm">Separated panel</h3>
          <p className="text-muted-foreground text-sm">Section description</p>
        </FramePanel>
      </Frame>
    ),
    code: `import { Frame, FramePanel, FrameHeader, FrameTitle, FrameDescription } from "@/components/ui/frame"

export default function Example() {
  return (
    <Frame>
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Brief description about the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h3 className="font-semibold text-sm">Separated panel</h3>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
      <FramePanel>
        <h3 className="font-semibold text-sm">Separated panel</h3>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
    </Frame>
  )
}`,
  },

  // ── Group ──
  {
    name: "Group",
    slug: "group",
    category: "Group",
    preview: (
      <Group aria-label="File actions">
        <Button variant="outline">
          <FilesIcon aria-hidden="true" />
          Files
        </Button>
        <GroupSeparator />
        <Button variant="outline">
          <FilmIcon aria-hidden="true" />
          Media
        </Button>
        <GroupSeparator />
        <Menu>
          <MenuTrigger
            render={<Button aria-label="Menu" size="icon" variant="outline" />}
          >
            <EllipsisIcon className="size-4" />
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuItem>
              <EditIcon aria-hidden="true" />
              Edit
            </MenuItem>
            <MenuItem>
              <ArchiveIcon aria-hidden="true" />
              Archive
            </MenuItem>
            <MenuItem>
              <ShareIcon aria-hidden="true" />
              Share
            </MenuItem>
            <MenuItem variant="destructive">
              <TrashIcon aria-hidden="true" />
              Delete
            </MenuItem>
          </MenuPopup>
        </Menu>
      </Group>
    ),
    code: `import {
  ArchiveIcon,
  EditIcon,
  EllipsisIcon,
  FilesIcon,
  FilmIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Group, GroupSeparator } from "@/components/ui/group"
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/components/ui/menu"

export default function Particle() {
  return (
    <Group aria-label="File actions">
      <Button variant="outline">
        <FilesIcon aria-hidden="true" />
        Files
      </Button>
      <GroupSeparator />
      <Button variant="outline">
        <FilmIcon aria-hidden="true" />
        Media
      </Button>
      <GroupSeparator />
      <Menu>
        <MenuTrigger
          render={<Button aria-label="Menu" size="icon" variant="outline" />}
        >
          <EllipsisIcon className="size-4" />
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem>
            <EditIcon aria-hidden="true" />
            Edit
          </MenuItem>
          <MenuItem>
            <ArchiveIcon aria-hidden="true" />
            Archive
          </MenuItem>
          <MenuItem>
            <ShareIcon aria-hidden="true" />
            Share
          </MenuItem>
          <MenuItem variant="destructive">
            <TrashIcon aria-hidden="true" />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>
    </Group>
  )
}`,
  },

  // ── Input ──
  {
    name: "Basic input",
    slug: "basic-input",
    category: "Input",
    preview: <Input placeholder="Enter text..." className="w-full" />,
    code: `import { Input } from "@/components/ui/input"

export default function Example() {
  return <Input placeholder="Enter text..." />
}`,
  },
  {
    name: "Input sizes",
    slug: "input-sizes",
    category: "Input",
    preview: (
      <div className="flex w-full flex-col gap-3">
        <Input size="sm" placeholder="Small" />
        <Input size="default" placeholder="Default" />
        <Input size="lg" placeholder="Large" />
      </div>
    ),
    code: `import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      <Input size="sm" placeholder="Small" />
      <Input size="default" placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  )
}`,
  },

  // ── InputGroup ──
  {
    name: "Input with addon",
    slug: "input-with-addon",
    category: "InputGroup",
    preview: (
      <InputGroup className="w-full">
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
    ),
    code: `import { InputGroup, InputGroupAddon, InputGroupText, InputGroupInput } from "@/components/ui/input-group"

export default function Example() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  )
}`,
  },

  // ── Kbd ──
  {
    name: "Keyboard shortcuts",
    slug: "keyboard-shortcuts",
    category: "Kbd",
    preview: (
      <div className="flex items-center gap-4">
        <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
        <KbdGroup><Kbd>Ctrl</Kbd><Kbd>C</Kbd></KbdGroup>
        <Kbd>Enter</Kbd>
      </div>
    ),
    code: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
      <KbdGroup><Kbd>Ctrl</Kbd><Kbd>C</Kbd></KbdGroup>
      <Kbd>Enter</Kbd>
    </div>
  )
}`,
  },

  // ── Label ──
  {
    name: "Basic label",
    slug: "basic-label",
    category: "Label",
    preview: <Label>Email address</Label>,
    code: `import { Label } from "@/components/ui/label"

export default function Example() {
  return <Label>Email address</Label>
}`,
  },

  // ── Meter ──
  {
    name: "Basic meter",
    slug: "basic-meter",
    category: "Meter",
    preview: (
      <Meter value={60} className="w-full">
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    ),
    code: `import { Meter, MeterTrack, MeterIndicator } from "@/components/ui/meter"

export default function Example() {
  return (
    <Meter value={60}>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}`,
  },

  // ── NumberField ──
  {
    name: "Basic number field",
    slug: "basic-number-field",
    category: "NumberField",
    preview: (
      <NumberField defaultValue={5}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    ),
    code: `import {
  NumberField, NumberFieldGroup, NumberFieldDecrement,
  NumberFieldIncrement, NumberFieldInput,
} from "@/components/ui/number-field"

export default function Example() {
  return (
    <NumberField defaultValue={5}>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}`,
  },

  // ── Pagination ──
  {
    name: "Basic pagination",
    slug: "basic-pagination",
    category: "Pagination",
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    code: `import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "@/components/ui/pagination"

export default function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
  },

  // ── Popover ──
  {
    name: "Basic popover",
    slug: "basic-popover",
    category: "Popover",
    preview: (
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>This is a popover description.</PopoverDescription>
        </PopoverContent>
      </Popover>
    ),
    code: `import {
  Popover, PopoverTrigger, PopoverContent,
  PopoverTitle, PopoverDescription,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Popover Title</PopoverTitle>
        <PopoverDescription>This is a popover description.</PopoverDescription>
      </PopoverContent>
    </Popover>
  )
}`,
  },

  // ── Progress ──
  {
    name: "Basic progress",
    slug: "basic-progress",
    category: "Progress",
    preview: (
      <Progress value={45} className="w-full">
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
    ),
    code: `import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"

export default function Example() {
  return (
    <Progress value={45}>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  )
}`,
  },

  // ── RadioGroup ──
  {
    name: "Basic radio group",
    slug: "basic-radio-group",
    category: "RadioGroup",
    preview: (
      <RadioGroup defaultValue="option-1">
        <div className="flex items-center gap-2">
          <Radio value="option-1" id="radio-1" />
          <Label htmlFor="radio-1">Option 1</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio value="option-2" id="radio-2" />
          <Label htmlFor="radio-2">Option 2</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio value="option-3" id="radio-3" />
          <Label htmlFor="radio-3">Option 3</Label>
        </div>
      </RadioGroup>
    ),
    code: `import { RadioGroup, Radio } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center gap-2">
        <Radio value="option-1" id="radio-1" />
        <Label htmlFor="radio-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="option-2" id="radio-2" />
        <Label htmlFor="radio-2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio value="option-3" id="radio-3" />
        <Label htmlFor="radio-3">Option 3</Label>
      </div>
    </RadioGroup>
  )
}`,
  },

  // ── ScrollArea ──
  {
    name: "Scroll area",
    slug: "scroll-area",
    category: "ScrollArea",
    preview: (
      <ScrollArea className="h-48 w-full rounded-lg border p-4">
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="text-sm">Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea>
    ),
    code: `import { ScrollArea } from "@/components/ui/scroll-area"

export default function Example() {
  return (
    <ScrollArea className="h-48 rounded-lg border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="text-sm">Item {i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
  },

  // ── Select ──
  {
    name: "Basic select",
    slug: "basic-select",
    category: "Select",
    preview: (
      <Select items={selectItems} defaultValue={null}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ),
    code: `import {
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectItem, SelectGroup,
} from "@/components/ui/select"

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
]

export default function Example() {
  return (
    <Select items={items} defaultValue={null}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}`,
  },

  // ── Separator ──
  {
    name: "Horizontal separator",
    slug: "horizontal-separator",
    category: "Separator",
    preview: (
      <div className="w-full space-y-3">
        <p className="text-sm">Content above</p>
        <Separator />
        <p className="text-sm">Content below</p>
      </div>
    ),
    code: `import { Separator } from "@/components/ui/separator"

export default function Example() {
  return (
    <div className="space-y-3">
      <p className="text-sm">Content above</p>
      <Separator />
      <p className="text-sm">Content below</p>
    </div>
  )
}`,
  },

  // ── Skeleton ──
  {
    name: "Basic skeleton",
    slug: "basic-skeleton",
    category: "Skeleton",
    preview: (
      <div className="flex w-full items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ),
    code: `import { Skeleton } from "@/components/ui/skeleton"

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}`,
  },

  // ── Slider ──
  {
    name: "Basic slider",
    slug: "basic-slider",
    category: "Slider",
    preview: <Slider defaultValue={[50]} className="w-full" />,
    code: `import { Slider } from "@/components/ui/slider"

export default function Example() {
  return <Slider defaultValue={[50]} />
}`,
  },

  // ── Switch ──
  {
    name: "Basic switch",
    slug: "basic-switch",
    category: "Switch",
    preview: (
      <div className="flex items-center gap-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    ),
    code: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}`,
  },

  // ── Table ──
  {
    name: "Basic table",
    slug: "basic-table",
    category: "Table",
    preview: (
      <Table className="w-full">
        <TableCaption>Recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV003</TableCell>
            <TableCell>Unpaid</TableCell>
            <TableCell className="text-right">$350.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    code: `import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell, TableCaption,
} from "@/components/ui/table"

export default function Example() {
  return (
    <Table>
      <TableCaption>Recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}`,
  },

  // ── Tabs ──
  {
    name: "Basic tabs",
    slug: "basic-tabs",
    category: "Tabs",
    preview: (
      <Tabs defaultValue="tab1" className="w-full">
        <TabsList>
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <p className="text-sm text-muted-foreground p-4">Account settings go here.</p>
        </TabsContent>
        <TabsContent value="tab2">
          <p className="text-sm text-muted-foreground p-4">Password settings go here.</p>
        </TabsContent>
      </Tabs>
    ),
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Example() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground p-4">Account settings go here.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-muted-foreground p-4">Password settings go here.</p>
      </TabsContent>
    </Tabs>
  )
}`,
  },

  // ── Textarea ──
  {
    name: "Basic textarea",
    slug: "basic-textarea",
    category: "Textarea",
    preview: <Textarea placeholder="Type your message here..." className="w-full" />,
    code: `import { Textarea } from "@/components/ui/textarea"

export default function Example() {
  return <Textarea placeholder="Type your message here..." />
}`,
  },

  // ── Toggle ──
  {
    name: "Default toggle",
    slug: "default-toggle",
    category: "Toggle",
    preview: (
      <Toggle aria-label="Toggle bold">
        <BoldIcon className="size-4" />
      </Toggle>
    ),
    code: `import { Toggle } from "@/components/ui/toggle"
import { BoldIcon } from "lucide-react"

export default function Example() {
  return (
    <Toggle aria-label="Toggle bold">
      <BoldIcon className="size-4" />
    </Toggle>
  )
}`,
  },
  {
    name: "Outline toggle",
    slug: "outline-toggle",
    category: "Toggle",
    preview: (
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon className="size-4" />
      </Toggle>
    ),
    code: `import { Toggle } from "@/components/ui/toggle"
import { ItalicIcon } from "lucide-react"

export default function Example() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <ItalicIcon className="size-4" />
    </Toggle>
  )
}`,
  },

  // ── ToggleGroup ──
  {
    name: "Toggle group",
    slug: "toggle-group",
    category: "ToggleGroup",
    preview: (
      <ToggleGroup>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

export default function Example() {
  return (
    <ToggleGroup>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`,
  },

  // ── Tooltip ──
  {
    name: "Basic tooltip",
    slug: "basic-tooltip",
    category: "Tooltip",
    preview: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover me
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    code: `import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  },

  // ── Menu ──
  {
    name: "Basic menu",
    slug: "basic-menu",
    category: "Menu",
    preview: (
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
        <MenuPopup>
          <MenuGroup>
            <MenuGroupLabel>Account</MenuGroupLabel>
            <MenuItem>
              <UserIcon />
              Profile
            </MenuItem>
            <MenuItem>
              <SettingsIcon />
              Settings
            </MenuItem>
            <MenuItem>
              <CopyIcon />
              Duplicate
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem variant="destructive">
            <TrashIcon />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>
    ),
    code: `import {
  Menu, MenuTrigger, MenuPopup, MenuGroup,
  MenuItem, MenuSeparator, MenuGroupLabel,
} from "@/components/ui/menu"
import { Button } from "@/components/ui/button"
import { UserIcon, SettingsIcon, CopyIcon, TrashIcon } from "lucide-react"

export default function Example() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Actions</MenuTrigger>
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Account</MenuGroupLabel>
          <MenuItem onClick={() => {}}>
            <UserIcon />
            Profile
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <SettingsIcon />
            Settings
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <CopyIcon />
            Duplicate
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem variant="destructive" onClick={() => {}}>
          <TrashIcon />
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  )
}`,
  },
  {
    name: "Icon menu trigger",
    slug: "icon-menu-trigger",
    category: "Menu",
    preview: (
      <Menu>
        <MenuTrigger render={<Button variant="ghost" size="icon" />}>
          <MoreVerticalIcon />
          <span className="sr-only">Options</span>
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem>
            <CopyIcon />
            Copy
          </MenuItem>
          <MenuItem>
            <EyeIcon />
            View
          </MenuItem>
          <MenuSeparator />
          <MenuItem variant="destructive">
            <TrashIcon />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>
    ),
    code: `import {
  Menu, MenuTrigger, MenuPopup,
  MenuItem, MenuSeparator,
} from "@/components/ui/menu"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon, CopyIcon, EyeIcon, TrashIcon } from "lucide-react"

export default function Example() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="ghost" size="icon" />}>
        <MoreVerticalIcon />
        <span className="sr-only">Options</span>
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuItem onClick={() => {}}>
          <CopyIcon />
          Copy
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <EyeIcon />
          View
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive" onClick={() => {}}>
          <TrashIcon />
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  )
}`,
  },

  // ── Sheet ──
  {
    name: "Basic sheet",
    slug: "basic-sheet",
    category: "Sheet",
    preview: (
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
        <SheetPopup side="right">
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>Update your personal information.</SheetDescription>
          </SheetHeader>
          <SheetPanel>
            <div className="space-y-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input placeholder="Enter your name" />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="name@example.com" />
              </Field>
            </div>
          </SheetPanel>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
            <Button>Save Changes</Button>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    ),
    code: `import {
  Sheet, SheetTrigger, SheetPopup, SheetHeader,
  SheetTitle, SheetDescription, SheetPanel,
  SheetFooter, SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
      <SheetPopup side="right">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>Update your personal information.</SheetDescription>
        </SheetHeader>
        <SheetPanel>
          <div className="space-y-4">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="Enter your name" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="name@example.com" />
            </Field>
          </div>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}`,
  },

  // ── Toast ──
  {
    name: "Toast variants",
    slug: "toast-variants",
    category: "Toast",
    preview: <ToastDemo />,
    code: `import { toastManager } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

// Ensure <ToastProvider> wraps your app in the root layout

export default function Example() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            title: "Changes saved",
            description: "Your settings have been updated.",
            type: "success",
          })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            title: "Something went wrong",
            description: "Please try again later.",
            type: "error",
          })
        }
      >
        Error Toast
      </Button>
    </div>
  )
}`,
  },

  // ── Spinner ──
  {
    name: "Basic spinner",
    slug: "basic-spinner",
    category: "Spinner",
    preview: (
      <div className="flex items-center gap-4">
        <Spinner className="size-4" />
        <Spinner className="size-5" />
        <Spinner className="size-6" />
      </div>
    ),
    code: `import { Spinner } from "@/components/ui/spinner"

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-5" />
      <Spinner className="size-6" />
    </div>
  )
}`,
  },
  {
    name: "Spinner in button",
    slug: "spinner-in-button",
    category: "Spinner",
    preview: (
      <Button disabled>
        <Spinner className="size-4" data-icon="inline-start" />
        Loading...
      </Button>
    ),
    code: `import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Button disabled>
      <Spinner className="size-4" data-icon="inline-start" />
      Loading...
    </Button>
  )
}`,
  },

  // ── Toolbar ──
  {
    name: "Basic toolbar",
    slug: "basic-toolbar",
    category: "Toolbar",
    preview: (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
            <BoldIcon className="size-4" />
            <span className="sr-only">Bold</span>
          </ToolbarButton>
          <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
            <ItalicIcon className="size-4" />
            <span className="sr-only">Italic</span>
          </ToolbarButton>
          <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
            <UnderlineIcon className="size-4" />
            <span className="sr-only">Underline</span>
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator orientation="vertical" />
        <ToolbarGroup>
          <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
            <AlignLeftIcon className="size-4" />
            <span className="sr-only">Align left</span>
          </ToolbarButton>
          <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
            <AlignCenterIcon className="size-4" />
            <span className="sr-only">Align center</span>
          </ToolbarButton>
          <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
            <AlignRightIcon className="size-4" />
            <span className="sr-only">Align right</span>
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    ),
    code: `import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarButton } from "@/components/ui/toolbar"
import { Button } from "@/components/ui/button"
import {
  BoldIcon, ItalicIcon, UnderlineIcon,
  AlignLeftIcon, AlignCenterIcon, AlignRightIcon,
} from "lucide-react"

export default function Example() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
          <BoldIcon className="size-4" />
          <span className="sr-only">Bold</span>
        </ToolbarButton>
        <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
          <ItalicIcon className="size-4" />
          <span className="sr-only">Italic</span>
        </ToolbarButton>
        <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
          <UnderlineIcon className="size-4" />
          <span className="sr-only">Underline</span>
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator orientation="vertical" />
      <ToolbarGroup>
        <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
          <AlignLeftIcon className="size-4" />
          <span className="sr-only">Align left</span>
        </ToolbarButton>
        <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
          <AlignCenterIcon className="size-4" />
          <span className="sr-only">Align center</span>
        </ToolbarButton>
        <ToolbarButton render={<Button variant="ghost" size="icon-xs" />}>
          <AlignRightIcon className="size-4" />
          <span className="sr-only">Align right</span>
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  )
}`,
  },

  // ── PreviewCard ──
  {
    name: "Preview card",
    slug: "preview-card",
    category: "PreviewCard",
    preview: (
      <PreviewCard>
        <PreviewCardTrigger
          render={<a href="#" className="text-sm font-medium underline underline-offset-4" />}
        >
          Hover to preview
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">Jane Doe</p>
                <p className="text-xs text-muted-foreground">@janedoe</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Full-stack developer building great software.
            </p>
          </div>
        </PreviewCardPopup>
      </PreviewCard>
    ),
    code: `import { PreviewCard, PreviewCardTrigger, PreviewCardPopup } from "@/components/ui/preview-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Example() {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        render={<a href="#" className="text-sm font-medium underline underline-offset-4" />}
      >
        Hover to preview
      </PreviewCardTrigger>
      <PreviewCardPopup>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Jane Doe</p>
              <p className="text-xs text-muted-foreground">@janedoe</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Full-stack developer building great software.
          </p>
        </div>
      </PreviewCardPopup>
    </PreviewCard>
  )
}`,
  },

  // ── CheckboxGroup ──
  {
    name: "Checkbox group",
    slug: "checkbox-group",
    category: "CheckboxGroup",
    preview: (
      <CheckboxGroup>
        <div className="flex items-center gap-2">
          <Checkbox id="cg-email" defaultChecked />
          <Label htmlFor="cg-email">Email notifications</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cg-push" />
          <Label htmlFor="cg-push">Push notifications</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cg-sms" />
          <Label htmlFor="cg-sms">SMS notifications</Label>
        </div>
      </CheckboxGroup>
    ),
    code: `import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <CheckboxGroup>
      <div className="flex items-center gap-2">
        <Checkbox id="cg-email" defaultChecked />
        <Label htmlFor="cg-email">Email notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cg-push" />
        <Label htmlFor="cg-push">Push notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cg-sms" />
        <Label htmlFor="cg-sms">SMS notifications</Label>
      </div>
    </CheckboxGroup>
  )
}`,
  },
]

export const categoryDescriptions: Record<string, string> = {
  Accordion:
    "Reveal related content progressively. Use for FAQs, settings groups, or long content that would overwhelm if shown all at once.",
  Alert:
    "Persistent contextual messages users need to read and act on. Use semantic variants (error, success, warning) for meaning. For transient confirmations, use Toast instead.",
  AlertDialog:
    "Gate destructive or irreversible actions behind explicit confirmation. Cannot be dismissed by backdrop click — forces confirm or cancel. Use two-tier pattern: destructive-outline trigger → destructive confirm.",
  Avatar:
    "Represent users or entities visually. Always include AvatarFallback with initials for when images fail to load.",
  Badge:
    "Label status, categories, or counts on other elements. Use semantic variants (success, warning, destructive) for meaning — never decoration. Works well in CardHeader, table cells, and list items.",
  Breadcrumb:
    "Show location within a page hierarchy. Place above the page header, below persistent navigation. Use on nested pages for wayfinding.",
  Button:
    "Default variant for primary actions, outline for secondary, ghost for tertiary/toolbar. destructive only inside AlertDialog confirms. Default height is 32px — use size=\"lg\" for 36px, size=\"xs\" for compact UI.",
  Calendar:
    "Date selection for forms. Pair with Popover for inline date pickers. Wrap in Field for form integration.",
  Card:
    "Standalone content blocks with metadata and actions. Use for previews, summaries, and list entries. Prefer Frame for grouped settings or config sections.",
  Checkbox:
    "Binary choice in forms. Always pair with a Label and wrap in Field. Use for multi-select options; use RadioGroup for single-select.",
  Collapsible:
    "Show/hide supplementary content inline. Use when secondary content is optional and toggleable. For structured expand/collapse lists, prefer Accordion.",
  Dialog:
    "Focused data entry forms and multi-step flows. Dismissible via backdrop and Escape. Structure: Header → Panel (scrollable) → Footer. Uses bottomStickOnMobile by default.",
  Empty:
    "Zero-data placeholder for lists, tables, or content areas. Include icon, title, and description. Add an action button when users can resolve the empty state themselves.",
  Field:
    "Wraps every form control. Auto-associates labels, descriptions, and errors via aria attributes. Always include FieldLabel — use sr-only if visually hidden.",
  Fieldset:
    "Semantically group related form fields with FieldsetLegend. Use for notification preferences, address blocks, or permission sets.",
  Frame:
    "Primary section container for settings pages, config panels, and grouped content. Provides muted background with white FramePanel children. Stack with space-y-10.",
  Group:
    "Visually join related controls into a single row. Always use GroupSeparator between items for proper focus management and visual separation.",
  Input:
    "Standard text input for forms. Always wrap in Field with FieldLabel. Default height is 32px — use size=\"lg\" for conventional 36px.",
  InputGroup:
    "Combine inputs with text prefixes, suffixes, or action buttons. Use for URLs, currency amounts, or any input needing contextual addons.",
  Kbd:
    "Display keyboard shortcuts. Use KbdGroup for multi-key combos. Pair with Tooltip to show shortcuts on hover for icon-only buttons.",
  Label:
    "Associate text with a form control. Prefer FieldLabel inside Field — use standalone Label only for custom layouts outside the Field system.",
  Meter:
    "Display a measured value within a known range (storage used, quota remaining). Not for progress — use Progress for operations with a completion state.",
  NumberField:
    "Numeric input with increment/decrement controls. Use for quantities, counts, or any bounded numeric value. Wrap in Field for form integration.",
  Pagination:
    "Navigate large datasets split across pages. Place below the data list or table with mt-8 spacing.",
  Popover:
    "Small contextual controls anchored to a trigger. Use for compact settings, color pickers, or mini-forms. Dismissible by clicking outside. Not for hover text — use Tooltip.",
  Progress:
    "Determinate operations with a completion state (file uploads, multi-step flows). Not for static measurements — use Meter instead.",
  RadioGroup:
    "Single-select from a small set of options. Pair each Radio with a Label. Use Select for longer option lists (5+).",
  ScrollArea:
    "Constrain content to a fixed height with custom scrollbars. Use for lists, logs, or panels where content exceeds the container.",
  Select:
    "Choose one option from a list. Use for 5+ options; for fewer, prefer RadioGroup. Always wrap in Field with FieldLabel.",
  Separator:
    "Divide content in flat layouts when no container is needed. Use between logically distinct groups in a list or toolbar.",
  Skeleton:
    "Loading placeholder matching real content dimensions. Match widths and heights to actual content for smooth load transitions.",
  Slider:
    "Select a value from a continuous range. Use for volume, opacity, or any analog setting. Pair with a visible value label.",
  Switch:
    "Toggle a boolean setting with immediate effect. Use for on/off preferences. Wrap in Field with FieldLabel for form integration.",
  Table:
    "Display structured tabular data. Use TableCaption for accessibility. Right-align numeric columns. Pair with Pagination for large datasets.",
  Tabs:
    "Switch between related views in the same space without page navigation. Use for 2–5 views. Not for primary navigation — use links/routing.",
  Textarea:
    "Multi-line text input. Always wrap in Field with FieldLabel. Use for bios, descriptions, comments, or any long-form text.",
  Toggle:
    "Single on/off toggle button, often icon-only. Always include an aria-label. Use for formatting toggles, view modes, or feature flags.",
  ToggleGroup:
    "Mutually exclusive or multi-select toggle buttons. Use for text alignment, view switching, or formatting toolbars.",
  Tooltip:
    "Brief explanatory text on hover/focus. Use for icon-only buttons and truncated labels. Keep to a single short line. Never put interactive content inside.",
  Menu:
    "Action lists and contextual options anchored to a trigger. Use onClick (not onSelect). Place destructive items last after MenuSeparator. Import from @/components/ui/menu.",
  Sheet:
    "Side panel overlay for detail views, filters, or secondary workflows. Structure: Header → Panel (scrollable) → Footer. Use for supplementary content that doesn't warrant a full page navigation.",
  Toast:
    "Transient notifications for brief action confirmations. Use toastManager.add() with type (success, error, info, warning). If users need to read and act on it, use Alert instead.",
  Spinner:
    "Animated loading indicator. Use for indeterminate loading states (API calls, processing). Pair with disabled state on buttons. For content placeholders, use Skeleton instead.",
  Toolbar:
    "Accessible container for grouped controls with arrow-key navigation. Use ToolbarGroup to cluster related buttons and ToolbarSeparator between groups. Ideal for editor formatting bars.",
  PreviewCard:
    "Content preview card shown on hover/focus (also exported as HoverCard). Use for user profiles, link previews, or quick info. Not for interactive content — use Popover instead.",
  CheckboxGroup:
    "Manages a group of related Checkbox controls as a single form value. Use for multi-select preferences like notifications or permissions. For single-select, use RadioGroup.",
}

export function getCategories(): string[] {
  const categories = new Set(componentRegistry.map((c) => c.category))
  return Array.from(categories).sort()
}
