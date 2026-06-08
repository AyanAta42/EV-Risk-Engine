type TelemetryPayload = Record<string, unknown>

const RISK_ENGINE_URL = process.env.RISK_ENGINE_URL ?? 'http://localhost:5000'

export const sendToRiskEngine = async (data: TelemetryPayload) => {
  const res = await fetch(`${RISK_ENGINE_URL}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(`Risk engine returned ${res.status}`)
  }

  return res.json()
}
