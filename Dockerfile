FROM node:22-bookworm-slim AS frontend-build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS public_backend

WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=5002
ENV DATABASE_PATH=/app/data/wedding.db

COPY package*.json ./
RUN npm ci --omit=dev

COPY server ./server

RUN mkdir -p /app/data

EXPOSE 5002

CMD ["npm", "start"]

FROM nginx:1.27-alpine AS public_web

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 80
