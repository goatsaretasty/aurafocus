import express from "express";
import cors from "cors";
import "dotenv/config";
import { pool } from "./db.js";
import { requireAuth } from "./auth.js";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

// Log a song that's stuck in your head, plus whatever it's stirring up.
app.post("/api/entries", requireAuth, async (req, res) => {
  const { song, musings } = req.body ?? {};
  if (!song || typeof song !== "string" || !song.trim()) {
    return res.status(400).json({ error: "song is required" });
  }

  const { rows } = await pool.query(
    `insert into entries (clerk_user_id, song, musings)
     values ($1, $2, $3)
     returning id, song, musings, created_at`,
    [req.userId, song.trim(), (musings ?? "").trim()]
  );
  res.status(201).json(rows[0]);
});

// Most recent entries first, for the current signed-in user only.
app.get("/api/entries", requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    `select id, song, musings, created_at
     from entries
     where clerk_user_id = $1
     order by created_at desc
     limit 200`,
    [req.userId]
  );
  res.json(rows);
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log(`earworm-server listening on :${port}`));
