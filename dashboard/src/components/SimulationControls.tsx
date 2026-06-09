// Car count input and Start/Stop button for the simulation.
import type { SimulationControlsProps } from '../types'

export function SimulationControls({
  carCount,
  isSimulating,
  onCountChange,
  onToggle,
}: SimulationControlsProps) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <input
        type="number"
        min={1}
        value={carCount}
        disabled={isSimulating}
        onChange={(e) => onCountChange(Math.max(1, +e.target.value || 1))}
        className="w-24 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-white backdrop-blur-sm disabled:opacity-50"
      />
      <button
        type="button"
        onClick={onToggle}
        className="rounded-lg border border-white/30 bg-gradient-to-r from-white/20 to-white/5 px-4 py-2 font-medium text-white backdrop-blur-sm transition hover:from-white/30 hover:to-white/10"
      >
        {isSimulating ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}
