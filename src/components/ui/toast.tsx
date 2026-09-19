import { CheckCircle2, CircleAlert, X } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useUiStore } from '@/stores/ui'

export function ToastViewport() {
  const { t } = useTranslation()
  const toast = useUiStore((state) => state.toast)
  const dismiss = useUiStore((state) => state.dismissToast)
  useEffect(() => { if (!toast) return; const timeout = window.setTimeout(dismiss, 3200); return () => clearTimeout(timeout) }, [toast, dismiss])
  if (!toast) return null
  const Icon = toast.tone === 'error' ? CircleAlert : CheckCircle2
  return <div key={toast.id} role="status" aria-live="polite" className="fixed bottom-5 start-1/2 z-[80] flex -translate-x-1/2 animate-toast-in items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-2xl rtl:translate-x-1/2">
    <Icon className={`size-4 ${toast.tone === 'error' ? 'text-red-400' : 'text-accent'}`} /><span>{toast.message}</span>
    <button onClick={dismiss} className="ms-2 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={t('actions.dismiss')}><X className="size-3.5" /></button>
  </div>
}
