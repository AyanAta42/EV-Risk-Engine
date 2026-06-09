// Selected vehicle showcase with car image and key telemetry stats.
import type { CarReading } from '../types'

type CarHeroPanelProps = {
  car?: CarReading
}

function riskColor(level?: string) {
  if (level === 'High') return '#ef4444'
  if (level === 'Low') return '#22c55e'
  return '#64748b'
}

function batteryColor(battery?: number) {
  if (battery == null) return '#64748b'
  if (battery < 20) return '#ef4444'
  if (battery < 50) return '#f59e0b'
  return '#22c55e'
}

function scoreColor(score?: number) {
  if (score == null) return '#64748b'
  if (score < 50) return '#ef4444'
  if (score < 75) return '#f59e0b'
  return '#22c55e'
}

export function CarHeroPanel({ car }: CarHeroPanelProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Car ID badge */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-2">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: car ? '#22c55e' : '#334155', boxShadow: car ? '0 0 6px #22c55e' : 'none' }}
          />
          <span className="font-mono text-xs tracking-widest text-indigo-400">
            {car?.carId ?? 'NO VEHICLE'}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-600">
          {car ? 'SELECTED' : 'IDLE'}
        </span>
      </div>

      {/* Car image — fills remaining space */}
      <div
        className="relative min-h-0 flex-1 flex items-center justify-center px-8 py-4"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 55%, rgba(99,102,241,0.06) 0%, transparent 75%)',
        }}
      >
        <img
          src="/car.png"
          alt="Vehicle"
          className="max-h-full max-w-full object-contain"
          style={{
            filter: car
              ? 'drop-shadow(0 0 24px rgba(99,102,241,0.35)) drop-shadow(0 0 8px rgba(139,92,246,0.2))'
              : 'grayscale(0.4) opacity(0.5)',
          }}
        />

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-20"
          style={{ background: 'linear-gradient(to top, #03030e, transparent)' }}
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border-t px-2 pb-4 pt-3"
           style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-600">Battery</span>
          <span className="text-lg font-bold tabular-nums" style={{ color: batteryColor(car?.battery) }}>
            {car?.battery != null ? `${car.battery.toFixed(0)}%` : '—'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5 border-x"
             style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
          <span className="text-[9px] uppercase tracking-widest text-slate-600">Safety</span>
          <span className="text-lg font-bold tabular-nums" style={{ color: scoreColor(car?.safety_score) }}>
            {car ? car.safety_score.toFixed(0) : '—'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[9px] uppercase tracking-widest text-slate-600">Risk</span>
          <span className="text-lg font-bold" style={{ color: riskColor(car?.risk_level) }}>
            {car?.risk_level ?? '—'}
          </span>
        </div>
      </div>
    </div>
  )
}
