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

The Docker image builds the frontend and serves it from the Express backend, so both frontend and backend run together in one container.

```bash
docker compose up --build
```

The app will be available at `http://localhost:5001`.

Optional environment variables:

- `PORT`: backend port inside the container. Defaults to `5001`.
- `ADMIN_PASSWORD`: admin dashboard password. Defaults to `change-me`.
- `DATABASE_PATH`: SQLite database path. Defaults to `/app/data/wedding.db` in Docker.

Stop the stack with:

```bash
docker compose down
```
