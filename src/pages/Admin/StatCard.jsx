import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Card from './Card'

export default function StatCard({ label, value, hint, icon: Icon, trend }) {
  const trendPositive = typeof trend === 'number' && trend >= 0
  const TrendIcon = trendPositive ? ArrowUpRight : ArrowDownRight

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-2">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        {typeof trend === 'number' && (
          <span
            className={[
              'mb-0.5 flex items-center gap-0.5 text-xs font-semibold',
              trendPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400',
            ].join(' ')}
          >
            <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      {hint && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </Card>
  )
}
