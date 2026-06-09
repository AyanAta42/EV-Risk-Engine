# Builds the Python risk-engine container (FastAPI on port 5000).
FROM python:3.11-slim

WORKDIR /app

COPY risk-engine/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY risk-engine/score-car-safety.py ./score-car-safety.py

EXPOSE 5000
CMD ["uvicorn", "score-car-safety:app", "--host", "0.0.0.0", "--port", "5000"]
