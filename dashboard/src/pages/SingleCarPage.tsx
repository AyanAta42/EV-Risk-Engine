// Single-car page — shows live feed filtered to one vehicle at /:id.
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { formatSpeed } from '@shared/fleet-defaults'
import { StatCard } from '../components/StatCard'
import { useSimulation } from '../simulation/useSimulation'

export function SingleCarPage() {
  const { id } = useParams()
  const carId = id ? decodeURIComponent(id) : undefined
  const { carList, isSimulating } = useSimulation()
  const latest = carList.find((car) => car.carId === carId)

  useEffect(() => {
    document.title = carId ? `${carId} | EV Risk Engine` : 'EV Risk Engine'
    return () => {
      document.title = 'EV Risk Engine'
    }
  }, [carId])

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <Link to="/" className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
        ← Back to fleet
      </Link>

      <h1 className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
        EV Risk Engine
      </h1>

      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Vehicle" value={carId ?? '—'} />
        <StatCard label="Status" value={isSimulating ? 'Live' : 'Idle'} />
      </div>

      <StatCard label="Live feed">
        {!latest ? (
          <p className="mt-2 text-sm text-white/60">Waiting for telemetry…</p>
        ) : (
          <p className="mt-2 text-sm text-white/90">
            score: {latest.safety_score.toFixed(0)} | {formatSpeed(latest.speed)}
            {latest.battery != null ? ` | battery: ${latest.battery.toFixed(1)}%` : ''}
            {latest.risk_level ? ` | ${latest.risk_level}` : ''}
          </p>
        )}
      </StatCard>
    </div>
  )
}
