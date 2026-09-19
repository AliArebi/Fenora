import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'

export function useTransactions() {
  return useLiveQuery(() => db.transactions.orderBy('date').reverse().toArray(), [], undefined)
}
