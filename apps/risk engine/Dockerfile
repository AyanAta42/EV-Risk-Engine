FROM python:3.11-slim

WORKDIR /app

COPY ["apps/risk engine/requirements.txt", "./requirements.txt"]
RUN pip install --no-cache-dir -r requirements.txt

COPY ["apps/risk engine/main.py", "./main.py"]

EXPOSE 5000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
