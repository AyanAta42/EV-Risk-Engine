export const generateTelemetry = (carId: string) => ({
    carId,
    speed: Math.floor(Math.random() * 80) + 20, // Random speed 20-100
    lat: 37.7749 + (Math.random() - 0.5) * 0.01,
    lng: -122.4194 + (Math.random() - 0.5) * 0.01,
    timestamp: new Date().toISOString()
  });