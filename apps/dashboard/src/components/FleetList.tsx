import { Link } from 'react-router-dom'
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
          {car.carId} | score: {car.safety_score.toFixed(0)} | {car.speed} mph
        </Link>
      ))}
    </div>
  )
}
