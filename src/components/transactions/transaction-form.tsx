import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
import { categories } from '@/lib/categories'
import { addTransaction, updateTransaction } from '@/lib/db'
import { usePreferencesStore } from '@/stores/preferences'
import { useUiStore } from '@/stores/ui'
import type { TransactionInput, TransactionType } from '@/types/finance'

export function TransactionForm() {
  const { t } = useTranslation(); const open = useUiStore((s) => s.editorOpen); const editing = useUiStore((s) => s.editing); const close = useUiStore((s) => s.closeEditor); const notify = useUiStore((s) => s.notify); const currency = usePreferencesStore((s) => s.currency)
  const schema = z.object({ type: z.enum(['income','expense','bill','investment']), category: z.string().min(1, t('validation.categoryRequired')), title: z.string().trim().min(1, t('validation.titleRequired')).max(80, t('validation.titleLong')), description: z.string().max(240).optional(), amount: z.number().positive(t('validation.amountPositive')), date: z.string().min(1, t('validation.dateRequired')) })
  type FormValues = z.infer<typeof schema>
  const { register, handleSubmit, control, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), values: editing ? { type: editing.type, category: editing.category, title: editing.title, description: editing.description ?? '', amount: editing.amount, date: editing.date } : { type: 'expense', category: 'food', title: '', description: '', amount: 0, date: format(new Date(), 'yyyy-MM-dd') } })
  const type = watch('type')
  const onTypeChange = (value: string) => { const next = value as TransactionType; setValue('type', next); setValue('category', categories[next][0] ?? '') }
  const submit = async (values: FormValues) => { try { const input = values as TransactionInput; if (editing) { await updateTransaction(editing.id, input); notify(t('toast.updated')) } else { await addTransaction(input); notify(t('toast.created')) } reset(); close() } catch { notify(t('toast.error'), 'error') } }
  return <Dialog open={open} onOpenChange={(value) => !value && close()}><DialogContent><DialogTitle>{t(editing ? 'form.editTitle' : 'form.addTitle')}</DialogTitle><DialogDescription>{t('form.subtitle')}</DialogDescription><form onSubmit={handleSubmit(submit)} className="mt-6 space-y-4" noValidate>
    <div className="grid gap-4 sm:grid-cols-2"><Field label={t('form.type')} error={errors.type?.message}><Controller control={control} name="type" render={({ field }) => <Select value={field.value} onValueChange={onTypeChange} label={t('form.type')} className="w-full" options={(['income','expense','bill','investment'] as const).map((value) => ({ value, label: t(`type.${value}`) }))} />} /></Field><Field label={t('form.category')} error={errors.category?.message}><Controller control={control} name="category" render={({ field }) => <Select value={field.value} onValueChange={field.onChange} label={t('form.category')} className="w-full" options={categories[type].map((value) => ({ value, label: t(`categories.${value}`) }))} />} /></Field></div>
    <Field label={t('form.title')} error={errors.title?.message}><input className="input" {...register('title')} placeholder={t('form.titlePlaceholder')} autoFocus /></Field>
    <Field label={t('form.description')} error={errors.description?.message}><textarea className="input min-h-20 resize-none py-2.5" {...register('description')} placeholder={t('form.descriptionPlaceholder')} /></Field>
    <div className="grid gap-4 sm:grid-cols-2"><Field label={`${t('form.amount')} (${currency})`} error={errors.amount?.message}><input type="number" min="0.01" step="0.01" inputMode="decimal" className="input" {...register('amount', { valueAsNumber: true })} /></Field><Field label={t('form.date')} error={errors.date?.message}><input type="date" className="input" {...register('date')} /></Field></div>
    <div className="flex justify-end gap-3 pt-2"><Button type="button" variant="secondary" onClick={close}>{t('actions.cancel')}</Button><Button type="submit" disabled={isSubmitting}>{t(editing ? 'actions.update' : 'actions.save')}</Button></div>
  </form></DialogContent></Dialog>
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="block"><span className="label">{label}</span>{children}{error && <span className="mt-1 block text-xs text-rose-300">{error}</span>}</label> }
