// Scrollable fleet feed — click a row to select that vehicle in the hero panel.
import type { FleetCarListProps } from '../types'

export function FleetCarList({ cars, selectedCarId, onSelect }: FleetCarListProps) {
  if (cars.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-slate-600">No vehicles active</p>
      </div>
    )
  }

  return (
    <ul className="h-full space-y-1 overflow-y-auto">
      {cars.map((car) => {
        const selected = car.carId === selectedCarId
        const high = car.risk_level === 'High'
        const score = car.safety_score

        return (
          <li key={car.carId}>
            <button
              type="button"
              onClick={() => onSelect(car.carId)}
              className="group w-full rounded-lg px-4 py-3 text-left transition-all duration-100"
              style={{
                background: selected
                  ? 'rgba(99,102,241,0.18)'
                  : 'transparent',
                border: selected
                  ? '1px solid rgba(99,102,241,0.4)'
                  : '1px solid transparent',
                boxShadow: selected ? '0 0 12px rgba(99,102,241,0.15)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!selected) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.07)'
              }}
              onMouseLeave={(e) => {
                if (!selected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: high ? '#ef4444' : '#22c55e',
                      boxShadow: high ? '0 0 5px #ef4444' : '0 0 5px #22c55e',
                    }}
                  />
                  <span
                    className="font-mono text-xs"
                    style={{ color: selected ? '#a5b4fc' : '#94a3b8' }}
                  >
                    {car.carId}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{
                      color: score < 50 ? '#ef4444' : score < 75 ? '#f59e0b' : '#22c55e',
                    }}
                  >
                    {score.toFixed(0)}
                  </span>
                  <span className="text-xs tabular-nums text-slate-500">
                    {car.speed} kph
                  </span>
                  {car.battery != null && (
                    <span
                      className="text-xs tabular-nums"
                      style={{ color: car.battery < 20 ? '#ef4444' : '#475569' }}
                    >
                      {car.battery.toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
