// Tells the backend to start generating fake fleet telemetry.
import { API_URL } from './config'

export async function startSimulation(carCount: number) {
  await fetch(`${API_URL}/api/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count: carCount, status: true }),
  })
}
