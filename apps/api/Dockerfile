FROM node:20-slim

WORKDIR /app/api

COPY apps/api/package*.json ./
RUN npm ci

COPY apps/api ./
COPY apps/data /app/data

ENV RISK_ENGINE_URL=http://risk-engine:5000
ENV CORS_ORIGIN=http://localhost:5173

EXPOSE 3000
CMD ["npm", "start"]
