import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface SelectOption { value: string; label: string }
interface SelectProps { value: string; onValueChange: (value: string) => void; options: readonly SelectOption[]; label: string; className?: string }

export function Select({ value, onValueChange, options, label, className }: SelectProps) {
  return <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
    <SelectPrimitive.Trigger aria-label={label} className={`inline-flex h-10 min-w-0 items-center justify-between gap-2 rounded-lg border border-border bg-white px-3 text-sm text-foreground outline-none transition hover:bg-muted/60 focus:ring-2 focus:ring-accent ${className ?? ''}`}>
      <SelectPrimitive.Value /><SelectPrimitive.Icon><ChevronDown className="size-4 text-muted-foreground" /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content position="popper" sideOffset={6} className="z-[70] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-border bg-card p-1 shadow-2xl">
        <SelectPrimitive.Viewport>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
}

function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return <SelectPrimitive.Item value={value} className="relative flex cursor-default select-none items-center rounded-md py-2 pe-8 ps-3 text-sm text-muted-foreground outline-none data-[highlighted]:bg-muted data-[highlighted]:text-foreground">
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText><SelectPrimitive.ItemIndicator className="absolute end-2"><Check className="size-4 text-accent" /></SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
}
