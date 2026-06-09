// React context pipe — lets SimulationProvider share state with hooks below.
import { createContext } from 'react'
import type { SimulationState } from '../types'

export const SimulationContext = createContext<SimulationState | null>(null)
