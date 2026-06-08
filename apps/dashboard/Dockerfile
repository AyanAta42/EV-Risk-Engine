FROM node:20-slim

WORKDIR /app

COPY apps/dashboard/package*.json ./
RUN npm ci

COPY apps/dashboard ./

COPY apps/shared ./shared

ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
