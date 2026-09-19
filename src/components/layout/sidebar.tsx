import { BarChart3, LayoutDashboard, ReceiptText, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/brand/logo'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/stores/ui'
import type { AppView } from '@/types/finance'

const nav = [
  { id: 'dashboard' as const, icon: LayoutDashboard },
  { id: 'transactions' as const, icon: ReceiptText },
  { id: 'analytics' as const, icon: BarChart3 },
  { id: 'settings' as const, icon: Settings },
]

export function Sidebar() {
  const { t } = useTranslation()
  const view = useUiStore((state) => state.view)
  const setView = useUiStore((state) => state.setView)
  return <aside className="fixed inset-y-0 start-0 z-30 hidden w-64 flex-col border-e border-border bg-[#0b0c10]/95 px-4 py-6 backdrop-blur lg:flex">
    <Logo className="px-2" />
    <p className="mb-9 mt-2 px-2 text-xs text-muted-foreground">{t('brandTagline')}</p>
    <nav className="space-y-1" aria-label={t('navigation.primary')}>
      {nav.map(({ id, icon: Icon }) => <NavButton key={id} id={id} active={view === id} onClick={() => setView(id)}><Icon className="size-[18px]" />{t(`nav.${id}`)}</NavButton>)}
    </nav>
    <div className="mt-auto rounded-xl border border-border bg-white/[.025] p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium"><span className="size-1.5 rounded-full bg-accent" />{t('common.localFirst')}</div>
      <p className="text-xs leading-5 text-muted-foreground">{t('header.privacy')}</p>
    </div>
  </aside>
}

function NavButton({ id, active, onClick, children }: { id: AppView; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} aria-current={active ? 'page' : undefined} data-view={id} className={cn('flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition', active ? 'bg-white/[.075] text-white shadow-[inset_3px_0_0_hsl(var(--accent))] rtl:shadow-[inset_-3px_0_0_hsl(var(--accent))]' : 'text-muted-foreground hover:bg-white/[.04] hover:text-foreground')}>{children}</button>
}
