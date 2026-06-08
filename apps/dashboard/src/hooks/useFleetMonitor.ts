import { useEffect, useState } from 'react'
import { API_URL } from '../lib/config'
import { socket } from '../lib/socket'
import type { CarTelemetry } from '../types/telemetry'

export function useFleetMonitor() {
  const [cars, setCars] = useState<Record<string, CarTelemetry>>({})
  const [isSimulating, setIsSimulating] = useState(false)
  const [carCount, setCarCount] = useState(5)

  useEffect(() => {
    const onBatch = (data: CarTelemetry[]) =>
      setCars((prev) => {
        const next = { ...prev }
        for (const car of data) next[car.carId] = car
        return next
      })

    socket.on('telemetry-batch', onBatch)
    return () => {
      socket.off('telemetry-batch', onBatch)
    }
  }, [])

  const toggleSimulation = async () => {
    const next = !isSimulating
    await fetch(`${API_URL}/api/simulate`, {
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
