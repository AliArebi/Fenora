import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Currency, Language } from '@/types/finance'

interface PreferencesState {
  language: Language
  currency: Currency
  setLanguage: (language: Language) => void
  setCurrency: (currency: Currency) => void
}

export const usePreferencesStore = create<PreferencesState>()(persist(
  (set) => ({ language: 'en', currency: 'USD', setLanguage: (language) => set({ language }), setCurrency: (currency) => set({ currency }) }),
  { name: 'finora:preferences' },
))
