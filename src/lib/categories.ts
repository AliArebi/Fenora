import type { TransactionType } from '@/types/finance'

export const categories: Record<TransactionType, readonly string[]> = {
  income: ['salary', 'freelance', 'business', 'bonus', 'interest', 'rental', 'other'],
  expense: ['food', 'transportation', 'housing', 'shopping', 'entertainment', 'healthcare', 'education', 'travel'],
  bill: ['rent', 'electricity', 'water', 'internet', 'phone', 'insurance', 'subscriptions'],
  investment: ['stocks', 'etfs', 'crypto', 'bonds', 'realEstate', 'savings', 'other'],
}

export const allCategories = [...new Set(Object.values(categories).flat())]
