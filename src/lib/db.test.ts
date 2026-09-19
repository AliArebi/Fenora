import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { addTransaction, clearTransactions, db, deleteTransaction, seedDemoData, updateTransaction } from '@/lib/db'

beforeEach(async () => { localStorage.clear(); await clearTransactions() })
afterEach(async () => { await clearTransactions() })

describe('IndexedDB transaction persistence', () => {
  it('creates, updates, reads, and deletes a transaction', async () => {
    const created = await addTransaction({ type: 'expense', category: 'food', title: 'Dinner', amount: 42, date: '2025-04-10' })
    expect(await db.transactions.get(created.id)).toMatchObject({ title: 'Dinner', amount: 42 })
    await updateTransaction(created.id, { type: 'expense', category: 'food', title: 'Team dinner', amount: 54, date: '2025-04-10' })
    expect(await db.transactions.get(created.id)).toMatchObject({ title: 'Team dinner', amount: 54 })
    await deleteTransaction(created.id)
    expect(await db.transactions.get(created.id)).toBeUndefined()
  })

  it('seeds demo data once and does not recreate deleted records', async () => {
    await seedDemoData()
    const initial = await db.transactions.count()
    expect(initial).toBeGreaterThan(20)
    await clearTransactions()
    await seedDemoData()
    expect(await db.transactions.count()).toBe(0)
  })

  it('force reset restores demo data', async () => {
    await seedDemoData(true)
    expect(await db.transactions.count()).toBeGreaterThan(20)
  })
})
