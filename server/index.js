import express from 'express';
import cors from 'cors';
import { initDb, verifyAdminCredentials } from './database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5001;

const app = express();
const distPath = path.join(__dirname, '../dist');

app.use(cors());
app.use(express.json());
app.use(express.static(distPath));

let db;

// RSVP Submission Endpoint
app.post('/api/rsvp', async (req, res) => {
    const { name, guests, attending, message } = req.body;

    if (!name || !attending) {
        return res.status(400).json({ error: 'Name and attendance status are required' });
    }

    try {
        await db.run(
            'INSERT INTO rsvps (name, guests, attending, message) VALUES (?, ?, ?, ?)',
            [name, guests || 1, attending, message]
        );
        res.status(201).json({ message: 'RSVP submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save RSVP' });
    }
});

// Admin RSVP List Endpoint (username + password from seeded `admins` table; default admin / admin@123)
app.get('/api/admin/rsvps', async (req, res) => {
    const username = req.headers['x-admin-username'];
    const password = req.headers['x-admin-password'];

    const ok = await verifyAdminCredentials(db, username, password);
    if (!ok) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const rsvps = await db.all('SELECT * FROM rsvps ORDER BY timestamp DESC');

        // Calculate stats
        const stats = {
            totalSubmissions: rsvps.length,
            totalGuests: rsvps.reduce((acc, r) => acc + (r.attending === 'yes' ? r.guests : 0), 0),
            attendingCount: rsvps.filter(r => r.attending === 'yes').length,
            notAttendingCount: rsvps.filter(r => r.attending === 'no').length
        };

        res.json({ rsvps, stats });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch RSVPs' });
    }
});

// Catch-all route to serve index.html for React Router
app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

initDb()
    .then((database) => {
        db = database;
        console.log('Database initialized');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
