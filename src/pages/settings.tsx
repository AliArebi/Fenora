import { Database, Globe2, RefreshCcw, Trash2, WalletCards } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Select } from '@/components/ui/select'
import { clearTransactions, seedDemoData } from '@/lib/db'
import { usePreferencesStore } from '@/stores/preferences'
import { useUiStore } from '@/stores/ui'
import type { Currency, Language } from '@/types/finance'

type Intent = 'reset' | 'clear' | null
export function SettingsPage() {
  const { t } = useTranslation(); const [intent, setIntent] = useState<Intent>(null); const { language, currency, setLanguage, setCurrency } = usePreferencesStore(); const notify = useUiStore((s) => s.notify)
  const execute = async () => { try { if (intent === 'reset') { await seedDemoData(true); notify(t('toast.reset')) } else { await clearTransactions(); notify(t('toast.cleared')) } } catch { notify(t('toast.error'), 'error') } finally { setIntent(null) } }
  return <div className="mx-auto max-w-3xl space-y-6"><SettingsSection icon={Globe2} title={t('settings.preferences')} hint={t('settings.preferencesHint')}><SettingRow icon={Globe2} label={t('settings.language')}><Select value={language} onValueChange={(value) => setLanguage(value as Language)} label={t('settings.language')} className="w-36" options={[{ value: 'en', label: 'English' }, { value: 'de', label: 'Deutsch' }, { value: 'ar', label: 'العربية' }]} /></SettingRow><SettingRow icon={WalletCards} label={t('settings.currency')} hint={t('settings.currencyHint')}><Select value={currency} onValueChange={(value) => setCurrency(value as Currency)} label={t('settings.currency')} className="w-36" options={[{ value: 'USD', label: 'USD — $' }, { value: 'EUR', label: 'EUR — €' }]} /></SettingRow></SettingsSection>
    <SettingsSection icon={Database} title={t('settings.data')} hint={t('settings.dataHint')}><SettingRow icon={RefreshCcw} label={t('settings.resetDemo')} hint={t('settings.resetDemoHint')}><Button variant="secondary" onClick={() => setIntent('reset')}>{t('settings.resetDemo')}</Button></SettingRow><SettingRow icon={Trash2} label={t('settings.clearData')} hint={t('settings.clearDataHint')}><Button variant="destructive" onClick={() => setIntent('clear')}>{t('actions.delete')}</Button></SettingRow></SettingsSection>
    <ConfirmDialog open={intent !== null} onOpenChange={(open) => !open && setIntent(null)} title={t(intent === 'reset' ? 'dialogs.resetTitle' : 'dialogs.clearTitle')} description={t(intent === 'reset' ? 'dialogs.resetBody' : 'dialogs.clearBody')} confirmLabel={t('actions.confirm')} cancelLabel={t('actions.cancel')} onConfirm={execute} />
  </div>
}

function SettingsSection({ icon: Icon, title, hint, children }: { icon: typeof Globe2; title: string; hint: string; children: React.ReactNode }) { return <section className="panel overflow-hidden"><div className="flex gap-3 border-b border-border p-5"><span className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent"><Icon className="size-4" /></span><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{hint}</p></div></div><div className="divide-y divide-border">{children}</div></section> }
function SettingRow({ icon: Icon, label, hint, children }: { icon: typeof Globe2; label: string; hint?: string; children: React.ReactNode }) { return <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"><Icon className="hidden size-4 text-muted-foreground sm:block" /><div className="min-w-0 flex-1"><h3 className="text-sm font-medium">{label}</h3>{hint && <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>}</div><div className="shrink-0">{children}</div></div> }
