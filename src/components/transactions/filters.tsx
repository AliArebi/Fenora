import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { categories, allCategories } from '@/lib/categories'
import { useFiltersStore, defaultFilters } from '@/stores/filters'
import type { TransactionType } from '@/types/finance'

export function TransactionFilters() {
  const { t } = useTranslation()
  const filters = useFiltersStore()
  const active = Object.entries(defaultFilters).some(([key, value]) => filters[key as keyof typeof defaultFilters] !== value)
  const categoryOptions = filters.type === 'all' ? allCategories : categories[filters.type]
  const setType = (value: string) => {
    const type = value as TransactionType | 'all'
    filters.setFilter('type', type)
    if (filters.category && type !== 'all' && !categories[type].includes(filters.category)) filters.setFilter('category', '')
  }
  return <section className="panel p-4" aria-label={t('filters.active')}>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_minmax(145px,.7fr)_minmax(155px,.8fr)_150px_150px_auto]">
      <label className="relative"><span className="sr-only">{t('filters.search')}</span><Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input className="input ps-9" value={filters.query} onChange={(e) => filters.setFilter('query', e.target.value)} placeholder={t('filters.searchPlaceholder')} /></label>
      <Select value={filters.type} onValueChange={setType} label={t('filters.type')} className="w-full" options={[{ value: 'all', label: t('type.all') }, ...(['income','expense','bill','investment'] as const).map((value) => ({ value, label: t(`type.${value}`) }))]} />
      <Select value={filters.category || 'all'} onValueChange={(value) => filters.setFilter('category', value === 'all' ? '' : value)} label={t('filters.category')} className="w-full" options={[{ value: 'all', label: t('filters.allCategories') }, ...categoryOptions.map((value) => ({ value, label: t(`categories.${value}`) }))]} />
      <label><span className="sr-only">{t('filters.startDate')}</span><input type="date" className="input" value={filters.startDate} onChange={(e) => filters.setFilter('startDate', e.target.value)} aria-label={t('filters.startDate')} /></label>
      <label><span className="sr-only">{t('filters.endDate')}</span><input type="date" className="input" value={filters.endDate} onChange={(e) => filters.setFilter('endDate', e.target.value)} aria-label={t('filters.endDate')} /></label>
      <Button variant="secondary" size="icon" onClick={filters.clearFilters} disabled={!active} aria-label={t('actions.clear')} title={t('actions.clear')}>{active ? <X className="size-4" /> : <SlidersHorizontal className="size-4" />}</Button>
    </div>
    {active && <div className="mt-3 flex items-center gap-2 text-xs text-accent"><span className="size-1.5 rounded-full bg-accent" />{t('filters.active')}</div>}
  </section>
}
