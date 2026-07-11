# Component Inventory — UI Enterprise Redesign

This document tracks all components extracted during the UI enterprise redesign decomposition phase (PR 2A + PR 2B).

## Status Legend

- ✅ **Done** — Decomposed and verified
- 🔄 **Migrating** — In progress
- ⏳ **Current** — Not yet decomposed
- 🎨 **Restyled** — Visual redesign applied (PR 4-6)

## File Size Contract

All page components must be ≤200 lines after decomposition. Extracted sub-components must also be ≤200 lines.

---

## PR 2A — Decomposition 1/2

### Home.jsx (494 → 22 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/Home.jsx` | 22 | ✅ Done | Thin orchestrator |
| `src/pages/home/HomeHero.jsx` | ~80 | ✅ Done | Hero section with CTA |
| `src/pages/home/HomeStats.jsx` | ~40 | ✅ Done | Stats cards |
| `src/pages/home/HomeActions.jsx` | ~60 | ✅ Done | Quick action buttons |
| `src/pages/home/HomeRecent.jsx` | ~100 | ✅ Done | Recent transactions list |

### CancelTransactions.jsx (407 → 97 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/dashboard/CancelTransactions.jsx` | 97 | ✅ Done | Thin orchestrator |
| `src/pages/dashboard/cancel/CancelHeader.jsx` | ~40 | ✅ Done | Breadcrumb + title |
| `src/pages/dashboard/cancel/CancelFilters.jsx` | ~80 | ✅ Done | Search + date filters |
| `src/pages/dashboard/cancel/CancelList.jsx` | ~150 | ✅ Done | Transaction list + pagination |
| `src/pages/dashboard/cancel/CancelDetail.jsx` | ~120 | ✅ Done | Detail modal content |
| `src/pages/dashboard/cancel/hooks/useCancelTransactions.js` | ~180 | ✅ Done | State + handlers |

### Register.jsx (351 → 58 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/Register.jsx` | 58 | ✅ Done | Thin orchestrator |
| `src/pages/register/RegisterHeader.jsx` | ~30 | ✅ Done | Logo + title |
| `src/pages/register/RegisterForm.jsx` | ~40 | ✅ Done | Form wrapper |
| `src/pages/register/RegisterPersonalFields.jsx` | ~100 | ✅ Done | RUT, name, email fields |
| `src/pages/register/RegisterAccountFields.jsx` | ~120 | ✅ Done | Password, entity fields |
| `src/pages/register/RegisterTermsAndSubmit.jsx` | ~80 | ✅ Done | Terms checkbox + submit |
| `src/pages/register/hooks/useRegister.js` | 112 | ✅ Done | RHF + entities + registration |

### Sales.jsx (335 → 73 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/dashboard/Sales.jsx` | 73 | ✅ Done | Thin orchestrator |
| `src/pages/dashboard/sales/SalesHeader.jsx` | ~30 | ✅ Done | Breadcrumb + title |
| `src/pages/dashboard/sales/SalesList.jsx` | ~80 | ✅ Done | Items table |
| `src/pages/dashboard/sales/SalesCart.jsx` | ~100 | ✅ Done | Cart summary |
| `src/pages/dashboard/sales/SalesFormSection.jsx` | ~100 | ✅ Done | Form section wrapper |
| `src/pages/dashboard/sales/hooks/useSales.js` | 143 | ✅ Done | RHF + items + submission |
| `src/pages/dashboard/sales/hooks/useSalesCatalogs.js` | ~60 | ✅ Done | Payment methods, previsions, professionals |

---

## PR 2B — Decomposition 2/2

### CloseRegister.jsx (331 → 131 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/dashboard/CloseRegister.jsx` | 131 | ✅ Done | Thin orchestrator |
| `src/pages/dashboard/close/CloseHeader.jsx` | 42 | ✅ Done | Breadcrumb + title |
| `src/pages/dashboard/close/hooks/useCloseRegister.js` | 199 | ✅ Done | State + reconciliation + approval |

**Existing sub-components preserved:**
- `src/components/CloseRegister/ReconciliationSummaryCard.jsx`
- `src/components/CloseRegister/AmountInputCard.jsx`
- `src/components/CloseRegister/ApprovalModal.jsx`

### Login.jsx (256 → 24 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/Login.jsx` | 24 | ✅ Done | Thin orchestrator |
| `src/pages/login/LoginHero.jsx` | 20 | ✅ Done | Logo + app title |
| `src/pages/login/LoginForm.jsx` | 179 | ✅ Done | Email, password, entity, submit |
| `src/pages/login/hooks/useLogin.js` | 89 | ✅ Done | RHF + entities + authentication |

### Reports.jsx (256 → 131 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/dashboard/Reports.jsx` | 131 | ✅ Done | Thin orchestrator with 4 tabs |
| `src/pages/dashboard/reports/hooks/useReports.js` | 124 | ✅ Done | State + 4 report handlers |

**Existing sub-components preserved:**
- `src/components/Reports/ReportFilters.jsx`
- `src/components/Reports/ReportViewer.jsx`

### SalesFormFields.jsx (202 → 45 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/components/Sales/SalesFormFields.jsx` | 45 | ✅ Done | Thin orchestrator |
| `src/components/Sales/fields/CustomerFields.jsx` | 163 | ✅ Done | RUT, name, date, payment method |
| `src/components/Sales/fields/ProductFields.jsx` | 37 | ✅ Done | Folio (conditional) |

---

## Summary

### Decomposition Stats

| Metric | PR 2A | PR 2B | Total |
|--------|-------|-------|-------|
| Pages decomposed | 4 | 4 | 8 |
| New files created | 18 | 9 | 27 |
| Total new lines | ~1,200 | ~800 | ~2,000 |
| Max page size (before) | 494 | 331 | 494 |
| Max page size (after) | 97 | 131 | 131 |
| All files ≤200 lines | ✅ Yes | ✅ Yes | ✅ Yes |

### Next Steps

- **PR 3**: Form unification (OpenRegister + CloseRegister → RHF+Zod)
- **PR 4**: Auth pages visual redesign (Login, Register)
- **PR 5**: Sales pages visual redesign
- **PR 6**: Reports & admin visual redesign
- **PR 7**: Cross-cutting polish (skeletons, error boundaries, empty states, a11y)

### Verification Commands

```bash
# All pages ≤200 lines
find src -name "*.jsx" -exec wc -l {} + | awk '$1 > 200'

# Lint pass
pnpm lint --max-warnings 0

# Build pass
pnpm build
```

---

**Last updated**: PR 2B complete (2026-07-10)
**Maintainer**: Update this document after each PR to track component status.
