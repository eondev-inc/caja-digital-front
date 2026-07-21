# Security Findings Registry

This registry records security-audit findings whose mitigation is an
**accepted false-positive** or a **classification decision** rather than a code
fix. It is the companion of `OWASP_TOP10_ASVS_L1_AUDIT_2026-07-20.md` and is
kept in sync with the audit's remediation state.

## Schema

| ID | Status | Severity | Date recorded | Reviewer | Re-eval trigger | Evidence | Rationale |
| --- | --- | --- | --- | --- | --- | --- | --- |

Legend:

- `status` — `accepted-false-positive` | `classification` | `superseded`
- `evidence` — concrete code reference or audit section reference
- `re-eval trigger` — the condition under which the entry must be re-evaluated

## Entries

### F-05 — Open redirect (accepted false-positive)

| Field | Value |
| --- | --- |
| ID | F-05 |
| Status | accepted-false-positive |
| Severity | Low |
| Date recorded | 2026-07-20 |
| Reviewer | auditor-2026-07-20 |
| Re-eval trigger | If the login redirect target becomes dynamic or user-influenced |
| Evidence | `src/api/axios.js:24-29` — `redirectToLogin` builds the target via `new URL('/login', window.location.origin)` and uses `window.location.replace(...)`. The target is a static internal `/login` path, not user-controlled. |
| Rationale | SAST flagged the previous bare `window.location.href = '/login'` assignment as an open-redirect risk. The redirect target is a static same-origin path: the `URL` constructor with `window.location.origin` as base guarantees the destination scheme/host stays on the same origin. No request parameter, query string, or external value enters the assignment. Re-evaluate only if the target path becomes computed from user input. |

### F-03 — API key embedded in client bundle (classification)

| Field | Value |
| --- | --- |
| ID | F-03 |
| Status | classification (public identifier) |
| Severity | Medium |
| Date recorded | 2026-07-20 |
| Reviewer | auditor-2026-07-20 |
| Re-eval trigger | If the backend drops origin restrictions, or the API key gains elevated privilege, or the frontend begins treating the key as a secret |
| Evidence | `src/config.js` — `apiKey = import.meta.env.VITE_API_KEY`; `src/api/axios.js` — `apikey` header sent on all requests. Any `VITE_*` value is inlined by Vite at build time and is therefore public to the browser bundle. |
| Rationale | The frontend API key is a **public identifier**, not a secret. By Vite's design, every `import.meta.env.VITE_*` value is readable by any client. Treating it as a secret would be a category error. The security boundary is enforced by the backend, which must: (1) restrict the key by origin / referer, (2) scope it to low-privilege operations, and (3) provide a rotation procedure. If a true secret is required, it must live server-side behind a BFF or edge proxy — this is out of scope for the frontend repository and tracked as the backend audit extension issue (see `docs/security/STAGING_VALIDATION_RUNBOOK.md` cross-reference). |

## Maintenance

- Add a new entry whenever an audit produces a finding whose resolution is
  not a code change (accepted false-positive or classification).
- Update `status` to `superseded` and add a new row when an entry no longer
  reflects the current state.
- Cross-reference the originating audit file and the audit section.