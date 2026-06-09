// Hook to read shared simulation state (car list, Start/Stop, fleet size) from any page.
import { useContext } from 'react'
import { SimulationContext } from './context'

export function useSimulation() {
  const ctx = useContext(SimulationContext)
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider')
  return ctx
}
