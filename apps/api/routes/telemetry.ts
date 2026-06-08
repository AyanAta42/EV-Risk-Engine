import type { Request, Response } from 'express'
import { sendBatchToRiskEngine, sendToRiskEngine } from '../services/risk-client'
import { broadcastBatchToUI, broadcastToUI } from '../services/socket-manager'

export const handleTelemetry = async (req: Request, res: Response) => {
  try {
    const enrichedData = await sendToRiskEngine(req.body)
    broadcastToUI(enrichedData)
    res.status(200).json({ status: 'processed' })
  } catch (err) {
    console.error('Telemetry processing failed:', err)
    res.status(502).json({ status: 'error', message: 'Risk engine unavailable' })
  }
}

export const handleTelemetryBatch = async (req: Request, res: Response) => {
  try {
    const readings = req.body.readings
    if (!Array.isArray(readings) || readings.length === 0) {
      res.status(400).json({ status: 'error', message: 'readings array required' })
      return
    }

    const enriched = await sendBatchToRiskEngine(readings)
    broadcastBatchToUI(enriched)
    res.status(200).json({ status: 'processed', count: enriched.length })
  } catch (err) {
    console.error('Batch telemetry processing failed:', err)
    res.status(502).json({ status: 'error', message: 'Risk engine unavailable' })
  }
}
