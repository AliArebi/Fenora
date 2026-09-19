export const transactionTypes = ['income', 'expense', 'bill', 'investment'] as const
export type TransactionType = (typeof transactionTypes)[number]
export type Currency = 'USD' | 'EUR'
export type Language = 'en' | 'de' | 'ar'
export type AppView = 'dashboard' | 'transactions' | 'analytics' | 'settings'

export interface Transaction {
  id: string
  type: TransactionType
  category: string
  title: string
  description?: string
  amount: number
  date: string
  createdAt: string
  updatedAt: string
}

export interface TransactionInput {
  type: TransactionType
  category: string
  title: string
  description?: string
  amount: number
  date: string
}

export interface TransactionFilters {
  type: TransactionType | 'all'
  category: string
  query: string
  startDate: string
  endDate: string
}

export interface FinanceTotals {
  income: number
  expense: number
  bill: number
  investment: number
  balance: number
}

export interface TrendPoint {
  key: string
  date: Date
  income: number
  expense: number
  bill: number
  investment: number
}
