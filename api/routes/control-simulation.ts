// Handles POST /api/simulate — starts or stops the fake fleet data loop.
import type { Request, Response } from 'express'
import { startOrStopFleetLoop } from '../simulation/run-fleet-loop'

export const handleSimulationStartStop = (req: Request, res: Response) => {
  const { count, status } = req.body as { count: number; status: boolean }
  startOrStopFleetLoop(count, status)
  res.status(200).send(`Simulation ${status ? 'started' : 'stopped'}`)
}
