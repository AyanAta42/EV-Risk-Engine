// Owns fleet simulation state, listens to WebSocket batches, and handles Start/Stop.
import { useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_CAR_COUNT } from '@shared/fleet-defaults'
import { connectLiveFeed } from '../api/connect-live-feed'
import { startSimulation } from '../api/start-simulation'
import { stopSimulation } from '../api/stop-simulation'
import type { CarReading } from '../types'
import { SimulationContext } from './context'

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Record<string, CarReading>>({})
  const [isSimulating, setIsSimulating] = useState(false)
  const [carCount, setCarCount] = useState(DEFAULT_CAR_COUNT)

  useEffect(() => connectLiveFeed((data) => {
    setCars((prev) => {
      const next = { ...prev }
      for (const car of data) next[car.carId] = car
      return next
    })
  }), [])

  const toggleSimulation = async () => {
    const next = !isSimulating
    if (next) await startSimulation(carCount)
    else await stopSimulation(carCount)
    setIsSimulating(next)
    if (!next) setCars({})
  }

  const carList = Object.values(cars).sort((a, b) => a.carId.localeCompare(b.carId))

  return (
    <SimulationContext.Provider
      value={{ carList, isSimulating, carCount, setCarCount, toggleSimulation }}
    >
      {children}
    </SimulationContext.Provider>
  )
}
