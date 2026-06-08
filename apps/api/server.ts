import express from 'express';
import http from 'http';
import cors from 'cors'; // Added CORS so your React app can talk to the API
import { initSocket } from './services/socket-manager';
import { handleTelemetry } from './routes/telemetry';
import { handleSimRequest } from '../data/simulation/simulation_trigger';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.status(200).send('ok'));

// 1. Initialize WebSockets for the live Dashboard
initSocket(server);

// 2. The Listener endpoint for your Simulator/Teslas
app.post('/api/telemetry', handleTelemetry);

// 3. The Trigger endpoint for the UI Start/Stop button
app.post('/api/simulate', handleSimRequest);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 API Orchestrator running on port ${PORT}`);
});