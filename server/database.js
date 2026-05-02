import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { createHash } from "node:crypto";

/** SHA-256 for seeded admin password (not for internet-facing high-security apps). */
export function hashAdminPassword(plain) {
  return createHash("sha256").update(String(plain), "utf8").digest("hex");
}

/** Default admin is created by seed (see `seedDefaultAdmin`). */
export async function verifyAdminCredentials(db, username, password) {
  if (!db || !username || !password) return false;
  const row = await db.get(
    "SELECT password_hash FROM admins WHERE username = ?",
    [String(username).trim().toLowerCase()],
  );
  if (!row) return false;
  return hashAdminPassword(password) === row.password_hash;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initDb() {
  const defaultPath = path.join(__dirname, "wedding.db");
  const configuredPath = process.env.DATABASE_PATH;
  const candidatePaths = configuredPath
    ? [configuredPath, defaultPath]
    : [defaultPath];

  let db;
  let lastError;

  for (const dbPath of candidatePaths) {
    try {
      await fs.mkdir(path.dirname(dbPath), { recursive: true });
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
      console.log(`Using database path: ${dbPath}`);
      break;
    } catch (error) {
      lastError = error;
      console.warn(
        `Failed to use database path "${dbPath}": ${error.code || error.message}`,
      );
    }
  }

  if (!db) {
    throw lastError;
  }

  await db.exec(`
        CREATE TABLE IF NOT EXISTS rsvps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            guests INTEGER DEFAULT 1,
            attending TEXT NOT NULL,
            message TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

  await db.exec(`
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        )
    `);

  await seedDefaultAdmin(db, { force: false });

  return db;
}

const DEFAULT_ADMIN_USER = "admin";
const DEFAULT_ADMIN_PASS = "admin@123";

/**
 * Writes the default admin user into SQLite.
 * @param {{ force?: boolean }} opts — if `force`, upserts and resets password hash; if false, only inserts when no `admin` row exists.
 */
export async function seedDefaultAdmin(db, opts = {}) {
  const { force = false } = opts;
  const hash = hashAdminPassword(DEFAULT_ADMIN_PASS);

  if (force) {
    await db.run(
      `INSERT INTO admins (username, password_hash) VALUES (?, ?)
             ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash`,
      [DEFAULT_ADMIN_USER, hash],
    );
    console.log(
      `Database: admin user "${DEFAULT_ADMIN_USER}" saved (use password from project seed).`,
    );
    return;
  }

  const existing = await db.get("SELECT id FROM admins WHERE username = ?", [
    DEFAULT_ADMIN_USER,
  ]);
  if (existing) return;

  await db.run("INSERT INTO admins (username, password_hash) VALUES (?, ?)", [
    DEFAULT_ADMIN_USER,
    hash,
  ]);
  console.log(`Database: seeded admin user "${DEFAULT_ADMIN_USER}".`);
}
