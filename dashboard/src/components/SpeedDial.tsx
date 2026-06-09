// Glowing arc speedometer for the selected vehicle.
type SpeedDialProps = {
  speed: number
}

export function SpeedDial({ speed }: SpeedDialProps) {
  const max = 100
  const cx = 150
  const cy = 150
  const r = 112
  const circ = 2 * Math.PI * r
  const arcLen = 0.75 * circ
  const ratio = Math.min(speed / max, 1)
  const progress = ratio * arcLen

  const color =
    speed > 80 ? '#ef4444' : speed > 60 ? '#f59e0b' : '#06b6d4'
  const statusLabel =
    speed > 80 ? 'CRITICAL' : speed > 60 ? 'CAUTION' : 'NOMINAL'

  return (
    <div className="flex h-full items-center justify-center">
      <svg viewBox="0 0 300 300" className="h-full w-full max-w-xs">
        <defs>
          <filter id="arc-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="num-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer decorative dashed ring */}
        <circle
          cx={cx} cy={cy} r={r + 20}
          fill="none"
          stroke="rgba(99,102,241,0.1)"
          strokeWidth="1"
          strokeDasharray="3 10"
        />

        {/* Mid decorative ring */}
        <circle
          cx={cx} cy={cy} r={r + 8}
          fill="none"
          stroke="rgba(99,102,241,0.06)"
          strokeWidth="1"
        />

        {/* Background track */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="rgba(99,102,241,0.14)"
          strokeWidth="14"
          strokeDasharray={`${arcLen} ${circ - arcLen}`}
          strokeLinecap="round"
          transform={`rotate(-225 ${cx} ${cy})`}
        />

        {/* Progress glow layer */}
        {progress > 2 && (
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth="24"
            strokeDasharray={`${progress} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(-225 ${cx} ${cy})`}
            opacity="0.28"
            filter="url(#arc-glow)"
          />
        )}

        {/* Progress arc (sharp) */}
        {progress > 2 && (
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeDasharray={`${progress} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(-225 ${cx} ${cy})`}
          />
        )}

        {/* Inner ring */}
        <circle
          cx={cx} cy={cy} r={r - 26}
          fill="none"
          stroke="rgba(99,102,241,0.07)"
          strokeWidth="1"
        />

        {/* Speed number */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="72"
          fontWeight="700"
          style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-2px' }}
          filter={progress > 2 ? 'url(#num-glow)' : undefined}
        >
          {Math.round(speed)}
        </text>

        {/* KPH label */}
        <text
          x={cx} y={cy + 46}
          textAnchor="middle"
          fill="#475569"
          fontSize="13"
          fontWeight="500"
          style={{ letterSpacing: '5px' }}
        >
          KPH
        </text>

        {/* Status */}
        <text
          x={cx} y={cy + 68}
          textAnchor="middle"
          fill={color}
          fontSize="10"
          fontWeight="600"
          style={{ letterSpacing: '3px' }}
        >
          {statusLabel}
        </text>

        {/* Range labels */}
        <text x="40" y="255" textAnchor="middle" fill="#334155" fontSize="11">0</text>
        <text x="260" y="255" textAnchor="middle" fill="#334155" fontSize="11">100</text>
      </svg>
    </div>
  )
}
