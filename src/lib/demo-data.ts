import { format, subMonths } from 'date-fns'
import type { Transaction, TransactionType } from '@/types/finance'

const entries: Array<[number, TransactionType, string, string, number, number]> = [
  [0, 'income', 'salary', 'Monthly salary', 6200, 2], [0, 'expense', 'food', 'Neighbourhood market', 142.8, 6],
  [0, 'expense', 'transportation', 'City transit pass', 68, 4], [0, 'bill', 'rent', 'Apartment rent', 1480, 1],
  [0, 'bill', 'internet', 'Fiber internet', 59, 8], [0, 'investment', 'etfs', 'Global index ETF', 750, 10],
  [1, 'income', 'salary', 'Monthly salary', 6200, 2], [1, 'income', 'freelance', 'Product design sprint', 1250, 17],
  [1, 'expense', 'travel', 'Weekend train tickets', 210, 12], [1, 'bill', 'subscriptions', 'Software subscriptions', 44, 5],
  [1, 'investment', 'stocks', 'Technology fund', 500, 14], [2, 'income', 'salary', 'Monthly salary', 6100, 2],
  [2, 'expense', 'shopping', 'Home office chair', 389, 9], [2, 'expense', 'healthcare', 'Dental check-up', 120, 19],
  [2, 'bill', 'electricity', 'Electricity bill', 96, 7], [2, 'investment', 'savings', 'Emergency fund', 600, 21],
  [3, 'income', 'salary', 'Monthly salary', 6100, 2], [3, 'income', 'bonus', 'Performance bonus', 900, 15],
  [3, 'expense', 'entertainment', 'Concert tickets', 138, 18], [3, 'bill', 'phone', 'Mobile plan', 36, 8],
  [3, 'investment', 'bonds', 'Government bond ETF', 450, 22], [4, 'income', 'salary', 'Monthly salary', 6000, 2],
  [4, 'expense', 'education', 'Online course', 179, 11], [4, 'bill', 'insurance', 'Home insurance', 84, 6],
  [4, 'investment', 'crypto', 'Digital asset allocation', 180, 25], [5, 'income', 'salary', 'Monthly salary', 6000, 2],
  [5, 'expense', 'housing', 'Home supplies', 226, 16], [5, 'bill', 'water', 'Water utility', 42, 7],
  [5, 'investment', 'etfs', 'Global index ETF', 400, 20],
]

export function createDemoTransactions(anchor = new Date()): Transaction[] {
  return entries.map(([monthsAgo, type, category, title, amount, day], index) => {
    const month = subMonths(anchor, monthsAgo)
    const date = new Date(month.getFullYear(), month.getMonth(), day)
    const timestamp = new Date(date.getTime() + index * 1000).toISOString()
    return { id: `demo-${index + 1}`, type, category, title, amount, date: format(date, 'yyyy-MM-dd'), createdAt: timestamp, updatedAt: timestamp }
  })
}
