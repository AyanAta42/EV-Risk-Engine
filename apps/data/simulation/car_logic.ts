const carStates: Record<string, { speed: number; battery: number }> = {};

export const generateTelemetry = (carId: string) => {
  // Initialize or get existing state
  const state = carStates[carId] || { speed: 40, battery: 100 };

  // 1. Momentum: Speed nudges up/down by ~5mph (staying between 0-100)
  state.speed = Math.max(0, Math.min(100, state.speed + (Math.random() - 0.45) * 10));

  // 2. Drain: Battery drops based on speed (faster driving = more drain)
  state.battery = Math.max(0, state.battery - (0.001 + (state.speed / 10000)));

  carStates[carId] = state; // Save state for next tick

  return {
    carId,
    speed: Math.round(state.speed),
    battery: parseFloat(state.battery.toFixed(2)),
    lat: 37.7749 + (Math.random() - 0.5) * 0.01,
    lng: -122.4194 + (Math.random() - 0.5) * 0.01,
    timestamp: new Date().toISOString()
  };
};