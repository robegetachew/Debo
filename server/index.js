import express from "express";
import cors from "cors";
import { initDb, verifyAdminCredentials } from "./database.js";
import {
  buildRegisteredNameSet,
  isValidFullName,
  normalizeName,
} from "./rsvpNames.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5001;

const app = express();
const distPath = path.join(__dirname, "../dist");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change-me";
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors(CORS_ORIGIN ? { origin: CORS_ORIGIN } : undefined));
app.use(express.json());
app.use(express.static(distPath));

let db;

// RSVP Submission Endpoint
app.post("/api/rsvp", async (req, res) => {
  const { name, names: namesFromBody, guests, attending, message } = req.body;

  const rawList =
    Array.isArray(namesFromBody) && namesFromBody.length > 0
      ? namesFromBody.map((n) => String(n ?? ""))
      : String(name || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

  const attendingVal = attending === "no" ? "no" : "yes";

  if (!rawList.length) {
    return res.status(400).json({
      error: "validation",
      code: "missing_names",
      message: "Name and attendance status are required",
    });
  }

  for (const raw of rawList) {
    const trimmed = raw.trim();
    if (!trimmed) {
      return res.status(400).json({
        error: "validation",
        code: "empty_name",
        message: "Each guest must have a full name",
      });
    }
    if (!isValidFullName(trimmed)) {
      return res.status(400).json({
        error: "validation",
        code: "invalid_name",
        message:
          "Please enter a valid full name for each guest (at least 2 letters).",
      });
    }
  }

  const submitted = rawList.map((r) => r.trim());

  try {
    const rows = await db.all("SELECT name FROM rsvps");
    const registered = buildRegisteredNameSet(rows);

    const duplicateNames = [];
    const newNames = [];
    for (const raw of submitted) {
      const key = normalizeName(raw);
      if (registered.has(key)) {
        duplicateNames.push(raw);
      } else {
        newNames.push(raw);
      }
    }

    if (newNames.length === 0) {
      return res.status(200).json({
        ok: true,
        result: "all_duplicate",
        duplicateNames,
      });
    }

    const displayName = newNames.join(", ");
    const guestCount = newNames.length;

    await db.run(
      "INSERT INTO rsvps (name, guests, attending, message) VALUES (?, ?, ?, ?)",
      [displayName, guestCount, attendingVal, message ?? ""],
    );

    if (duplicateNames.length > 0) {
      return res.status(201).json({
        ok: true,
        result: "partial",
        newNames,
        duplicateNames,
      });
    }

    return res.status(201).json({
      ok: true,
      result: "created",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save RSVP" });
  }
});

// Admin RSVP List Endpoint (username + password from seeded `admins` table; default admin / admin@123)
app.get("/api/admin/rsvps", async (req, res) => {
  const username = req.headers["x-admin-username"];
  const password = req.headers["x-admin-password"];

  const ok = await verifyAdminCredentials(db, username, password);
  if (!ok) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const rsvps = await db.all("SELECT * FROM rsvps ORDER BY timestamp DESC");

    // Calculate stats
    const stats = {
      totalSubmissions: rsvps.length,
      totalGuests: rsvps.reduce(
        (acc, r) => acc + (r.attending === "yes" ? r.guests : 0),
        0,
      ),
      attendingCount: rsvps.filter((r) => r.attending === "yes").length,
      notAttendingCount: rsvps.filter((r) => r.attending === "no").length,
    };

    res.json({ rsvps, stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RSVPs" });
  }
});

// Catch-all route to serve index.html for React Router
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

async function startServer() {
  try {
    db = await initDb();
    console.log("Database initialized");

    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
