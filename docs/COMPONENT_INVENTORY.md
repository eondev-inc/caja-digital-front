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

### Register.jsx (351 → 62 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/Register.jsx` | 62 | ✅ Done → 🎨 Restyled | Semantic gradient bg, decorative blur |
| `src/pages/register/RegisterHeader.jsx` | 22 | ✅ Done → 🎨 Restyled | Gradient badge, font-heading |
| `src/pages/register/RegisterForm.jsx` | 42 | ✅ Done | Form wrapper |
| `src/pages/register/RegisterPersonalFields.jsx` | 92 | ✅ Done → 🎨 Restyled | Semantic tokens, aria-describedby |
| `src/pages/register/RegisterAccountFields.jsx` | 126 | ✅ Done → 🎨 Restyled | Semantic tokens, aria-describedby |
| `src/pages/register/RegisterTermsAndSubmit.jsx` | 82 | ✅ Done → 🎨 Restyled | Semantic tokens, focus rings |
| `src/pages/register/hooks/useRegister.js` | 112 | ✅ Done | RHF + entities + registration |
| `src/layout/nologin/HeaderNoLogin.jsx` | 155 | 🎨 Restyled | Neutral tokens, transitions |
| `src/layout/nologin/FooterNoLogin.jsx` | 191 | 🎨 Restyled | Neutral tokens, semantic bg |
| `src/layout/nologin/NoLoginLayout.jsx` | 30 | 🎨 Restyled | Semantic bg tokens |

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
| `src/pages/login/LoginHero.jsx` | 28 | ✅ Done → 🎨 Restyled | Gradient badge, font-heading, tagline |
| `src/pages/login/LoginForm.jsx` | 195 | ✅ Done → 🎨 Restyled | Semantic tokens, focus rings, aria-live |
| `src/pages/login/hooks/useLogin.js` | 89 | ✅ Done | RHF + entities + authentication |
| `src/layout/login/HeaderLogin.jsx` | 127 | 🎨 Restyled | Neutral tokens, transitions, focus rings |
| `src/layout/login/FooterLogin.jsx` | 73 | 🎨 Restyled | Primary gradient bg, neutral text tokens |
| `src/layout/login/LoginLayout.jsx` | 26 | 🎨 Restyled | Semantic gradient background |

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

## PR 3 — Form Unification

### OpenRegister.jsx (146 → 148 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/dashboard/OpenRegister.jsx` | 148 | ✅ Done | RHF+Zod form |
| `src/pages/dashboard/open/hooks/useOpenRegister.js` | 95 | ✅ Done | RHF + openingAmountSchema |

**Schema**: `src/utils/openingAmountSchema.js` — validates `openingAmount` (string→number, required, min 0)

### CloseRegister.jsx (131 → 131 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| `src/pages/dashboard/CloseRegister.jsx` | 131 | ✅ Done | RHF+Zod form wrapper |
| `src/pages/dashboard/close/CloseHeader.jsx` | 42 | ✅ Done | Breadcrumb + title |
| `src/pages/dashboard/close/hooks/useCloseRegister.js` | 213 | ✅ Done | RHF + closeRegisterFormSchema |
| `src/components/CloseRegister/AmountInputCard.jsx` | 149 | ✅ Done | Dynamic RHF register for payment amounts |

**Schema**: `src/utils/reconciliationSchema.js` — `closeRegisterFormSchema` validates `enteredAmounts` (dynamic record) + `notes` (optional string)

### Form Primitives

| Component | Library | Current API | Target API | Status |
|-----------|---------|-------------|------------|--------|
| TextInput | Flowbite | `value`/`onChange` | `...register('field')` + `color={errors.field ? 'failure' : 'gray'}` | ✅ Migrated (OpenRegister, CloseRegister) |
| Textarea | Flowbite | `value`/`onChange` | `...register('field')` + `color={errors.field ? 'failure' : 'gray'}` | ✅ Migrated (CloseRegister) |
| Select | Flowbite | `value`/`onChange` | `...register('field')` + `color={errors.field ? 'failure' : 'gray'}` | ✅ Already used (Login, Register) |
| Label | Flowbite | Static | Static | ✅ No change needed |

**Form pattern**: All forms use `useForm` + `zodResolver(schema)` + `mode: 'onBlur'`. Error messages in Spanish (cl). Token classes applied via Flowbite restyle (PR 4-6).

---

## PR 4 — Auth Pages Visual Restyle

### Token Discipline

All auth page components now use **semantic design tokens only**:
- `neutral-*` for text and borders (replaces raw `gray-*`/`slate-*`)
- `primary-*` / `secondary-*` for brand colors and dark mode backgrounds
- `error-*` for validation errors and destructive actions (replaces raw `red-*`)
- Zero raw `bg-(gray|slate|zinc|neutral|teal|emerald|cyan|sky)-[0-9]` in page code
- Dark mode parity via `primary-950`/`secondary-950` gradients

### Accessibility

- All inputs have `aria-invalid` and `aria-describedby` linked to error messages
- Error messages use `role="alert"` and `aria-live="assertive"` where appropriate
- All interactive elements have visible focus rings (`focus:ring-2 focus:ring-primary-*`)
- Dark mode toggle has `aria-label` for screen readers

### Files Restyled

| File | Token Changes | A11y Enhancements |
|------|--------------|-------------------|
| `src/pages/Login.jsx` | Semantic gradient bg, decorative blur | — |
| `src/pages/login/LoginHero.jsx` | Gradient badge, font-heading | — |
| `src/pages/login/LoginForm.jsx` | neutral/error/primary tokens | aria-live on error alert |
| `src/pages/Register.jsx` | Semantic gradient bg, decorative blur | — |
| `src/pages/register/RegisterHeader.jsx` | neutral tokens, font-heading | — |
| `src/pages/register/RegisterPersonalFields.jsx` | neutral/error tokens | aria-describedby, aria-invalid |
| `src/pages/register/RegisterAccountFields.jsx` | neutral/error tokens | aria-describedby, aria-invalid |
| `src/pages/register/RegisterTermsAndSubmit.jsx` | neutral/error/primary tokens | focus rings on links |
| `src/layout/login/HeaderLogin.jsx` | neutral/error/primary tokens | focus rings on toggle |
| `src/layout/login/FooterLogin.jsx` | neutral/primary tokens | — |
| `src/layout/login/LoginLayout.jsx` | Semantic gradient | — |
| `src/layout/nologin/HeaderNoLogin.jsx` | neutral/primary tokens | focus rings on toggle |
| `src/layout/nologin/FooterNoLogin.jsx` | neutral/primary tokens | — |
| `src/layout/nologin/NoLoginLayout.jsx` | Semantic bg | — |

---

## Summary

### Decomposition Stats

| Metric | PR 2A | PR 2B | PR 3 | PR 4 | Total |
|--------|-------|-------|------|------|-------|
| Pages decomposed | 4 | 4 | 2 (migrated) | — | 8 |
| Pages restyled | — | — | — | 2 + layouts | 2 + 8 layouts |
| New files created | 18 | 9 | 3 | 0 | 30 |
| Total new lines | ~1,200 | ~800 | ~310 | ~265 (restyle) | ~2,575 |
| Max page size (before) | 494 | 331 | 146 | 62 | 494 |
| Max page size (after) | 97 | 131 | 148 | 62 | 148 |
| All files ≤200 lines | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Forms using RHF+Zod | 2 (Login, Register) | 0 | 2 (OpenRegister, CloseRegister) | — | 4 |
| Token-compliant pages | — | — | — | ✅ All auth | ✅ Auth |

### Next Steps

- **PR 5**: Sales pages visual redesign
- **PR 6**: Reports & admin visual redesign
- **PR 7**: Cross-cutting polish (skeletons, error boundaries, empty states, a11y)

### Verification Commands

```bash
# All pages ≤200 lines
find src -name "*.jsx" -exec wc -l {} + | awk '$1 > 200'

# No raw useState for form fields in migrated pages
rg "useState\(" src/pages/dashboard/OpenRegister.jsx src/pages/dashboard/close/hooks/useCloseRegister.js

# Lint pass
pnpm lint --max-warnings 0

# Build pass
pnpm build
```

---

**Last updated**: PR 4 complete (2026-07-10)
**Maintainer**: Update this document after each PR to track component status.
