# Debo

Wedding invitation app with a React/Vite frontend and an Express/SQLite backend.

## Local development

Run the frontend and backend together:

```bash
npm install
npm run dev:all
```

The frontend runs on `http://localhost:5173` and proxies `/api` requests to the backend on `http://localhost:5001`.

## Docker

Docker Compose runs two containers:

- `web`: Nginx serving the built frontend
- `backend`: Express API with SQLite storage

```bash
docker compose up --build
```

The app will be available at `http://localhost:8080`.

The frontend talks to the backend through Nginx, which proxies `/api` to the `backend` service over the Docker network.

Optional environment variables:

- `ADMIN_PASSWORD`: admin dashboard password. Defaults to `change-me`.
- `DATABASE_PATH`: SQLite database path. Defaults to `/app/data/wedding.db` in Docker.

Stop the stack with:

```bash
docker compose down
```
