# OWASP Top 10 + ASVS L1 Audit (Frontend)

Date: 2026-07-20  
Project: `caja-digital-front`  
Scope: Frontend React/Vite only (local baseline; staging validation pending)

## 1) Scope and method

- **Included**: client routing/auth flow, token handling, build/runtime config, dependency exposure.
- **Baseline tools**:
  - `lens_diagnostics mode=full refreshRunners=all`
  - `pnpm audit --prod --audit-level moderate`
  - targeted code inspection in:
    - `src/api/axios.js`
    - `src/app/store.js`
    - `src/config.js`
    - `src/App.jsx`, `src/routes/index.js`
    - `nginx.conf`, `index.html`, `vite.config.js`

## 2) Executive summary

Security posture is **medium risk** for this frontend scope.

Main risk drivers:

1. Outdated vulnerable dependencies (notably `axios` and router chain).
2. Session/auth data persisted in `sessionStorage` due global Zustand persist.
3. Missing explicit security headers in `nginx.conf`.
4. Build-time `VITE_API_KEY` design (public in browser bundle) requires strict key classification.

No direct use of `eval`, `new Function`, or `dangerouslySetInnerHTML` was found in `src/`.

## 3) Findings matrix

### F-01 — Vulnerable dependencies (OWASP A06)

- **Severity**: High
- **Evidence**:
  - `pnpm audit --prod` reports **50 vulnerabilities** (1 critical, 23 high, 24 moderate, 2 low).
  - High/critical advisories involve `axios`, `react-router` chain, and transitive packages (`form-data`, `glob`, `minimatch`, `picomatch`, etc.).
  - Installed versions observed:
    - `axios@1.7.9`
    - `react-router-dom@6.28.2` (`@remix-run/router@1.21.1`)
- **Risk context**:
  - Some advisories are Node-adapter specific (lower runtime impact for browser-only execution), but dependency risk remains significant and should be remediated.
- **Recommendation**:
  - Upgrade `axios` to `>=1.18.0`.
  - Upgrade `react-router-dom` within v6 to `>=6.30.4` first (avoid major jump risk).
  - Re-run `pnpm audit --prod` and record residual risk.

### F-02 — Access token/auth state persistence in sessionStorage (OWASP A07)

- **Severity**: High
- **Evidence**:
  - `src/app/store.js` uses `persist(...)` with no `partialize`, therefore default persists **entire** state into `sessionStorage` (`name: 'allData'`).
  - Store includes `accessToken` and `isAuthenticated` fields.
- **Risk context**:
  - Any XSS in same origin can exfiltrate persisted token/state.
  - State tampering is possible client-side (UI gate bypass risk; server must enforce authz regardless).
- **Recommendation**:
  - Add `partialize` to persist only non-sensitive keys (`formData`, `darkMode`, optional non-sensitive preferences).
  - Keep `accessToken` in-memory only.

### F-03 — API key embedded in client bundle by design (OWASP A04 / A02 context)

- **Severity**: Medium
- **Evidence**:
  - `src/config.js`: `apiKey = import.meta.env.VITE_API_KEY`
  - `src/api/axios.js`: sends `apikey` header on all requests.
- **Risk context**:
  - Any `VITE_*` value is public to the browser; must never be treated as a secret.
- **Recommendation**:
  - Treat frontend API key as public identifier only, with strict backend controls (origin restrictions, low privilege, rotation).
  - If true secret is required, move it server-side (BFF/proxy pattern).

### F-04 — Missing explicit security headers in nginx config (OWASP A05)

- **Severity**: Medium
- **Evidence**:
  - `nginx.conf` lacks explicit `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, `Permissions-Policy`.
- **Risk context**:
  - Browser hardening depends on upstream defaults; explicit policy is preferred.
- **Recommendation**:
  - Add baseline security headers at Nginx or Traefik edge.
  - Define CSP compatible with Google Fonts and API origin.

### F-05 — Potential open redirect flagged in client redirect line (A01/A03 check)

- **Severity**: Low (likely false positive)
- **Evidence**:
  - SAST rule flagged `src/api/axios.js` on `window.location.href = '/login'`.
- **Risk context**:
  - Current redirect target is static internal path, not user-controlled.
- **Recommendation**:
  - Keep as accepted false positive (or change to router navigate helper) and document rationale.

## 4) ASVS L1 coverage snapshot (frontend-applicable)

- **V1 Architecture**: Partial pass (auth model exists, but token persistence needs correction).
- **V2 Auth**: Partial pass (guarding implemented, but client persistence weakens posture).
- **V3 Session**: Partial fail (sensitive auth material persisted in sessionStorage).
- **V4 Access control**: Client-side route guard present; server-side verification out-of-scope and must be validated in API audit.
- **V5 Input validation**: Good baseline with Zod schemas; server validation still required (out-of-scope).
- **V14 Config**: Partial fail (security headers not explicit in serving config).

## 5) Prioritized remediation plan

### P1 (this sprint)

1. Upgrade `axios` to secure range and re-test auth/refresh flow.
2. Upgrade `react-router-dom` to `6.30.4+` and validate routing.
3. Remove persistence of `accessToken`/`isAuthenticated` via Zustand `partialize`.
4. Add baseline security headers (Nginx/Traefik).

### P2

1. Establish dependency hygiene gate in CI (`pnpm audit --prod` threshold policy).
2. Add explicit false-positive registry for accepted SAST findings.

### P3

1. Add automated DAST smoke for staging (auth redirects, CSP, headers, clickjacking, mixed-content).
2. Extend audit to backend API + edge configuration for full OWASP coverage.

## 6) Staging validation checklist (pending execution)

- [ ] Verify response headers (`CSP`, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`/`X-Frame-Options`, `Permissions-Policy`).
- [ ] Confirm no token/auth flags are persisted in `sessionStorage`.
- [ ] Confirm refresh flow still works with concurrent 401 retries.
- [ ] Verify client redirects cannot be influenced with protocol-relative or external paths.
- [ ] Re-run `pnpm audit --prod` after upgrades and attach residual list.

## 7) Notes / limitations

- This audit covered **frontend repository only** as requested.
- Full OWASP closure requires server/API and edge infra validation in staging/prod.

## 8) Remediation update (executed after first baseline)

### Implemented now

1. **Dependency upgrades (critical chain)**
   - `axios` upgraded to `^1.18.1`.
   - `react-router-dom` upgraded to `^6.30.4` (v6-safe upgrade).
2. **Session hardening in Zustand store**
   - Added `partialize` to persist only `formData` and `darkMode`.
   - Added `version: 2` + `migrate` to clear legacy persisted auth/session keys.
3. **Auth redirect hardening**
   - Replaced direct `window.location.href` assignment with controlled same-origin login redirect helper.
4. **Nginx browser-hardening headers**
   - Added CSP, `X-Content-Type-Options`, `X-Frame-Options`,
     `Referrer-Policy`, and `Permissions-Policy`.

### Revalidation results

- `pnpm lint`: **PASS**
- `pnpm build`: **PASS**
- `pnpm audit --prod --audit-level moderate`:
  - Before: **50** vulnerabilities (1 critical / 23 high / 24 moderate / 2 low)
  - After: **14** vulnerabilities (8 high / 5 moderate / 1 low)
- `lens_diagnostics` on remediated files (`src/api/axios.js`,
  `src/app/store.js`, `nginx.conf`): no blocking findings.

### Residual risk (open)

- Remaining high/moderate vulnerabilities are currently transitive through
  `flowbite-react`/`tailwindcss` ecosystem paths (`glob`, `minimatch`,
  `picomatch`, `rollup`, `brace-expansion`, `yaml`, `postcss`).
- Requires controlled dependency strategy (override/upgrade path) and
  staging regression validation before closure.
