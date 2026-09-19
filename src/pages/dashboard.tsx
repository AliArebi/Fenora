import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ExpenseDonut } from '@/components/charts/expense-donut'
import { TrendChart } from '@/components/charts/trend-chart'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { TransactionList } from '@/components/transactions/transaction-list'
import { calculateTotals, groupExpenseByCategory, groupLastSixMonths } from '@/lib/finance'
import { usePreferencesStore } from '@/stores/preferences'
import { useUiStore } from '@/stores/ui'
import type { Transaction } from '@/types/finance'

export function DashboardPage({ transactions, onDelete }: { transactions: Transaction[]; onDelete: (transaction: Transaction) => void }) {
  const { t } = useTranslation(); const { currency, language } = usePreferencesStore(); const openEditor = useUiStore((s) => s.openEditor); const setView = useUiStore((s) => s.setView)
  const locale = language === 'ar' ? 'ar' : language === 'de' ? 'de-DE' : 'en-US'
  const totals = useMemo(() => calculateTotals(transactions), [transactions])
  const expenses = useMemo(() => groupExpenseByCategory(transactions), [transactions])
  const trend = useMemo(() => groupLastSixMonths(transactions), [transactions])
  return <div className="space-y-6"><SummaryCards totals={totals} currency={currency} locale={locale} /><div className="grid gap-6 xl:grid-cols-[.78fr_1.35fr]"><ExpenseDonut data={expenses} currency={currency} locale={locale} /><TrendChart data={trend} currency={currency} locale={locale} /></div><section><div className="mb-4 flex items-end justify-between"><div><h2 className="font-semibold">{t('recent.title')}</h2><p className="mt-1 text-sm text-muted-foreground">{t('recent.subtitle')}</p></div><Button variant="ghost" size="sm" onClick={() => setView('transactions')}>{t('recent.viewAll')}</Button></div><TransactionList transactions={transactions.slice(0, 5)} currency={currency} locale={locale} onEdit={openEditor} onDelete={onDelete} /></section></div>
}
