import { BarChart3, LayoutDashboard, ReceiptText, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/ui'

const items = [{ id: 'dashboard' as const, Icon: LayoutDashboard }, { id: 'transactions' as const, Icon: ReceiptText }, { id: 'analytics' as const, Icon: BarChart3 }, { id: 'settings' as const, Icon: Settings }]
export function MobileNav() {
  const { t } = useTranslation(); const view = useUiStore((s) => s.view); const setView = useUiStore((s) => s.setView)
  return <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-white/95 px-2 pt-2 shadow-[0_-8px_30px_rgba(24,86,67,.08)] backdrop-blur-xl lg:hidden" aria-label={t('navigation.primary')}>
    {items.map(({ id, Icon }) => <button key={id} onClick={() => setView(id)} aria-current={view === id ? 'page' : undefined} className={cn('flex min-w-0 flex-col items-center gap-1 rounded-md px-1 py-1.5 text-[11px] transition', view === id ? 'text-accent' : 'text-muted-foreground')}><Icon className="size-[19px]" /><span className="max-w-full truncate">{t(`nav.${id}`)}</span></button>)}
  </nav>
}
