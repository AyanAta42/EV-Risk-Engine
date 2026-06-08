import type { Request, Response } from 'express'
import { manageFleet } from './fleet_manager'

export const handleSimRequest = (req: Request, res: Response) => {
  const { count, status } = req.body as { count: number; status: boolean }
  manageFleet(count, status)
  res.status(200).send(`Simulation ${status ? 'started' : 'stopped'}`)
}
