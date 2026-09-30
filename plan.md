# Recquiem website implementation plan

## Goal
Deliver `recquiem-web` as a private GitHub repository: a clean, black/gray/silver Rec Room community site closely following the structure and identity of the owner's `https://recquiem.net/Home` reference while improving polish and browseability. The owner will send a new logo later; use the existing RecQuiem header wordmark and face icon now, behind replaceable assets.

## Product outcomes
- A RecQuiem community homepage with compact nav, global search, a wide reference-image hero with the face mark beside the plain heading “RecQuiem,” the four source site's Cross-Platform/Create/Compete/Cooperate panels, and a featured-room grid. Keep creator names, slogan copy, activity and closing panels off the homepage.
- A searchable, filterable, sortable, responsive room catalog and room detail pages with source art, creator, tags, activity, occupancy/capacity, platform compatibility and honest visit/play preview actions.
- Searchable people discovery and profile detail pages with creative/activity summaries and reversible follow state.
- A real leaderboard view (mock-ranked users), events, login/profile placeholder states, and reference-site privacy/credits destinations.
- A modular API layer for rooms, accounts/profiles, leaderboard, activity, events and unified search. With no API base URL, every data collection is empty and the UI shows connection-aware empty states rather than mock records.
- Accessible mobile and desktop layouts, restrained silver interactions, keyboard focus, reduced-motion support, no emoji, and no statements claiming AI authorship.
- All reachable reference-site image files downloaded to the project and reused locally (rather than hotlinked); attribution/provenance and the owner's authorization are documented in project notes.

## Design direction
Use the owner-approved RecQuiem reference as ground truth for page structure and image selection, while adapting its layout to the explicitly requested near-black, charcoal, gray, and silver palette. Refer to `ideas.md` for the detailed visual rules. Keep the existing visual brand path isolated so the owner can replace it with their forthcoming logo.

## Routes
- `/` — home/community overview
- `/rooms` — room catalog, search, filter and sort
- `/rooms/:id` — room detail
- `/people` — account/creator discovery
- `/people/:id` — public creator profile
- `/leaderboard` — ranked creators, mock-backed
- `/events` — community events, mock-backed
- `/search` — cross-content results for rooms and people
- `/login` and `/profile` — honest preview states until authentication is connected
- `/privacy` and `/credits` — familiar reference-site information destinations

Maintain `client/public/manus-routes.json` as the complete page-route manifest. Use SPA routing for these public pages; keep static assets outside that fallback.

## Structure and data flow
- `client/src/data/models.ts`: strict interfaces/enums for room, account, leaderboard row, event and activity data.
- `client/src/data/endpoints.ts`: editable, centralized endpoint path map.
- `client/src/data/httpApi.ts`: URL joining, JSON response handling and error contract, with no protected key in the browser.
- `client/src/data/mockApi.ts`: representative data and the typed room/account/activity services used until a live base URL is configured.
- `client/src/data/api.ts`: selects the current provider and exports stable methods the UI consumes.
- `client/src/components/`: navigation, search, room cards, creator cards, feature panels, filters and activity panels.
- `client/src/pages/`: home, rooms, room detail, people, profile, leaderboard, events, search and static-information views.
- `client/src/assets/` or `client/public/reference-assets/`: downloaded images from the owner's website, organized by the original directory.

Use `VITE_API_BASE_URL` and explicit, readable endpoint-path configuration. Document expected response shapes and a concrete example, with examples for `/rooms`, `/accounts`, `/leaderboard`, `/activity`, `/events`, `/search`, `/rooms/:id` and `/accounts/:id`. Never embed credentials in the frontend. Mock provider is the default and needs no server/database; future public APIs can be configured without enabling managed features now.

## Assets
Inventory pages linked from the owner's public navigation; capture each same-origin image, favicon, open-graph artwork, feature panel image, nav icon, banner and platform/download badge. Copy the image files into the project and reference local copies in UI. Use the reference site's own Banner.png, default wordmark, face icon, Cross-Platform.png, Create.png, Compete.png and Cooperate.png in planned header, hero, feature panel and branding placements; use other discovered assets in related events, platform, and navigation contexts. Do not hotlink. Keep all discovered original images in the asset set.

## Serving and deployment
The preview and initial product are a static Vite/React application using the default static build (`pnpm build:static`, output `dist/public`) with no managed backend, database, user login, or secret API key. Mock content is bundled in the client; a future API uses the typed browser request boundary and a configurable base URL/endpoint map. If a later API requires secrets, authenticated mutation, persistent user data or same-origin server routing, add the server/database through WebDev configuration only at that integration stage. Static page paths rely on SPA fallback; hashed build assets can receive long-lived immutable caching, while HTML should be revalidated. Do not publish unless specifically requested.

## Verification
- Inspect source and run the starter's TypeScript checker and existing test suite/build where appropriate; resolve implementation errors and report exact checks.
- Confirm current page routes match the served `manus-routes.json` JSON contract and direct page paths are declared.
- Confirm the typed mock provider covers rooms, people/accounts, leaderboard, events and activity; endpoint/base-URL mapping is centralized and credentials aren't in client code.
- Confirm local reference assets and replaceable logo/favicon paths exist; verify all image references point to project files.
- Confirm the new GitHub repository is private, contains the completed site on `main`, and the repository transfer succeeded through WebDev's authorized confirmation flow.
