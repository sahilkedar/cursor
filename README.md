# IMDb-style app (live DB connected)

This app now runs with a real backend and database:

- **Backend:** Node.js + Express
- **Database:** SQLite (`data/imdb.db`)
- **Frontend:** HTML/CSS/JS calling `/api/content`

The Mission: Impossible JSON document is seeded into the database on first run.

## Run locally

```bash
npm install
npm start
```

Open:

- `http://localhost:3000`

## Confirm database connectivity

Check health:

```bash
curl http://localhost:3000/api/health
```

List content:

```bash
curl http://localhost:3000/api/content
```

## Update the object and see UI changes

You can update through the API:

```bash
curl -X PUT http://localhost:3000/api/content/tt9603208 \
  -H "Content-Type: application/json" \
  -d @payload.json
```

Or edit directly in SQLite:

```bash
sqlite3 data/imdb.db
```

Example SQL:

```sql
UPDATE content_items
SET payload = json_set(payload, '$.title', 'Mission: Impossible - Edited Title')
WHERE content_id = 'tt9603208';
```

The UI auto-synces every 10 seconds and also supports manual refresh via button.
