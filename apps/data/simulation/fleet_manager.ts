import { generateTelemetry } from './car_logic'

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
    for (let i = 0; i < count; i++) {
      const data = generateTelemetry(`sim-car-${i}`)
      fetch('http://localhost:3000/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    }
  }, 1000)
}
