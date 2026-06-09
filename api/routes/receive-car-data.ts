// Handles POST /api/telemetry/batch — scores readings via Python and pushes them to the dashboard.
import type { Request, Response } from 'express'
import { scoreBatchWithPython } from '../outbound/call-risk-engine'
import { pushBatchToDashboard } from '../outbound/push-live-updates'

export const handleCarDataBatch = async (req: Request, res: Response) => {
  try {
    const readings = req.body.readings
    if (!Array.isArray(readings) || readings.length === 0) {
      res.status(400).json({ status: 'error', message: 'readings array required' })
      return
    }

    const scored = await scoreBatchWithPython(readings)
    pushBatchToDashboard(scored)
    res.status(200).json({ status: 'processed', count: scored.length })
  } catch (err) {
    console.error('Car data batch failed:', err)
    res.status(502).json({ status: 'error', message: 'Risk engine unavailable' })
  }
}
