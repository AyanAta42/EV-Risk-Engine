# Builds the Node API container (Express + WebSocket on port 3000).
FROM node:20-slim

WORKDIR /app/api

COPY api/package*.json ./
RUN npm ci

COPY api ./
COPY shared /app/shared

ENV RISK_ENGINE_URL=http://risk-engine:5000
ENV CORS_ORIGIN=http://localhost:5173

EXPOSE 3000
CMD ["npm", "start"]
