import { create } from 'zustand'
import type { TransactionFilters } from '@/types/finance'

export const defaultFilters: TransactionFilters = { type: 'all', category: '', query: '', startDate: '', endDate: '' }

interface FiltersState extends TransactionFilters {
  setFilter: <K extends keyof TransactionFilters>(key: K, value: TransactionFilters[K]) => void
  clearFilters: () => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
  ...defaultFilters,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  clearFilters: () => set(defaultFilters),
}))
