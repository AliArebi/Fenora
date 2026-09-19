import Dexie, { type EntityTable } from 'dexie'
import type { Transaction, TransactionInput } from '@/types/finance'
import { createDemoTransactions } from '@/lib/demo-data'

class FinanceDatabase extends Dexie {
  transactions!: EntityTable<Transaction, 'id'>

  constructor() {
    super('finora')
    this.version(1).stores({ transactions: 'id, type, category, date, createdAt' })
  }
}

export const db = new FinanceDatabase()
const DEMO_SEED_KEY = 'finora:demo-seeded'

export async function seedDemoData(force = false) {
  if (!force && localStorage.getItem(DEMO_SEED_KEY)) return
  await db.transaction('rw', db.transactions, async () => {
    if (force) await db.transactions.clear()
    if (force || (await db.transactions.count()) === 0) await db.transactions.bulkPut(createDemoTransactions())
  })
  localStorage.setItem(DEMO_SEED_KEY, 'true')
}

export async function addTransaction(input: TransactionInput) {
  const now = new Date().toISOString()
  const transaction: Transaction = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now }
  await db.transactions.add(transaction)
  return transaction
}

export async function updateTransaction(id: string, input: TransactionInput) {
  await db.transactions.update(id, { ...input, updatedAt: new Date().toISOString() })
}

export async function deleteTransaction(id: string) { await db.transactions.delete(id) }
export async function clearTransactions() { await db.transactions.clear() }
