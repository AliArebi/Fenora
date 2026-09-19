import { create } from 'zustand'
import type { AppView, Transaction } from '@/types/finance'

interface Toast { id: number; message: string; tone?: 'success' | 'error' }
interface UiState {
  view: AppView
  editorOpen: boolean
  editing: Transaction | null
  toast: Toast | null
  setView: (view: AppView) => void
  openEditor: (transaction?: Transaction) => void
  closeEditor: () => void
  notify: (message: string, tone?: Toast['tone']) => void
  dismissToast: () => void
}

export const useUiStore = create<UiState>((set) => ({
  view: 'dashboard', editorOpen: false, editing: null, toast: null,
  setView: (view) => set({ view }),
  openEditor: (editing) => set({ editorOpen: true, editing: editing ?? null }),
  closeEditor: () => set({ editorOpen: false, editing: null }),
  notify: (message, tone = 'success') => set({ toast: { id: Date.now(), message, tone } }),
  dismissToast: () => set({ toast: null }),
}))
