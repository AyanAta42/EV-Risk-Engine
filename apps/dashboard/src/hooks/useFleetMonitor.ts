import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'
import type { CarTelemetry } from '../types/telemetry'

export function useFleetMonitor() {
  const [cars, setCars] = useState<Record<string, CarTelemetry>>({})
  const [isSimulating, setIsSimulating] = useState(false)
  const [carCount, setCarCount] = useState(5)

  useEffect(() => {
    const onTelemetry = (data: CarTelemetry) =>
      setCars((prev) => ({ ...prev, [data.carId]: data }))
    socket.on('telemetry', onTelemetry)
    return () => { socket.off('telemetry', onTelemetry) }
  }, [])

  const toggleSimulation = async () => {
    const next = !isSimulating
    await fetch('http://localhost:3000/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: carCount, status: next }),
    })
    setIsSimulating(next)
    if (!next) setCars({})
  }

  const carList = Object.values(cars).sort((a, b) => a.carId.localeCompare(b.carId))
  return { carList, isSimulating, carCount, setCarCount, toggleSimulation }
}