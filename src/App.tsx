import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/layout/header'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Sidebar } from '@/components/layout/sidebar'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { ToastViewport } from '@/components/ui/toast'
import { TransactionForm } from '@/components/transactions/transaction-form'
import { useTransactions } from '@/hooks/use-transactions'
import { deleteTransaction, seedDemoData } from '@/lib/db'
import { AnalyticsPage } from '@/pages/analytics'
import { DashboardPage } from '@/pages/dashboard'
import { SettingsPage } from '@/pages/settings'
import { TransactionsPage } from '@/pages/transactions'
import { usePreferencesStore } from '@/stores/preferences'
import { useUiStore } from '@/stores/ui'
import type { Transaction } from '@/types/finance'

export default function App() {
  const { t, i18n } = useTranslation(); const [ready, setReady] = useState(false); const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null); const language = usePreferencesStore((s) => s.language); const view = useUiStore((s) => s.view); const notify = useUiStore((s) => s.notify); const transactions = useTransactions()
  useEffect(() => { void seedDemoData().then(() => setReady(true)).catch(() => { notify(t('toast.error'), 'error'); setReady(true) }) }, [notify, t])
  useEffect(() => { void i18n.changeLanguage(language); document.documentElement.lang = language; document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr' }, [language, i18n])
  const remove = async () => { if (!deleteTarget) return; try { await deleteTransaction(deleteTarget.id); notify(t('toast.deleted')) } catch { notify(t('toast.error'), 'error') } finally { setDeleteTarget(null) } }
  const data = transactions ?? []
  return <div className="app-bg min-h-screen"><Sidebar /><div className="min-h-screen lg:ps-64"><Header /><main className="mx-auto max-w-[1540px] px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:pb-10">{!ready || transactions === undefined ? <Loading /> : view === 'dashboard' ? <DashboardPage transactions={data} onDelete={setDeleteTarget} /> : view === 'transactions' ? <TransactionsPage transactions={data} onDelete={setDeleteTarget} /> : view === 'analytics' ? <AnalyticsPage transactions={data} /> : <SettingsPage />}</main></div><MobileNav /><TransactionForm /><ConfirmDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)} title={t('dialogs.deleteTitle')} description={t('dialogs.deleteBody', { title: deleteTarget?.title ?? '' })} confirmLabel={t('actions.delete')} cancelLabel={t('actions.cancel')} onConfirm={remove} /><ToastViewport /></div>
}

function Loading() { const { t } = useTranslation(); return <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground"><div className="text-center"><span className="mx-auto mb-4 block size-7 animate-spin rounded-full border-2 border-border border-t-accent" />{t('common.loading')}</div></div> }
