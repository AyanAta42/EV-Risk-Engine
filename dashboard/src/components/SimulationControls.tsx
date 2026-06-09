// Car count input and Start/Stop button for the simulation.
import type { SimulationControlsProps } from '../types'

export function SimulationControls({
  carCount,
  isSimulating,
  onCountChange,
  onToggle,
}: SimulationControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        min={1}
        value={carCount}
        disabled={isSimulating}
        onChange={(e) => onCountChange(Math.max(1, +e.target.value || 1))}
        className="w-20 rounded-lg px-3 py-2 text-center text-sm font-medium text-white outline-none disabled:opacity-40"
        style={{
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.3)',
        }}
      />
      <button
        type="button"
        onClick={onToggle}
        className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all duration-150"
        style={{
          background: isSimulating
            ? 'rgba(239,68,68,0.2)'
            : 'rgba(99,102,241,0.25)',
          border: isSimulating
            ? '1px solid rgba(239,68,68,0.5)'
            : '1px solid rgba(99,102,241,0.5)',
          boxShadow: isSimulating
            ? '0 0 14px rgba(239,68,68,0.2)'
            : '0 0 14px rgba(99,102,241,0.25)',
        }}
      >
        {isSimulating ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}
