# Backend Integration Instructions

1) Environment Variables
- Add to `.env.local` and Vercel:
```
REACT_APP_API_URL=https://vizupauditvisibilityaug25-production.up.railway.app/api/v1
```

2) Auth Implementation (placeholder)
- File: `src/lib/auth.js` exports `authManager` with `signIn`, `signUp`, `signOut`, `getToken`.
- Endpoints assumed:
  - POST /auth/sign-in { email, password }
  - POST /auth/sign-up { email, password }
  - Response: { token: string }

3) API Client
- File: `src/lib/api.js` exports `apiClient` and `ErrorHandler`.
- Uses `REACT_APP_API_URL` and attaches `Authorization: Bearer <token>` if present.

4) Real-time (SSE)
- Hook: `src/hooks/useMonitorProgress.js`
- Subscribes to `GET /monitor/runs/{id}/events` with events: `run.updated`, `run.completed`, `run.failed`.

5) Health Check
- `curl https://vizupauditvisibilityaug25-production.up.railway.app/api/v1/health`

6) Frontend Changes Needed
- Replace current Supabase-driven auth calls with `authManager` once backend auth is live.
- Swap monitor/diagnose/optimize API calls to `apiClient` using endpoints from `docs/BACKEND_API_SPEC.md`.

> Note: Files above are scaffolds and may need endpoint paths to match your backend exactly.
