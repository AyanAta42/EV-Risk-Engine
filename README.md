# EV Risk Engine

Real-time EV fleet safety monitoring. Simulated telemetry flows through an API, gets scored by a Python risk engine, and live results appear on a React dashboard.

## Quick start (Docker)

**Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) only.**

```bash
docker compose up --build
```

Open **http://localhost:5173**

To stop:

```bash
docker compose down
```

That's it — no Node, Python, or npm install needed.

**First run takes 2–5 minutes** while Docker downloads images and installs dependencies. You'll see build output — that's normal. Wait until you see:

```
risk-engine-1  | Uvicorn running on http://0.0.0.0:5000
api-1          | API Orchestrator running on port 3000
dashboard-1    | Local: http://localhost:5173/
```

Check status anytime:

```bash
docker compose ps
```

All three should show `healthy` or `running`.

## Using the dashboard

1. Enter the number of simulated cars.
2. Click **Start** — telemetry streams every second.
3. Watch safety scores update live.
4. Click **Stop** to end and clear the list.

## Services

| Service      | URL                   | Port |
|--------------|-----------------------|------|
| Dashboard    | http://localhost:5173 | 5173 |
| API          | http://localhost:3000 | 3000 |
| Risk Engine  | http://localhost:5000 | 5000 |

## How data flows

```
Simulator → POST /api/telemetry → API → POST /score → Risk Engine
                                        ↓
                              WebSocket → Dashboard
```

## Project structure

```
apps/
├── risk engine/     Python FastAPI — scores telemetry
├── api/             Node/Express orchestrator + WebSocket
├── dashboard/       React dashboard
└── data/simulation/ Simulated fleet (runs inside the API)
```

## Manual setup (optional)

If you prefer running services locally without Docker, see below.

<details>
<summary>Local development setup</summary>

### Prerequisites

- Node.js 20+
- Python 3.11+

### Install

```bash
cd "apps/risk engine" && pip install -r requirements.txt
cd ../api && npm install
cd ../dashboard && npm install
```

### Run (in order)

**Terminal 1 — Risk Engine**

```bash
cd "apps/risk engine"
python main.py
```

**Terminal 2 — API**

```bash
cd apps/api
npm start
```

**Terminal 3 — Dashboard**

```bash
cd apps/dashboard
npm run dev
```

Open http://localhost:5173

</details>

## Troubleshooting

**Docker build fails**
- Ensure Docker Desktop is running.
- Try `docker compose build --no-cache`.

**Dashboard shows no data**
- Wait for all three containers to finish starting.
- Run `docker compose ps` — all services should be `running`.
- Restart: `docker compose down && docker compose up --build`.

**Port already in use**
- Stop local dev servers on ports 3000, 5000, or 5173, or change ports in `docker-compose.yml`.
