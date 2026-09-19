import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ExpenseDonut } from '@/components/charts/expense-donut'
import { TrendChart } from '@/components/charts/trend-chart'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { calculateTotals, groupExpenseByCategory, groupLastSixMonths } from '@/lib/finance'
import { usePreferencesStore } from '@/stores/preferences'
import type { Transaction } from '@/types/finance'

export function AnalyticsPage({ transactions }: { transactions: Transaction[] }) {
  const { t } = useTranslation(); const { currency, language } = usePreferencesStore(); const locale = language === 'ar' ? 'ar' : language === 'de' ? 'de-DE' : 'en-US'
  const totals = useMemo(() => calculateTotals(transactions), [transactions]); const expenses = useMemo(() => groupExpenseByCategory(transactions), [transactions]); const trend = useMemo(() => groupLastSixMonths(transactions), [transactions])
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold tracking-tight">{t('nav.analytics')}</h2><p className="mt-1 text-sm text-muted-foreground">{t('charts.trendSubtitle')}</p></div><SummaryCards totals={totals} currency={currency} locale={locale} /><div className="grid gap-6 xl:grid-cols-[.78fr_1.35fr]"><ExpenseDonut data={expenses} currency={currency} locale={locale} /><TrendChart data={trend} currency={currency} locale={locale} /></div></div>
}
