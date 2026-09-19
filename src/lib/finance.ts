import { format, isAfter, isBefore, parseISO, startOfMonth, subMonths } from 'date-fns'
import type { FinanceTotals, Transaction, TransactionFilters, TrendPoint } from '@/types/finance'

export function calculateTotals(transactions: readonly Transaction[]): FinanceTotals {
  const totals = transactions.reduce(
    (result, transaction) => {
      result[transaction.type] += transaction.amount
      return result
    },
    { income: 0, expense: 0, bill: 0, investment: 0 },
  )
  return { ...totals, balance: totals.income - totals.expense - totals.bill - totals.investment }
}

export function applyFilters(transactions: readonly Transaction[], filters: TransactionFilters) {
  const query = filters.query.trim().toLocaleLowerCase()
  return transactions.filter((transaction) => {
    if (filters.type !== 'all' && transaction.type !== filters.type) return false
    if (filters.category && transaction.category !== filters.category) return false
    if (query && !`${transaction.title} ${transaction.description ?? ''}`.toLocaleLowerCase().includes(query)) return false
    const date = parseISO(transaction.date)
    if (filters.startDate && isBefore(date, parseISO(filters.startDate))) return false
    if (filters.endDate && isAfter(date, parseISO(filters.endDate))) return false
    return true
  })
}

export function groupExpenseByCategory(transactions: readonly Transaction[]) {
  const grouped = new Map<string, number>()
  transactions.filter((item) => item.type === 'expense').forEach((item) => {
    grouped.set(item.category, (grouped.get(item.category) ?? 0) + item.amount)
  })
  return [...grouped].map(([category, value]) => ({ category, value })).sort((a, b) => b.value - a.value)
}

export function groupLastSixMonths(transactions: readonly Transaction[], anchor = new Date()): TrendPoint[] {
  const firstMonth = startOfMonth(subMonths(anchor, 5))
  const points = Array.from({ length: 6 }, (_, index) => {
    const date = startOfMonth(subMonths(anchor, 5 - index))
    return { key: format(date, 'yyyy-MM'), date, income: 0, expense: 0, bill: 0, investment: 0 }
  })
  const lookup = new Map(points.map((point) => [point.key, point]))
  transactions.forEach((transaction) => {
    const date = parseISO(transaction.date)
    if (isBefore(date, firstMonth)) return
    const point = lookup.get(format(date, 'yyyy-MM'))
    if (point) point[transaction.type] += transaction.amount
  })
  return points
}
