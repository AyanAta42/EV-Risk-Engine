// Sends car reading batches to the Python risk engine and returns scored results.
type CarReading = Record<string, unknown>

const RISK_ENGINE_URL = process.env.RISK_ENGINE_URL ?? 'http://localhost:5000'

export const scoreBatchWithPython = async (readings: CarReading[]) => {
  const res = await fetch(`${RISK_ENGINE_URL}/score/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ readings }),
  })

  if (!res.ok) throw new Error(`Risk engine returned ${res.status}`)
  const data = (await res.json()) as { readings: CarReading[] }
  return data.readings
}
