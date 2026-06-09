// Tells the backend to stop the fake fleet telemetry loop.
import { API_URL } from './config'

export async function stopSimulation(carCount: number) {
  await fetch(`${API_URL}/api/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count: carCount, status: false }),
  })
}
