import { LockKeyhole, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { usePreferencesStore } from '@/stores/preferences'
import { useUiStore } from '@/stores/ui'
import type { Currency, Language } from '@/types/finance'

export function Header() {
  const { t } = useTranslation()
  const view = useUiStore((state) => state.view)
  const openEditor = useUiStore((state) => state.openEditor)
  const { language, currency, setLanguage, setCurrency } = usePreferencesStore()
  return <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
    <div className="min-w-0">
      <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">{t(`header.${view}`)}</h1>
      <p className="mt-0.5 hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex"><LockKeyhole className="size-3" />{t('header.privacy')}</p>
    </div>
    <div className="flex items-center gap-2">
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)} label={t('settings.language')} className="w-[74px]" options={[{ value: 'en', label: 'EN' }, { value: 'de', label: 'DE' }, { value: 'ar', label: 'AR' }]} />
      <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)} label={t('settings.currency')} className="w-[82px]" options={[{ value: 'USD', label: 'USD' }, { value: 'EUR', label: 'EUR' }]} />
      <Button onClick={() => openEditor()} className="ms-1"><Plus className="size-4" /><span className="hidden sm:inline">{t('actions.addTransaction')}</span></Button>
    </div>
  </header>
}
