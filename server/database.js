import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initDb() {
    const defaultPath = path.join(__dirname, 'wedding.db');
    const configuredPath = process.env.DATABASE_PATH;
    const candidatePaths = configuredPath ? [configuredPath, defaultPath] : [defaultPath];

    let db;
    let lastError;

    for (const dbPath of candidatePaths) {
        try {
            await fs.mkdir(path.dirname(dbPath), { recursive: true });
            db = await open({
                filename: dbPath,
                driver: sqlite3.Database
            });
            console.log(`Using database path: ${dbPath}`);
            break;
        } catch (error) {
            lastError = error;
            console.warn(`Failed to use database path "${dbPath}": ${error.code || error.message}`);
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

    return db;
}
