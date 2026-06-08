type ControlsProps = {
  carCount: number
  isSimulating: boolean
  onCountChange: (n: number) => void
  onToggle: () => void
}

export function Controls({ carCount, isSimulating, onCountChange, onToggle }: ControlsProps) {
  return (
    <div>
      <input
        type="number"
        min={1}
        value={carCount}
        disabled={isSimulating}
        onChange={(e) => onCountChange(Math.max(1, +e.target.value || 1))}
      />
      <button type="button" onClick={onToggle}>
        {isSimulating ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}
