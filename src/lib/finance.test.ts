import { describe, expect, it } from 'vitest'
import { applyFilters, calculateTotals, groupExpenseByCategory, groupLastSixMonths } from '@/lib/finance'
import { formatCurrency } from '@/lib/utils'
import type { Transaction } from '@/types/finance'

const tx = (overrides: Partial<Transaction>): Transaction => ({ id: crypto.randomUUID(), type: 'expense', category: 'food', title: 'Lunch', amount: 10, date: '2025-01-15', createdAt: '2025-01-15T12:00:00Z', updatedAt: '2025-01-15T12:00:00Z', ...overrides })

describe('finance calculations', () => {
  const transactions = [tx({ type: 'income', amount: 1000 }), tx({ type: 'expense', amount: 120 }), tx({ type: 'bill', amount: 200 }), tx({ type: 'investment', amount: 180 })]
  it('calculates balance as income minus every outflow', () => expect(calculateTotals(transactions)).toEqual({ income: 1000, expense: 120, bill: 200, investment: 180, balance: 500 }))
  it('aggregates expense categories', () => expect(groupExpenseByCategory([tx({ category: 'food', amount: 20 }), tx({ category: 'food', amount: 25 }), tx({ category: 'travel', amount: 60 })])).toEqual([{ category: 'travel', value: 60 }, { category: 'food', value: 45 }]))
})

describe('six-month grouping', () => {
  it('handles a year boundary in chronological order', () => {
    const result = groupLastSixMonths([tx({ type: 'income', amount: 500, date: '2024-12-10' }), tx({ type: 'bill', amount: 50, date: '2025-01-04' })], new Date(2025, 2, 20))
    expect(result.map((point) => point.key)).toEqual(['2024-10','2024-11','2024-12','2025-01','2025-02','2025-03'])
    expect(result[2]?.income).toBe(500); expect(result[3]?.bill).toBe(50)
  })
})

describe('transaction filtering', () => {
  const data = [tx({ id: '1', title: 'Corner restaurant', category: 'food', date: '2025-01-12' }), tx({ id: '2', title: 'Train', category: 'transportation', date: '2025-01-20' }), tx({ id: '3', type: 'income', title: 'Salary', category: 'salary', date: '2025-02-01' })]
  it('applies type, category, query and date range as an intersection', () => expect(applyFilters(data, { type: 'expense', category: 'food', query: 'restaurant', startDate: '2025-01-01', endDate: '2025-03-31' }).map((item) => item.id)).toEqual(['1']))
  it('includes both date boundaries', () => expect(applyFilters(data, { type: 'all', category: '', query: '', startDate: '2025-01-12', endDate: '2025-01-20' })).toHaveLength(2))
})

describe('currency formatting', () => {
  it('formats USD and EUR with Intl.NumberFormat', () => { expect(formatCurrency(1234.5, 'USD', 'en-US')).toBe('$1,234.50'); expect(formatCurrency(1234.5, 'EUR', 'de-DE')).toContain('1.234,50') })
})
