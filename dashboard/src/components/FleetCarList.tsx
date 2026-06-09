// Clickable list of all cars in the fleet with score, speed, and battery.
import { Link } from 'react-router-dom'
import { formatSpeed } from '@shared/fleet-defaults'
import type { FleetCarListProps } from '../types'

export function FleetCarList({ cars }: FleetCarListProps) {
  if (cars.length === 0) {
    return <p className="mt-2 text-sm text-white/60">No cars yet.</p>
  }

  return (
    <ul className="mt-2 max-h-80 space-y-1 overflow-y-auto">
      {cars.map((car) => (
        <li key={car.carId}>
          <Link
            to={`/${car.carId}`}
            className="block rounded-lg border border-transparent px-3 py-2 text-sm text-white/90 transition hover:border-white/20 hover:bg-white/10"
          >
            {car.carId} | score: {car.safety_score.toFixed(0)} | {formatSpeed(car.speed)}
            {car.battery != null ? ` | battery: ${car.battery.toFixed(1)}%` : ''}
          </Link>
        </li>
      ))}
    </ul>
  )
}
