import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
}

export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel, cancelLabel, onConfirm }: ConfirmDialogProps) {
  return <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 z-[60] bg-slate-900/30 backdrop-blur-[2px]" />
      <AlertDialog.Content className="fixed start-1/2 top-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-2xl outline-none rtl:translate-x-1/2">
        <AlertDialog.Title className="text-lg font-semibold">{title}</AlertDialog.Title>
        <AlertDialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">{description}</AlertDialog.Description>
        <div className="mt-6 flex justify-end gap-3">
          <AlertDialog.Cancel asChild><Button variant="secondary">{cancelLabel}</Button></AlertDialog.Cancel>
          <AlertDialog.Action asChild><Button variant="destructive" onClick={onConfirm}>{confirmLabel}</Button></AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
}
