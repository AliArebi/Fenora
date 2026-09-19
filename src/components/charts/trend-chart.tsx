import { Area, CartesianGrid, Legend, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/lib/utils'
import type { Currency, TrendPoint } from '@/types/finance'
import { ChartEmpty } from '@/components/charts/expense-donut'

const series = [
  { key: 'income', color: '#10b981' }, { key: 'expense', color: '#f43f5e' }, { key: 'bill', color: '#f59e0b' }, { key: 'investment', color: '#3b82f6' },
] as const

export function TrendChart({ data, currency, locale }: { data: TrendPoint[]; currency: Currency; locale: string }) {
  const { t } = useTranslation()
  const hasData = data.some((point) => series.some(({ key }) => point[key] > 0))
  const localized = data.map((point) => ({ ...point, month: new Intl.DateTimeFormat(locale, { month: 'short' }).format(point.date) }))
  return <section className="panel flex min-h-[370px] flex-col p-5">
    <div><h2 className="font-semibold">{t('charts.sixMonthTrend')}</h2><p className="mt-1 text-sm text-muted-foreground">{t('charts.trendSubtitle')}</p></div>
    {!hasData ? <ChartEmpty text={t('charts.noTrendData')} /> : <div className="mt-6 min-h-0 flex-1" aria-label={t('charts.sixMonthTrend')}>
      <ResponsiveContainer width="100%" height={270}>
        <ComposedChart data={localized} margin={{ left: -16, right: 8, top: 6, bottom: 0 }}>
          <defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#10b981" stopOpacity=".22"/><stop offset="1" stopColor="#10b981" stopOpacity="0"/></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="#d9e8e2" strokeDasharray="3 5" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 11 }} tickFormatter={(value) => new Intl.NumberFormat(locale, { notation: 'compact' }).format(value)} />
          <Tooltip formatter={(value, name) => [formatCurrency(Number(value), currency, locale), t(`type.${String(name)}`)]} contentStyle={{ background: '#ffffff', color: '#1d2939', border: '1px solid #d9e8e2', borderRadius: 10, fontSize: 13, boxShadow: '0 10px 30px rgba(24,86,67,.12)' }} />
          <Legend formatter={(value) => t(`type.${value}`)} iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#incomeFill)" strokeWidth={2} />
          {series.slice(1).map(({ key, color }) => <Line key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />)}
        </ComposedChart>
      </ResponsiveContainer>
    </div>}
  </section>
}
