import { Link } from 'react-router-dom'
import { formatSpeed } from '@shared/constants'
import type { CarTelemetry } from '../types/telemetry'

type FleetListProps = {
  cars: CarTelemetry[]
}

export function FleetList({ cars }: FleetListProps) {
  if (cars.length === 0) return <p>No cars yet.</p>

  return (
    <div className="list">
      {cars.map((car) => (
        <Link key={car.carId} to={`/${car.carId}`} className="row">
          {car.carId} | score: {car.safety_score.toFixed(0)} | {formatSpeed(car.speed)}
          {car.battery != null ? ` | battery: ${car.battery.toFixed(1)}%` : ''}
        </Link>
      ))}
    </div>
  )
}
