import type { Request, Response } from 'express'
import { sendToRiskEngine } from '../services/risk-client'
import { broadcastToUI } from '../services/socket-manager'

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
