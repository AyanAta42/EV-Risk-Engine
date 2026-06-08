from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Telemetry(BaseModel):
    carId: str
    speed: float
    lat: float
    lng: float
    timestamp: str


class BatchTelemetry(BaseModel):
    readings: list[Telemetry]


def score_reading(data: Telemetry) -> dict:
    base_score = 100
    penalty = max(0, data.speed - 65) * 1.5
    safety_score = max(0, base_score - penalty)

    return {
        **data.model_dump(),
        "safety_score": safety_score,
        "risk_level": "High" if safety_score < 50 else "Low",
    }


@app.post("/score")
async def calculate_risk(data: Telemetry):
    return score_reading(data)


@app.post("/score/batch")
async def calculate_risk_batch(payload: BatchTelemetry):
    return {"readings": [score_reading(reading) for reading in payload.readings]}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5000)
