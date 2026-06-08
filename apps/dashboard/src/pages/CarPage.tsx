import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useFleetMonitorContext } from '../context/FleetMonitorContext'
import { useCarFeed } from '../hooks/useCarFeed'

export function CarPage() {
  const { id } = useParams()
  const carId = id ? decodeURIComponent(id) : undefined
  const { isSimulating } = useFleetMonitorContext()
  const feed = useCarFeed(carId)
  const latest = feed[0]

  useEffect(() => {
    document.title = carId ? `${carId} | EV Fleet Risk Monitor` : 'EV Fleet Risk Monitor'
    return () => {
      document.title = 'EV Fleet Risk Monitor'
    }
  }, [carId])

  return (
    <div>
      <p>
        <Link to="/">Back to fleet</Link>
      </p>
      <h1>Car feed</h1>
      <p>
        {carId} | {isSimulating ? 'Live' : 'Idle'}
      </p>
      {!latest ? (
        <p>Waiting for telemetry…</p>
      ) : (
        <div className="list">
          <div className="row">
            {latest.carId} | score: {latest.safety_score.toFixed(0)} | {latest.speed} mph
            {latest.risk_level ? ` | ${latest.risk_level}` : ''}
          </div>
        </div>
      )}
    </div>
  )
}
