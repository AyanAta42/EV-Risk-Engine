import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'
import type { CarTelemetry } from '../types/telemetry'

const MAX_FEED = 50

export function useCarFeed(carId: string | undefined) {
  const [feed, setFeed] = useState<CarTelemetry[]>([])

  useEffect(() => {
    if (!carId) return

    setFeed([])
    const onBatch = (data: CarTelemetry[]) => {
      const reading = data.find((item) => item.carId === carId)
      if (!reading) return
      setFeed((prev) => [reading, ...prev].slice(0, MAX_FEED))
    }

    socket.on('telemetry-batch', onBatch)
    return () => {
      socket.off('telemetry-batch', onBatch)
    }
  }, [carId])

  return feed
}
