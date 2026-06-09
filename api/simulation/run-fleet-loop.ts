// Runs every second while active — generates N car readings and POSTs them as one batch.
import { carId } from '../../shared/fleet-defaults'
import { API_URL } from '../config'
import { generateCarReading } from './generate-car-reading'

/** Timer handle — lets us cancel the "every 1 second" loop on Stop. */
let fleetTimer: ReturnType<typeof setInterval> | null = null

export const startOrStopFleetLoop = (count: number, active: boolean) => {
  if (!active) {
    if (fleetTimer !== null) {
      clearInterval(fleetTimer)
      fleetTimer = null
    }
    return
  }

  if (fleetTimer !== null) clearInterval(fleetTimer)

  fleetTimer = setInterval(() => {
    const readings = []
    for (let i = 0; i < count; i++) {
      readings.push(generateCarReading(carId(i)))
    }

    fetch(`${API_URL}/api/telemetry/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readings }),
    }).catch((err) => console.error('Fleet loop send failed:', err))
  }, 1000)
}
