import { cn } from '@/lib/utils'

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return <div className={cn('flex items-center gap-3', className)}>
    <span className="grid size-9 shrink-0 place-items-center rounded-[10px] border border-accent/25 bg-accent/[.08]" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-accent" strokeWidth="2.2" strokeLinecap="round"><path d="M6 18V6h12M6 11h9M6 16h6" /></svg>
    </span>
    {!compact && <span className="text-[1.05rem] font-bold tracking-[.18em] text-white">FINORA</span>}
  </div>
}
