import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/lib/utils'
import type { Currency } from '@/types/finance'

const colors = ['#7cf4c8', '#8aa9ff', '#f2bd6e', '#ec7e8d', '#b89cff', '#64c8e8', '#b8d76a', '#e59d6c']
export function ExpenseDonut({ data, currency, locale }: { data: { category: string; value: number }[]; currency: Currency; locale: string }) {
  const { t } = useTranslation()
  const localized = data.map((item) => ({ ...item, name: t(`categories.${item.category}`) }))
  return <section className="panel flex min-h-[370px] flex-col p-5">
    <div><h2 className="font-semibold">{t('charts.expenseBreakdown')}</h2><p className="mt-1 text-sm text-muted-foreground">{t('charts.expenseSubtitle')}</p></div>
    {!localized.length ? <ChartEmpty text={t('charts.noExpenseData')} /> : <div className="mt-4 min-h-0 flex-1" aria-label={t('charts.expenseBreakdown')}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart><Pie data={localized} dataKey="value" nameKey="name" innerRadius={64} outerRadius={92} paddingAngle={3} stroke="none">{localized.map((item, i) => <Cell key={item.category} fill={colors[i % colors.length]} />)}</Pie>
          <Tooltip formatter={(value) => formatCurrency(Number(value), currency, locale)} contentStyle={{ background: '#17191f', border: '1px solid #2a2d35', borderRadius: 10, fontSize: 13 }} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, color: '#9b9fa9' }} /></PieChart>
      </ResponsiveContainer>
    </div>}
  </section>
}

export function ChartEmpty({ text }: { text: string }) { return <div className="grid flex-1 place-items-center px-6 text-center text-sm text-muted-foreground"><div><span className="mx-auto mb-3 block size-10 rounded-full border border-dashed border-muted-foreground/40" />{text}</div></div> }
