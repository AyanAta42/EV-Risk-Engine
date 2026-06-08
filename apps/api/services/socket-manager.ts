import type { Server as HttpServer } from 'http'
import { Server } from 'socket.io'

let io: Server | undefined

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: 'http://localhost:5173' },
  })
}

export const broadcastToUI = (data: unknown) => {
  io?.emit('telemetry', data)
}
