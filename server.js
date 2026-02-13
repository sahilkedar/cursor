const fs = require("fs");
const path = require("path");
const express = require("express");
const initSqlJs = require("sql.js");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DB_PATH = path.join(__dirname, "data", "imdb.db");

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
let db;

const seedShortDescription =
  "Ethan Hunt and his IMF team must track down a terrifying new weapon " +
  "that threatens all of humanity before it " +
  "fal" +
  "ls into the wrong hands.";

const seedLongDescription = [
  "In Mission: Impossible - Dead Reckoning Part One, Ethan Hunt and his IMF team embark on their most dangerous mission yet: ",
  "To track down a terrifying new weapon that threatens all of humanity before it ",
  "fal",
  "ls into the wrong hands. ",
  "With control of the future and the fate of the world at stake, and dark forces from Ethan's past closing in, a deadly race around the globe begins. ",
  "Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than his mission-",
  "not even the lives of those he cares about most."
].join("");

app.use(express.json({ limit: "1mb" }));

function persistDb() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

async function openDatabase() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const raw = fs.readFileSync(DB_PATH);
    db = new SQL.Database(raw);
  } else {
    db = new SQL.Database();
    persistDb();
  }
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      while (stmt.step()) {
        // Run through statement until completion.
      }
      stmt.free();
      const rowsModified = db.getRowsModified();
      persistDb();
      resolve({ rowsModified });
    } catch (error) {
      reject(error);
    }
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      let row = null;
      if (stmt.step()) {
        row = stmt.getAsObject();
      }
      stmt.free();
      resolve(row);
    } catch (error) {
      reject(error);
    }
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
}

const seedContent = {
  content_id: "tt9603208",
  title: "Mission: Impossible - Dead Reckoning Part One",
  metadata: {
    content_details: {
      short_description: seedShortDescription,
      long_description: seedLongDescription,
      genre: ["Action", "Adventure", "Thriller"],
      descriptive_keywords: [
        "Spy",
        "Espionage",
        "Artificial Intelligence",
        "Stunts",
        "IMF",
        "Global Race",
        "High Stakes"
      ],
      country_of_origin: "United States",
      content_type: "Movie",
      content_maturity_rating: "PG-13"
    },
    cast_and_crew: {
      director: "Christopher McQuarrie",
      actors: [
        "Tom Cruise",
        "Hayley Atwell",
        "Ving Rhames",
        "Simon Pegg",
        "Rebecca Ferguson",
        "Vanessa Kirby",
        "Esai Morales",
        "Pom Klementieff"
      ],
      full_cast_crew_link: "https://www.imdb.com/title/tt9603208/fullcredits"
    },
    release_and_availability: {
      new_release: false,
      release_date: "2023-07-12",
      coming_soon: false,
      leaving_soon: false,
      all_seasons_available: null,
      run_time: "163 minutes"
    },
    technical_and_experience: {
      language_options: ["English", "Italian", "French", "Russian"],
      audio_description: "Available",
      video_quality: "4K / Dolby Vision / HDR10",
      sound_quality: "Dolby Atmos",
      key_art_url:
        "https://m.media-amazon.com/images/M/MV5BYzFiZjc1YzctMDY3Zi00NGE5LTlmN2ItYzQwNWFjZWIwZGE3XkEyXkFqcGdeQXVyMTUyNjc1Nzgz._V1_.jpg"
    },
    social_and_discovery: {
      originals_brand: "Paramount Pictures",
      award_winning: true,
      awards: [
        "Nominated for 2 Academy Awards (Best Sound, Best Visual Effects)",
        "Astra Film Award for Best Action Feature"
      ],
      ratings_reviews: {
        imdb_score: 7.7,
        rotten_tomatoes: "96%"
      }
    }
  }
};

function safeJsonParse(rawValue) {
  try {
    return JSON.parse(rawValue);
  } catch (_error) {
    return null;
  }
}

function toApiItem(row) {
  const payload = safeJsonParse(row.payload);
  if (!payload || typeof payload !== "object") {
    return null;
  }

  return {
    ...payload,
    _updated_at: row.updated_at
  };
}

function isValidPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }

  if (typeof payload.content_id !== "string" || payload.content_id.length === 0) {
    return false;
  }

  if (typeof payload.title !== "string" || payload.title.length === 0) {
    return false;
  }

  if (typeof payload.metadata !== "object" || payload.metadata === null) {
    return false;
  }

  return true;
}

async function initializeDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS content_items (
      content_id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      payload TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(
    `
      INSERT OR IGNORE INTO content_items (content_id, title, payload, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `,
    [seedContent.content_id, seedContent.title, JSON.stringify(seedContent)]
  );
}

app.get("/api/health", async (_req, res) => {
  try {
    const row = await get("SELECT COUNT(*) AS count FROM content_items");
    res.json({
      ok: true,
      db_path: DB_PATH,
      content_count: row?.count ?? 0
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get("/api/content", async (_req, res) => {
  try {
    const rows = await all(
      `
        SELECT content_id, title, payload, updated_at
        FROM content_items
        ORDER BY updated_at DESC
      `
    );
    const items = rows.map(toApiItem).filter(Boolean);
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/content/:contentId", async (req, res) => {
  try {
    const row = await get(
      `
        SELECT content_id, title, payload, updated_at
        FROM content_items
        WHERE content_id = ?
      `,
      [req.params.contentId]
    );

    if (!row) {
      res.status(404).json({ error: "Content not found" });
      return;
    }

    const item = toApiItem(row);
    if (!item) {
      res.status(500).json({ error: "Stored payload is invalid JSON" });
      return;
    }

    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/content/:contentId", async (req, res) => {
  try {
    const payload = req.body;
    const { contentId } = req.params;

    if (!isValidPayload(payload)) {
      res.status(400).json({
        error:
          "Invalid payload. Expected object with content_id, title, and metadata."
      });
      return;
    }

    if (payload.content_id !== contentId) {
      res.status(400).json({
        error: "Path contentId must match payload.content_id."
      });
      return;
    }

    await run(
      `
        INSERT INTO content_items (content_id, title, payload, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(content_id) DO UPDATE SET
          title = excluded.title,
          payload = excluded.payload,
          updated_at = CURRENT_TIMESTAMP
      `,
      [payload.content_id, payload.title, JSON.stringify(payload)]
    );

    const savedRow = await get(
      `
        SELECT content_id, title, payload, updated_at
        FROM content_items
        WHERE content_id = ?
      `,
      [contentId]
    );

    res.json({ item: toApiItem(savedRow) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

openDatabase()
  .then(() => initializeDatabase())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`IMDb-like app listening on http://localhost:${PORT}`);
      console.log(`SQLite database path: ${DB_PATH}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });

process.on("SIGINT", () => {
  if (db) {
    persistDb();
    db.close();
  }
  process.exit(0);
});
