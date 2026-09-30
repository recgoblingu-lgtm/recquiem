# RecQuiem community site

A RecQuiem community website with the source site's image assets, a black/gray/silver visual treatment, room discovery, account pages, and API-ready leaderboard and event routes. The face mark sits beside the plain `RecQuiem` home heading; the site uses a familiar system font and avoids slogan panels. Images from the owner's site are local under `client/public/reference-assets/`, not hotlinked. The owner authorized reuse. `Icons/default.png` is the replaceable header wordmark; `Icons/face.png` supplies the favicon and project mark.

## Run locally

Use `pnpm dev:static` for Preview and `pnpm build:static` to create a static production bundle. Run `pnpm check` for TypeScript and `pnpm test` for the existing tests. No managed server or database is required.

## Connect an API

With `VITE_API_BASE_URL` blank, the site intentionally shows no room, account, ranking, event, or activity records. Leaderboard and Events navigation stays hidden. Room, People, Leaderboard, Events, search, profile, and detail routes show empty states until a real API base URL is supplied; there are no seeded player or room records.

Copy `.env.example` to `.env.local`, set `VITE_API_BASE_URL` to the public API origin, and adjust the route variables only if the service uses different paths. The HTTP adapter is `client/src/data/httpApi.ts`; endpoint paths are centralized in `client/src/data/endpoints.ts`. The typed contract lives in `client/src/data/models.ts`. `VITE_*` values are public: do not place private API keys or secrets in the browser. APIs requiring secrets need an authenticated server-side proxy.

| Method and path | Response |
| --- | --- |
| `GET /rooms` | `Room[]` |
| `GET /rooms/:id` | `Room` or `null` |
| `GET /accounts` | `Account[]` |
| `GET /accounts/:id` | `Account` or `null` |
| `GET /leaderboard?period=week` | `LeaderboardEntry[]` |
| `GET /events` | `CommunityEvent[]` |
| `GET /activity` | `ActivityItem[]` |
| `GET /search?q=...&scope=all` | `{ "rooms": Room[], "people": Account[] }` |

Endpoint override names and defaults are documented in `.env.example`. `CommunityApi` lets the current empty provider be replaced with the existing HTTP adapter without changing page components.

## Routes

The app provides `/`, `/rooms`, `/rooms/:id`, `/people`, `/people/:id`, `/leaderboard`, `/events`, `/download`, `/search`, `/login`, `/profile`, `/privacy`, and `/credits`. `client/public/manus-routes.json` lists the application routes.

## Reference assets

Images under `client/public/reference-assets/` were copied from accessible paths on `https://recquiem.net` with the owner's authorization. The original social-preview image path `Icons/EBanner.png` returned 404; the site uses the working banner image instead. Source paths and file types are listed in `client/public/reference-assets/asset-sources.md`.
