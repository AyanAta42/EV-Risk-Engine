type TelemetryPayload = Record<string, unknown>

export const sendToRiskEngine = async (data: TelemetryPayload) => {
  const res = await fetch('http://localhost:5000/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(`Risk engine returned ${res.status}`)
  }

  return res.json()
}
