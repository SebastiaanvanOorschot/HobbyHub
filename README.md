# HobbyHub

Landing page / portal for personal hobby projects, live at **[sebaslive.xyz](https://sebaslive.xyz)**.

A single static page: a header with two outbound links and a grid of project cards. No routing, no state management, no data fetching — everything lives in [`src/App.vue`](src/App.vue).

## Stack

- **Vue 3** + **Vite** — plain JavaScript, no TypeScript
- Static single-page app, served by **nginx** in Docker
- Single-file component (`src/App.vue`), mounted from `src/main.js`
- No backend, no database, no runtime dependencies beyond Vue

## Local dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output in dist/
npm run preview   # serve the built dist/ locally
```

## Project structure

```
index.html      # HTML shell; loads Google Fonts (Space Mono + Material Symbols)
src/main.js     # createApp(App).mount('#app')
src/App.vue     # the entire page: template, card data, and all styling
nginx.conf      # SPA routing + gzip
Dockerfile      # node:20-alpine build stage -> nginx:alpine serve stage
```

## What this page links to

Project cards (defined in the `apps` array in `src/App.vue`):

| Project | URL |
|---|---|
| Family Calendar | https://calendar.sebaslive.xyz |
| Secret Share | https://secretshare.sebaslive.xyz |

Header buttons:

| Button | URL |
|---|---|
| GitHub | https://github.com/SebastiaanvanOorschot |
| Curriculum Vitae | https://resume.sebaslive.xyz |

Adding a project card means adding one entry (`href`, `icon`, `label`, `desc`) to the `apps` array — no other change needed.

## Conventions & styling

- **Colors** are CSS custom properties defined once in `:root` (`--bg`, `--surface`, `--border`, `--accent`, and the `--text-*` tokens). No hardcoded hex values outside `:root` — use the tokens.
- **Font** is [Space Mono](https://fonts.google.com/specimen/Space+Mono) (Google Fonts), applied on `body` for the whole page, with a monospace system fallback stack.
- **Icons** are [Google Material Symbols (Outlined)](https://fonts.google.com/icons) for generic icons such as the card icons, colored with `--accent`. Inline SVG is used only for brand logos that Material Symbols does not carry — currently just the GitHub button.

## Deployment

- **Platform:** Railway
- **URL:** https://sebaslive.xyz
- **Trigger:** push to `master` → Railway auto-builds the Dockerfile and deploys
- Purely static — the container is nginx serving the built `dist/`

The nginx config in [`nginx.conf`](nginx.conf) handles SPA routing via `try_files $uri $uri/ /index.html`, so any path falls back to `index.html`.
