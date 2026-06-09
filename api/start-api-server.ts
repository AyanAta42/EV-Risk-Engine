// Express entry point — registers HTTP routes, WebSocket server, and listens on port 3000.
import express from 'express'
import http from 'http'
import cors from 'cors'
import { initDashboardSocket } from './outbound/push-live-updates'
import { handleCarDataBatch } from './routes/receive-car-data'
import { handleSimulationStartStop } from './routes/control-simulation'

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/health', (_req, res) => res.status(200).send('ok'))

initDashboardSocket(server)

app.post('/api/telemetry/batch', handleCarDataBatch)
app.post('/api/simulate', handleSimulationStartStop)

const PORT = 3000
server.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})
