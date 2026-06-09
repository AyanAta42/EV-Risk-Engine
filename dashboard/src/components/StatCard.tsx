// Reusable glass-style card for displaying a label and value (or custom content).
import type { StatCardProps } from '../types'

export function StatCard({ label, value, children }: StatCardProps) {
  return (
    <div className="flex h-full flex-col justify-center rounded-xl border border-white/20 bg-gradient-to-br from-white/15 via-white/5 to-black/50 p-4 shadow-lg backdrop-blur-md">
      <p className="text-xs font-medium uppercase tracking-widest text-white/50">{label}</p>
      {value != null && <p className="mt-2 text-2xl font-semibold text-white">{value}</p>}
      {children}
    </div>
  )
}
