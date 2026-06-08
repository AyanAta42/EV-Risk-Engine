from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Telemetry(BaseModel):
    carId: str
    speed: float
    lat: float
    lng: float
    timestamp: str

@app.post("/score")
async def calculate_risk(data: Telemetry):
    # Logic: Simple penalty for speeding over 65mph
    base_score = 100
    penalty = max(0, data.speed - 65) * 1.5
    safety_score = max(0, base_score - penalty)

    return {
        **data.model_dump(),
        "safety_score": safety_score,
        "risk_level": "High" if safety_score < 50 else "Low"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)