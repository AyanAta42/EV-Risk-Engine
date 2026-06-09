// Subscribes to live telemetry-batch events from the API over WebSocket.
import type { CarReading } from '../types'
import { getSocket } from './socket'

export function connectLiveFeed(onBatch: (readings: CarReading[]) => void) {
  const s = getSocket()
  s.on('telemetry-batch', onBatch)
  return () => {
    s.off('telemetry-batch', onBatch)
  }
}
