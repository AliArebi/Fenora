import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/lib/utils'
import type { Currency } from '@/types/finance'

const colors = ['#10b981', '#3b82f6', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316']
export function ExpenseDonut({ data, currency, locale }: { data: { category: string; value: number }[]; currency: Currency; locale: string }) {
  const { t } = useTranslation()
  const localized = data.map((item) => ({ ...item, name: t(`categories.${item.category}`) }))
  return <section className="panel flex min-h-[370px] flex-col p-5">
    <div><h2 className="font-semibold">{t('charts.expenseBreakdown')}</h2><p className="mt-1 text-sm text-muted-foreground">{t('charts.expenseSubtitle')}</p></div>
    {!localized.length ? <ChartEmpty text={t('charts.noExpenseData')} /> : <div className="mt-4 min-h-0 flex-1" aria-label={t('charts.expenseBreakdown')}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart><Pie data={localized} dataKey="value" nameKey="name" innerRadius={64} outerRadius={92} paddingAngle={3} stroke="none">{localized.map((item, i) => <Cell key={item.category} fill={colors[i % colors.length]} />)}</Pie>
          <Tooltip formatter={(value) => formatCurrency(Number(value), currency, locale)} contentStyle={{ background: '#ffffff', color: '#1d2939', border: '1px solid #d9e8e2', borderRadius: 10, fontSize: 13, boxShadow: '0 10px 30px rgba(24,86,67,.12)' }} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, color: '#667085' }} /></PieChart>
      </ResponsiveContainer>
    </div>}
  </section>
}

export function ChartEmpty({ text }: { text: string }) { return <div className="grid flex-1 place-items-center px-6 text-center text-sm text-muted-foreground"><div><span className="mx-auto mb-3 block size-10 rounded-full border border-dashed border-muted-foreground/40" />{text}</div></div> }
