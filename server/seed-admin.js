/**
 * Writes the default admin user to the DB (username: admin, password: admin@123).
 * Run: npm run seed:admin
 * Use when you need to (re)apply credentials without deleting the database.
 */
import { initDb, seedDefaultAdmin } from "./database.js";

async function main() {
  const db = await initDb();
  await seedDefaultAdmin(db, { force: true });
  await db.close();
  console.log("seed:admin finished.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
