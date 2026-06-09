// All TypeScript types for the dashboard (car readings, simulation state, component props).
import type { ReactNode } from 'react'

export type CarReading = {
  carId: string
  speed: number
  battery?: number
  safety_score: number
  risk_level?: string
}

export type SimulationState = {
  carList: CarReading[]
  isSimulating: boolean
  carCount: number
  setCarCount: (n: number) => void
  toggleSimulation: () => Promise<void>
}

export type StatCardProps = {
  label: string
  value?: string
  children?: ReactNode
}

export type SimulationControlsProps = {
  carCount: number
  isSimulating: boolean
  onCountChange: (n: number) => void
  onToggle: () => void
}

export type FleetCarListProps = {
  cars: CarReading[]
  selectedCarId?: string
  onSelect: (carId: string) => void
}
