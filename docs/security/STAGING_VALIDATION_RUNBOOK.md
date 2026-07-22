# Staging Validation Runbook

Operationalizes section 6 of
`OWASP_TOP10_ASVS_L1_AUDIT_2026-07-20.md` as a step-by-step procedure for the
staging environment. This runbook is **not** executed as part of the
`owasp-residual-mitigation` SDD change (it requires a staging environment);
it is the contract the operator runs after the change is deployed to staging
before promoting to production.

Each step has:

- **Command / procedure** — what to run.
- **Expected result** — the pass criterion.
- **Failure handling** — which finding / cluster owns the regression and
  where to report it.

## Prerequisites

- Staging deployment of the frontend with the `owasp-residual-mitigation`
  change merged.
- Browser with devtools (Network + Application tabs).
- `pnpm` available in the operator's shell (for the post-upgrade audit step).
- Backend reachable at `https://api.caja.local` (or the staging API origin).
- A test user able to log in and trigger at least one authenticated request.

## Step 1 — Response security headers

- **Command / procedure** — Open the staging origin in the browser. Open
  devtools → Network → select the root document request (`/`) → Response
  Headers. Verify presence of:
  - `Content-Security-Policy`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
- **Expected result** — All five headers present AND the CSP from `nginx.conf`
  (or the Traefik edge) renders untouched.
- **Failure handling** — Missing or modified headers → regression in
  **Cluster A** risk surface (delivering config). File against
  `nginx.conf` / edge config. Reference finding F-04.

## Step 2 — Session storage token absence

- **Command / procedure** — Log in. Open devtools → Application → Session
  Storage → key `allData`. Expand the persisted JSON.
- **Expected result** — `state.formData` and `state.darkMode` present.
  `state.accessToken`, `state.isAuthenticated`, `state.userInfo`, and
  `state.openRegister` MUST be absent or empty (cleared by the `migrate`
  function and never re-persisted by `partialize`).
- **Failure handling** — Any sensitive auth key persisted → regression in
  **F-02** mitigation (`src/app/store.js` `partialize`). File against
  `src/app/store.js`. Reference finding F-02.

## Step 3 — Refresh-401 concurrency

- **Command / procedure** — Open 2 tabs on the same authenticated session.
  Expire the access token (wait for expiry or force-clear it in memory via
  devtools). In both tabs simultaneously, trigger an API request that
  returns 401 (e.g., reload a protected view). Observe the network panel in
  both tabs.
- **Expected result** — Exactly ONE `/auth/refresh` request fires; the second
  tab's 401 is queued and resolves with the new token from the shared
  `failedQueue`. Both tabs end authenticated.
- **Failure handling** — Multiple refresh calls or a left tab logout →
  regression in the 401 interceptor (`src/api/axios.js`). File against
  `src/api/axios.js`. Reference audit section 6 bullet 3.

## Step 4 — Redirect origin safety

- **Command / procedure** — On a logged-out or expired session, attempt:
  - `https://<staging-origin>/?next=//evil.com`
  - `https://<staging-origin>//evil.com`
  - a protocol-relative payload (`//evil.com`) as any redirect parameter.
  Trigger a logout path (force refresh failure or clear token).
- **Expected result** — `redirectToLogin` in `src/api/axios.js` ignores any
  user input; the browser lands on `https://<staging-origin>/login`.
- **Failure handling** — If the browser navigates to an external host →
  finding F-05 is NO LONGER a false positive. Re-open F-05 in
  `docs/security/FINDINGS_REGISTRY.md` and fix `redirectToLogin` before
  promoting. File against `src/api/axios.js`.

## Step 5 — Post-upgrade `pnpm audit`

- **Command / procedure** — In the operator shell, clone the deployed
  revision and run `pnpm install --frozen-lockfile` then
  `pnpm audit --prod --audit-level moderate`. Capture the JSON output
  (`pnpm audit --prod --json`) and attach it to the deployment record.
- **Expected result** — `No known vulnerabilities found` (audit count 0).
- **Failure handling** — Any high/critical advisory → Cluster A regression.
  Compare advisories against the `pnpm.overrides` block in `package.json`.
  File against `package.json` / the override that regressed and re-run the
  CI workflow `.github/workflows/security-audit.yml` locally to reproduce.

## Sign-off

- All steps MUST pass before production promotion.
- Record: operator, date, environment (URL), attached `pnpm audit` JSON, and
  a screenshot of the response headers from Step 1.
- On any failure, do not promote; route the failure per its step's
  **Failure handling** and re-run from Step 1 after the fix lands on staging.

## Cross-references

- Source audit: `docs/security/OWASP_TOP10_ASVS_L1_AUDIT_2026-07-20.md`
  (section 6).
- Findings registry: `docs/security/FINDINGS_REGISTRY.md`.
- Backend / edge audit extension: tracked as the GitHub issue created by the
  `owasp-residual-mitigation` SDD change (audit §P3).
- SDD archive: topic key `sdd/owasp-residual-mitigation/archive-report`
  (Engram).