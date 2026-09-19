import { ArrowDownRight, ArrowUpRight, Receipt, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TransactionType } from '@/types/finance'

const config = {
  income: { Icon: ArrowUpRight, className: 'bg-emerald-400/10 text-emerald-300' },
  expense: { Icon: ArrowDownRight, className: 'bg-rose-400/10 text-rose-300' },
  bill: { Icon: Receipt, className: 'bg-amber-400/10 text-amber-300' },
  investment: { Icon: TrendingUp, className: 'bg-blue-400/10 text-blue-300' },
}
export function TypeBadge({ type, compact = false }: { type: TransactionType; compact?: boolean }) {
  const { t } = useTranslation(); const { Icon, className } = config[type]
  return <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${className}`}><Icon className="size-3.5" />{!compact && t(`type.${type}`)}</span>
}
