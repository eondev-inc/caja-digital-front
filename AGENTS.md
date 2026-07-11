# AGENTS.md — caja-digital-front

React 18 + Vite frontend for "Caja Digital", a Chilean healthcare cashier system.
Talks to a NestJS backend at `api.caja.local` over a Traefik local network.

## Toolchain (read this before running anything)

- **Use pnpm, not npm/yarn.** `pnpm-lock.yaml` is authoritative; `package-lock.json` is intentionally absent. Docker builds with `pnpm install --frozen-lockfile` and fail on lockfile drift.
- **No test runner is configured.** Do not invent `npm test` steps; verify with `pnpm build` and `pnpm lint`.
- **No TypeScript / typecheck step.** Project is JS + JSX.
- Node: dev Dockerfile pins `node:lts-alpine3.22`; prod build uses `node:22-alpine` with `corepack` activating `pnpm@10`.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Vite dev server, **port 3000, host 0.0.0.0, `strictPort`**. Requires `caja.local` + `api.caja.local` resolvable (Traefik / `/etc/hosts`). |
| `pnpm build` | Production build to `dist/`. `terser` minify, `hidden` sourcemaps (kept but stripped), brotli compression, bundle visualizer. |
| `pnpm preview` | Serve the built bundle. |
| `pnpm lint` | `eslint . --ext js,jsx --max-warnings 0 --fix`. **Zero warnings enforced** — pre-commit will reject otherwise. |
| `pnpm precommit` | Runs `lint-staged` (used by husky). |

Required order before a commit: **`pnpm lint` → `pnpm build`** (build catches missing env / import errors lint won't).

## Vite environment (build-time only)

`VITE_API_URL` and `VITE_API_KEY` are inlined by Vite at build time — there is no runtime env. Overrides need a rebuild.
- Local dev: read from `.env` (gitignored; **never commit `.env`** — it holds a real API key).
- CI / Docker: passed via `--build-arg`, otherwise the bundle ships empty strings and the app fails fast.
- Consumed in `src/config.js`; do not import `import.meta.env` directly elsewhere.

## Architecture map

- `src/main.jsx` → `App.jsx` mounts `BrowserRouter` over the route table in `src/routes/index.js`.
- `src/routes/index.js` is the single source of routing truth: each entry has `path`, `element`, `layout`, `isProtected`. Add routes here, not by scattering `<Route>` elsewhere.
- Auth: `PrivateRoute` (`src/components/Wrappers/`) gates `isProtected` routes using `isAuthenticated` from the Zustand store.
- State: one Zustand store in `src/app/store.js`, persisted to **`sessionStorage`** under key `allData`. Never persist `password`, `confirmPassword`, or tokens meant to live in cookies. The `accessToken` is intentionally not persisted (it is kept in memory only).
- API: every request goes through `src/api/axios.js`. Features live in `src/api/<feature>/<name>.<verb>.(get|post|patch).js` and are re-exported from `src/api/index.js`. **Add new endpoints by creating the file and appending its export to `index.js`** — pages import from `../api`, not from individual files.
- Axios baseURL is `${VITE_API_URL}/api/v1/`. `withCredentials: true` (refresh token travels in an httpOnly cookie). A `apikey` header carries `VITE_API_KEY`.
- The 401 response interceptor queues concurrent requests, calls `/auth/refresh`, swaps the access token in the store, and on failure clears auth + `window.location.href = '/login'`. If you touch auth, preserve this refresh queue.
- Forms: React Hook Form + `zodResolver`; schemas live in `src/utils/`. Chilean RUT validation uses the `validar-rut` package — reuse it, don't hand-roll RUT checks.
- UI: Tailwind + Flowbite React. Dark mode is class-based and toggled by `src/hooks/useDarkMode.js` (adds/removes `dark` on `<html>`). Read `docs/COLOR_SYSTEM.md` and `tailwind.config.js` before touching colors — `blue-*` is aliased to `teal-*` so Flowbite's `color="blue"` adopts the **secondary** palette; the primary palette is Emerald backed by CSS variables. Prefer `primary` / `secondary` tokens over raw Tailwind color names.

## Conventions that differ from defaults

- Component files: PascalCase, one component per file, ≤200 lines (split if larger). Functional + hooks only.
- Prettier: single + JSX single quotes, `printWidth: 80`, `trailingComma: all`, `semi: true`. `prettier-plugin-tailwindcss` sorts classes — let it; manual class order will be rewritten.
- User-facing strings and Zod error messages are in **Spanish (cl)**. Identifiers, comments, and code stay in English.
- Timezone `America/Santiago`; date formatting must respect CL locale.
- Branch convention: `feature/EOD-NNNN-<slug>` (Jira ticket prefix `EOD-`). Default branch is `master`.

## Pre-commit

`.husky/pre-commit` → `pnpm precommit` → `lint-staged` runs ESLint `--fix` on staged `*.{js,jsx}` with **max-warnings 0**. If your change can't pass lint, it won't land.

## Existing instruction sources

- `.github/copilot-instructions.md` — broader coding standards (component limits, RHF/Zod patterns, a11y, forbidden practices). Reconcile with it before large refactors.
- `docs/COLOR_SYSTEM.md` — color token contract; read before any theming or Tailwind color change.