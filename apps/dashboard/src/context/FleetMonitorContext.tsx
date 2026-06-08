import { createContext, useContext, type ReactNode } from 'react'
import { useFleetMonitor } from '../hooks/useFleetMonitor'

type FleetMonitorState = ReturnType<typeof useFleetMonitor>

const FleetMonitorContext = createContext<FleetMonitorState | null>(null)

export function FleetMonitorProvider({ children }: { children: ReactNode }) {
  const fleet = useFleetMonitor()
  return (
    <FleetMonitorContext.Provider value={fleet}>{children}</FleetMonitorContext.Provider>
  )
}

export function useFleetMonitorContext() {
  const context = useContext(FleetMonitorContext)
  if (!context) {
    throw new Error('useFleetMonitorContext must be used within FleetMonitorProvider')
  }
  return context
}
