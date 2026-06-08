import { generateTelemetry } from './car_logic'
import { carId } from '../../shared/constants'

const API_URL = process.env.API_URL ?? 'http://localhost:3000'

let interval: ReturnType<typeof setInterval> | null = null

export const manageFleet = (count: number, active: boolean) => {
  if (!active) {
    if (interval !== null) {
      clearInterval(interval)
      interval = null
    }
    return
  }

  if (interval !== null) {
    clearInterval(interval)
  }

  interval = setInterval(() => {
    const readings = Array.from({ length: count }, (_, i) =>
      generateTelemetry(carId(i)),
    )

    fetch(`${API_URL}/api/telemetry/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readings }),
    }).catch((err) => console.error('Batch telemetry failed:', err))
  }, 1000)
}
