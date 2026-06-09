// Builds one fake telemetry reading (speed, battery, GPS) for a given car ID.
const carStates: Record<string, { speed: number; battery: number }> = {}

export const generateCarReading = (carId: string) => {
  const state = carStates[carId] || { speed: 40, battery: 100 }

  state.speed = Math.max(0, Math.min(100, state.speed + (Math.random() - 0.45) * 10))
  state.battery = Math.max(0, state.battery - (0.001 + state.speed / 10000))
  carStates[carId] = state

  return {
    carId,
    speed: Math.round(state.speed),
    battery: parseFloat(state.battery.toFixed(2)),
    lat: 37.7749 + (Math.random() - 0.5) * 0.01,
    lng: -122.4194 + (Math.random() - 0.5) * 0.01,
    timestamp: new Date().toISOString(),
  }
}
