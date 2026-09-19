import { ArrowDownRight, ArrowUpRight, Receipt, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TransactionType } from '@/types/finance'

const config = {
  income: { Icon: ArrowUpRight, className: 'bg-emerald-100 text-emerald-700' },
  expense: { Icon: ArrowDownRight, className: 'bg-rose-100 text-rose-700' },
  bill: { Icon: Receipt, className: 'bg-amber-100 text-amber-700' },
  investment: { Icon: TrendingUp, className: 'bg-blue-100 text-blue-700' },
}
export function TypeBadge({ type, compact = false }: { type: TransactionType; compact?: boolean }) {
  const { t } = useTranslation(); const { Icon, className } = config[type]
  return <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${className}`}><Icon className="size-3.5" />{!compact && t(`type.${type}`)}</span>
}
