// Creates and reuses a single Socket.IO connection to the backend.
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { API_URL } from './config'

let socket: Socket | null = null

export function getSocket() {
  if (!socket) socket = io(API_URL)
  return socket
}
