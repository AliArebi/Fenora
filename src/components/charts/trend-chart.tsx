import { Area, CartesianGrid, Legend, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/lib/utils'
import type { Currency, TrendPoint } from '@/types/finance'
import { ChartEmpty } from '@/components/charts/expense-donut'

const series = [
  { key: 'income', color: '#7cf4c8' }, { key: 'expense', color: '#ec7e8d' }, { key: 'bill', color: '#f2bd6e' }, { key: 'investment', color: '#8aa9ff' },
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
          <defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7cf4c8" stopOpacity=".2"/><stop offset="1" stopColor="#7cf4c8" stopOpacity="0"/></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="#24272e" strokeDasharray="3 5" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#858a95', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#858a95', fontSize: 11 }} tickFormatter={(value) => new Intl.NumberFormat(locale, { notation: 'compact' }).format(value)} />
          <Tooltip formatter={(value, name) => [formatCurrency(Number(value), currency, locale), t(`type.${String(name)}`)]} contentStyle={{ background: '#17191f', border: '1px solid #2a2d35', borderRadius: 10, fontSize: 13 }} />
          <Legend formatter={(value) => t(`type.${value}`)} iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="income" stroke="#7cf4c8" fill="url(#incomeFill)" strokeWidth={2} />
          {series.slice(1).map(({ key, color }) => <Line key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />)}
        </ComposedChart>
      </ResponsiveContainer>
    </div>}
  </section>
}
