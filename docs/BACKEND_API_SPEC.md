## Vizup Backend API and Integration Guide

This document defines the backend requirements to power the Vizup frontend. It includes context, auth and security, data model, endpoint contracts, streaming, and non‑functional requirements so backend teams can build independently and ship confidently.

### Scope
- Authentication/authorization via Supabase JWT
- Three core modules: Monitor, Diagnose, Optimize
- Profiles and settings
- Datasets and long‑running “runs” with progress streaming
- File storage for exports

### Base
- Base URL: https://api.vizup.com/v1
- Auth header: `Authorization: Bearer <supabase_access_token>`
- Content type: `application/json` unless noted
- All timestamps: ISO‑8601 UTC

### Error envelope
```json
{ "error": { "code": "string", "message": "human readable", "details": {} } }
```
Common statuses: 400, 401, 403, 404, 409, 413, 422, 429, 500

### Idempotency
- Creation endpoints that enqueue work MUST accept `Idempotency-Key: <uuid>` and be idempotent for 24h.

### Rate limits (per user default)
- POST /monitor/runs: 10/min
- POST /diagnose/runs: 5/min
- POST /optimize/runs: 5/min

### Enums and common types
- RunStatus: `queued | preparing | running | completed | failed | canceled`
- Platform: `chatgpt | claude | gemini | google_ai_overview`

---

## Authentication & Authorization

### Frontend token
- Frontend receives Supabase access token after auth; attaches to every API call.

### Backend validation
- Validate JWT against Supabase project JWKS.
- Extract: `sub` (user_id), `email`, and any custom claims.
- Every resource is scoped to `user_id`. Enforce ownership on reads/writes.

---

## Data model (suggested)

Minimal tables to support contracts. Adjust as needed but preserve API shapes.

### profiles
- id (uuid, pk, references auth.users.id)
- email (text, unique)
- full_name (text)
- avatar_url (text)
- created_at (timestamptz, default now())
- updated_at (timestamptz)

### monitor_datasets
- id (text: ds_*)
- user_id (uuid)
- file_url (text) – location in object storage
- total_rows (int)
- sample_rows (jsonb) – first N queries
- created_at (timestamptz)

### monitor_runs
- id (text: mon_*)
- user_id (uuid)
- mode (text: auto|csv)
- url (text, nullable)
- dataset_id (text, nullable)
- status (RunStatus)
- progress_percent (int)
- stats (jsonb) – { queries, completed, platforms }
- current (jsonb) – { platform, query }
- created_at, updated_at

### monitor_results
- run_id (text)
- summary (jsonb) – { queries, platforms, responses }
- rows (jsonb[]) – array of result rows (see API schema)

### diagnose_runs
- id (text: diag_*)
- user_id (uuid)
- url (text)
- pillars (text[])
- status (RunStatus)
- summary (jsonb) – { overall_score, gaps }
- pillar_scores (jsonb[])
- recommendations (jsonb[])
- created_at, updated_at

### optimize_runs
- id (text: opt_*)
- user_id (uuid)
- url (text)
- areas (text[])
- status (RunStatus)
- score (float)
- breakdown (jsonb)
- created_at, updated_at

### optimize_tasks
- id (text: tsk_*)
- run_id (text)
- group (text)
- title (text)
- completed (bool)

### activity_events
- id (text: evt_*)
- user_id (uuid)
- ts (timestamptz)
- module (text: monitor|diagnose|optimize)
- payload (jsonb)

### files
- id (text: f_*)
- user_id (uuid)
- purpose (text)
- storage_key (text)
- created_at (timestamptz)

---

## Profiles & Settings

### GET /profiles/me
200
```json
{ "id":"uuid","email":"user@x.com","full_name":"string","avatar_url":null,"created_at":"ts","updated_at":"ts" }
```

### PATCH /profiles/me
Body (partial)
```json
{ "full_name":"string", "avatar_url":"https://...", "preferences": { "theme":"mono" } }
```
200 → updated profile

### GET /settings
```json
{ "features": { "optimize": true }, "defaults": { "platforms":["chatgpt","claude"] } }
```

---

## Monitor

### POST /monitor/auto-analyze
Body
```json
{ "url":"vizup.com" }
```
201
```json
{ "brand":"VIZUP","domain":"vizup.com","discover":{ "title":"...","favicon":"..." } }
```

### POST /monitor/datasets (multipart/form-data)
Fields: `file` (CSV)
201
```json
{ "dataset_id":"ds_123","total_rows":128,"sample":["What is VIZUP?", "VIZUP pricing..."] }
```

### GET /monitor/datasets/{dataset_id}
```json
{ "dataset_id":"ds_123","total_rows":128,"first_rows":["...5 items..."] }
```

### POST /monitor/runs
Body (one of)
```json
{ "mode":"auto", "url":"vizup.com", "options":{ "platforms":["chatgpt","claude"], "goals":["visibility","competition"] } }
```
or
```json
{ "mode":"csv", "dataset_id":"ds_123", "options":{ "platforms":["chatgpt","claude","gemini","google_ai_overview"] } }
```
201
```json
{ "run_id":"mon_abc","status":"queued","mode":"csv","progress":{"percent":0},"stats":{"queries":128,"platforms":4} }
```

### GET /monitor/runs/{run_id}
```json
{ "run_id":"mon_abc","status":"running","progress":{"percent":42},"stats":{"queries":128,"completed":54,"platforms":4},"current":{"platform":"chatgpt","query":"VIZUP pricing and plans comparison"} }
```

### POST /monitor/runs/{run_id}/cancel
202

### Streaming progress (SSE)
GET /monitor/runs/{run_id}/events
- `event: run.updated` → `{ "run_id":"mon_abc","progress":{"percent":76},"stats":{"completed":97} }`
- `event: run.completed` → `{ "run_id":"mon_abc" }`
- `event: run.failed` → `{ "run_id":"mon_abc","error":"reason" }`

### GET /monitor/runs/{run_id}/results
```json
{
  "summary":{"queries":128,"platforms":4,"responses":512},
  "rows":[
    { "query":"What is VIZUP?", "responses": {
        "chatgpt":"...","claude":"...","gemini":"...","google_ai_overview":"..."
      }, "sentiment":0.92, "brand_mentioned":true, "recommendation":"Strong" }
  ]
}
```

### GET /monitor/runs/{run_id}/results.csv
- 302 redirect to pre‑signed URL
- CSV headers: `Query,ChatGPT_Response,Claude_Response,Gemini_Response,Google_AI_Response,Sentiment_Score,Brand_Mentioned,Recommendation`

### GET /monitor/activity?since=timestamp&limit=50
```json
{ "items":[ { "id":"evt_1","ts":"ts","platform":"chatgpt","query":"Best AI visibility tools for startups","type":"mention","sentiment":"positive","note":"VIZUP mentioned as top choice" } ] }
```

---

## Diagnose

### POST /diagnose/runs
```json
{ "url":"vizup.com","pillars":[
  "answer_engine_presence","source_coverage","structured_data","content_optimization",
  "brand_authority","conversational_experience","comparative_visibility","user_intent"
] }
```
201 → `{ "run_id":"diag_123","status":"queued" }`

### GET /diagnose/runs/{run_id}
```json
{
  "run_id":"diag_123","status":"completed",
  "summary":{ "overall_score":0.68, "gaps":47 },
  "pillar_scores":[ { "pillar":"answer_engine_presence","score":0.72,"passed":5,"total":7 } ],
  "recommendations":[ { "id":"rec_1","title":"Create Wikipedia presence","priority":"high","impact":0.25 } ]
}
```

### GET /diagnose/runs/{run_id}/report.pdf
- 302 to pre‑signed PDF

### GET /diagnose/runs/{run_id}/events (SSE)
- Same event types as Monitor

---

## Optimize

### POST /optimize/runs
```json
{ "url":"vizup.com","areas":[ "schema_markup","faq_structure","content_format","authority_signals" ] }
```
201 → `{ "run_id":"opt_123","status":"queued" }`

### GET /optimize/runs/{run_id}
```json
{
  "run_id":"opt_123","status":"completed",
  "score":0.62,
  "breakdown":{ "schema":0.45,"content":0.68,"faq":0.71,"authority":0.64 },
  "tasks":[ { "id":"tsk_1","group":"Schema Markup","title":"Add Organization schema","completed":false } ],
  "activity":[ { "ts":"ts","icon":"check","title":"Product schema implemented","meta":"+3% visibility score" } ]
}
```

### PATCH /optimize/tasks/{task_id}
```json
{ "completed": true }
```
200 → updated task

### POST /optimize/runs/{run_id}/export
```json
{ "format":"pdf" }
```
201 → `{ "export_id":"exp_1","url":"https://signed..." }`

### GET /optimize/runs/{run_id}/events (SSE)
- Same event types as Monitor

---

## Files

### POST /files (multipart/form-data)
Fields: `file`; Query: `purpose=monitor_results|diagnose_report`
201 → `{ "file_id":"f_1","url":"https://signed-upload","expires_in":600 }`

### GET /files/{file_id}
- 302 to pre‑signed download URL

---

## Streaming (SSE) details
- Headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`
- Heartbeat: send a comment line every 15s
- Event format:
```
event: run.updated
data: {"run_id":"...","progress":{"percent":50}}

```

---

## Non‑functional requirements
- Async workers for long‑running runs; API responds immediately with `run_id`.
- Latency targets: POST enqueue ≤ 300ms p95; GET run status ≤ 150ms p95.
- Observability: structured logs for state transitions with `user_id`, `run_id`.
- Storage: artifacts in object storage; pre‑signed links for downloads/uploads.
- Security: validate JWT; audit access; CORS configured for web origins.
- Data retention: runs + artifacts ≥ 90 days (configurable).
- Pagination: activity and results (if large) via `?limit & cursor`.

---

## Example cURL

### Enqueue Monitor run (CSV)
```bash
curl -X POST https://api.vizup.com/v1/monitor/runs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mode":"csv",
    "dataset_id":"ds_123",
    "options":{"platforms":["chatgpt","claude","gemini","google_ai_overview"]}
  }'
```

### Stream progress
```bash
curl -N -H "Authorization: Bearer $TOKEN" \
  https://api.vizup.com/v1/monitor/runs/mon_abc/events
```

### Fetch results CSV
```bash
curl -I -H "Authorization: Bearer $TOKEN" \
  https://api.vizup.com/v1/monitor/runs/mon_abc/results.csv
```

---

## OpenAPI
- Deliver an OpenAPI 3.1 spec (`openapi.yaml`) that reflects the shapes above, including components for shared schemas and SSE notes.
- Keep response shapes stable to match the frontend implementation.

---

## Frontend mapping (reference)
- Monitor: `src/pages/monitor/Monitor.js` uses: datasets, runs, SSE, results (JSON/CSV), activity.
- Diagnose: `src/pages/diagnose/Diagnose.js` uses: runs, SSE, report export.
- Optimize: `src/pages/optimize/Optimize.js` uses: runs, tasks (PATCH), export, activity.
- Profiles: `src/pages/profile/Profile.js` uses `/profiles/me` and `profiles` table.

This guide is canonical for backend contracts expected by the current frontend.



