import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TransactionFilters } from '@/components/transactions/filters'
import { TransactionList } from '@/components/transactions/transaction-list'
import { applyFilters } from '@/lib/finance'
import { useFiltersStore } from '@/stores/filters'
import { usePreferencesStore } from '@/stores/preferences'
import { useUiStore } from '@/stores/ui'
import type { Transaction } from '@/types/finance'

export function TransactionsPage({ transactions, onDelete }: { transactions: Transaction[]; onDelete: (transaction: Transaction) => void }) {
  const { t } = useTranslation(); const filters = useFiltersStore(); const { currency, language } = usePreferencesStore(); const openEditor = useUiStore((s) => s.openEditor)
  const locale = language === 'ar' ? 'ar' : language === 'de' ? 'de-DE' : 'en-US'
  const filtered = useMemo(() => applyFilters(transactions, { type: filters.type, category: filters.category, query: filters.query, startDate: filters.startDate, endDate: filters.endDate }), [transactions, filters.type, filters.category, filters.query, filters.startDate, filters.endDate])
  return <div className="space-y-5"><TransactionFilters /><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{t('transaction.count', { count: filtered.length })}</p></div><TransactionList transactions={filtered} currency={currency} locale={locale} onEdit={openEditor} onDelete={onDelete} emptyFiltered={filtered.length === 0 && transactions.length > 0} /></div>
}
