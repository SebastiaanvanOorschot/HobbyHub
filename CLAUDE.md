# HobbyHub

Landing page / portal for all personal hobby projects at **sebaslive.xyz**.

## Stack
- Vue 3 + Vite (plain JS, no TypeScript)
- Static single-page app served by nginx in Docker

## Deployment
- **Platform:** Railway
- **URL:** https://sebaslive.xyz
- **Trigger:** push to `master` → Railway auto-builds and deploys
- **No backend, no database** — purely static

## Projects linked from this page
| Project | URL |
|---|---|
| Agenda Calendar | https://calendar.sebaslive.xyz |
| SecretShare | https://secretshare.sebaslive.xyz |
| Resume | https://resume.sebaslive.xyz |

## Local dev
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output in dist/
```

## Notes
- nginx config is in `nginx.conf` — SPA routing via `try_files $uri $uri/ /index.html`
