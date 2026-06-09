// WebSocket server setup and broadcast of scored telemetry batches to the dashboard.
import type { Server as HttpServer } from 'http'
import { Server } from 'socket.io'

let io: Server | undefined

export const initDashboardSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' },
  })
}

export const pushBatchToDashboard = (readings: unknown[]) => {
  io?.emit('telemetry-batch', readings)
}
