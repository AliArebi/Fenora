import { ArrowDownRight, ArrowUpRight, Landmark, Receipt, TrendingUp, WalletCards } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/lib/utils'
import type { Currency, FinanceTotals } from '@/types/finance'

const cards = [
  { key: 'income' as const, Icon: ArrowUpRight, tone: 'text-emerald-300 bg-emerald-400/10' },
  { key: 'expense' as const, Icon: ArrowDownRight, tone: 'text-rose-300 bg-rose-400/10' },
  { key: 'bill' as const, Icon: Receipt, tone: 'text-amber-300 bg-amber-400/10' },
  { key: 'investment' as const, Icon: TrendingUp, tone: 'text-blue-300 bg-blue-400/10' },
  { key: 'balance' as const, Icon: Landmark, tone: 'text-accent bg-accent/10' },
]

export function SummaryCards({ totals, currency, locale }: { totals: FinanceTotals; currency: Currency; locale: string }) {
  const { t } = useTranslation()
  return <section className="metric-grid grid gap-3" aria-label={t('header.dashboard')}>
    {cards.map(({ key, Icon, tone }) => <article key={key} className={`panel relative overflow-hidden p-4 sm:p-5 ${key === 'balance' ? 'border-accent/20 bg-[linear-gradient(140deg,rgba(124,244,200,.07),transparent_65%)]' : ''}`}>
      <div className="mb-5 flex items-start justify-between gap-3"><span className="text-sm text-muted-foreground">{t(`summary.${key}`)}</span><span className={`grid size-8 place-items-center rounded-lg ${tone}`}><Icon className="size-4" /></span></div>
      <p className="truncate text-xl font-semibold tracking-tight sm:text-2xl" dir="ltr">{formatCurrency(totals[key], currency, locale)}</p>
      <p className="mt-2 min-h-4 text-xs text-muted-foreground">{key === 'balance' ? t('summary.balanceHint') : <span className="inline-flex items-center gap-1"><WalletCards className="size-3" />{t(`type.${key}`)}</span>}</p>
    </article>)}
  </section>
}
