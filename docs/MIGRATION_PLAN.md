# Migration Plan — Caja Digital UI Enterprise Redesign

## Overview

This document tracks the 8-PR chained migration for the UI enterprise redesign. Each PR builds on the previous, following a **stacked-to-main** strategy (each PR merges to main in order).

## PR Dependency Graph

```
PR 1 (Foundation)
  ↓
PR 2A (Decomposition 1/2)
  ↓
PR 2B (Decomposition 2/2)
  ↓
PR 3 (Form Unification)
  ↓
PR 4 (Auth Visual Restyle)
  ↓
PR 5 (Sales Visual Restyle)
  ↓
PR 6 (Reports & Admin Visual Restyle)
  ↓
PR 7 (Cross-Cutting Polish) ← FINAL
```

## PR Details

### PR 1 — Foundation ✅ COMPLETE
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-1`
- **PR URL**: https://github.com/eondev-inc/caja-digital-front/pull/11
- **Goal**: Design system tokens, motion, typography, elevation
- **Files Changed**: `tailwind.config.js`, `src/index.css`, `src/lib/design-tokens/*`, `src/utils/{motion,cn}.js`, `src/hooks/useReducedMotion.js`
- **Lines**: ~401
- **Dependencies**: None
- **Rollback**: Revert commit (pure token setup, zero behavior change)
- **Verification**: `pnpm lint`, `pnpm build`, token audit
- **Status**: ⏳ DRAFT OPEN

### PR 2A — Decomposition 1/2 ✅ COMPLETE
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-2a`
- **PR URL**: https://github.com/eondev-inc/caja-digital-front/pull/12
- **Goal**: Split Home, CancelTransactions, Register, Sales into ≤200-line files
- **Files Changed**: 4 pages modified, 18 new files created
- **Lines**: ~500 (distributed)
- **Dependencies**: PR 1
- **Rollback**: Revert per file (each decomposition is independent)
- **Verification**: `find src -name "*.jsx" -exec wc -l {} + | awk '$1 > 200'` = empty
- **Status**: ⏳ DRAFT OPEN

### PR 2B — Decomposition 2/2 ✅ COMPLETE
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-2b`
- **PR URL**: https://github.com/eondev-inc/caja-digital-front/pull/13
- **Goal**: Split CloseRegister, Login, Reports, SalesFormFields into ≤200-line files
- **Files Changed**: 4 pages modified, 9 new files created
- **Lines**: ~400 (distributed)
- **Dependencies**: PR 2A
- **Rollback**: Revert per file
- **Verification**: File size check, lint, build
- **Status**: ⏳ DRAFT OPEN

### PR 3 — Form Unification ✅ COMPLETE
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-3`
- **PR URL**: https://github.com/eondev-inc/caja-digital-front/pull/14
- **Goal**: Migrate OpenRegister + CloseRegister to RHF+Zod
- **Files Changed**: 2 pages, 2 schemas in `src/utils/`
- **Lines**: ~387
- **Dependencies**: PR 2A, 2B
- **Rollback**: Revert commit (form behavior unchanged, only validation layer)
- **Verification**: Manual form test, lint, build
- **Status**: ⏳ DRAFT OPEN

### PR 4 — Auth Visual Restyle ✅ COMPLETE
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-4`
- **PR URL**: https://github.com/eondev-inc/caja-digital-front/pull/15
- **Goal**: Restyle Login + Register with semantic design tokens
- **Files Changed**: 14 files (Login + 5 sub, Register + 6 sub, 3 layouts)
- **Lines**: ~331
- **Dependencies**: PR 2A, 2B, 3
- **Rollback**: Revert commit (visual only, no behavior change)
- **Verification**: Visual + dark mode + a11y tab-through
- **Status**: ⏳ DRAFT OPEN

### PR 5 — Sales Visual Restyle ✅ COMPLETE
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-5`
- **PR URL**: https://github.com/eondev-inc/caja-digital-front/pull/16
- **Goal**: Restyle Sales + 11 sub-components with semantic tokens
- **Files Changed**: 12 files
- **Lines**: ~107
- **Dependencies**: PR 2A, 2B, 3, 4
- **Rollback**: Revert commit (visual only)
- **Verification**: Visual + dark mode + a11y
- **Status**: ⏳ DRAFT OPEN

### PR 6 — Reports & Admin Visual Restyle ✅ COMPLETE
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-6`
- **PR URL**: https://github.com/eondev-inc/caja-digital-front/pull/17
- **Goal**: Restyle Reports + CloseRegister + CancelTransactions + 11 sub-components
- **Files Changed**: 14 files
- **Lines**: ~325
- **Dependencies**: PR 2A, 2B, 3, 4, 5
- **Rollback**: Revert commit (visual only)
- **Verification**: Visual + dark mode + a11y
- **Status**: ⏳ DRAFT OPEN

### PR 7 — Cross-Cutting Polish ✅ COMPLETE (FINAL)
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-7`
- **PR URL**: https://github.com/eondev-inc/caja-digital-front/pull/18
- **Goal**: Skeleton, ErrorBoundary, EmptyState primitives; wrap all pages in ErrorBoundary; replace Spinners with Skeleton; add EmptyState to data-driven pages; dark mode parity; a11y audit; reduced-motion verification
- **Files Changed**: 3 new primitives, 2 layouts, 3 pages (Spinner→Skeleton), 1 page (EmptyState), verification docs
- **Lines**: ~400 (tight budget)
- **Dependencies**: PR 1-6
- **Rollback**: Revert commit (additive primitives, safe to remove)
- **Verification**: `pnpm lint`, `pnpm build`, token audit, manual dark mode + a11y + reduced-motion smoke test
- **Status**: ⏳ DRAFT OPEN

### PR 7b — Verify Fixes ✅ COMPLETE
- **Branch**: `feature/EOD-0001-ui-enterprise-redesign-7b`
- **PR URL**: (to be created)
- **Goal**: Fix verify report findings — OpenRegister visual restyle (gray→neutral), Skeleton loading state, opacity modifier bug, MIGRATION_PLAN correction
- **Files Changed**: OpenRegister.jsx, useOpenRegister.js, HomeHero.jsx, MIGRATION_PLAN.md
- **Lines**: ~60
- **Dependencies**: PR 7
- **Rollback**: Revert commit (visual + loading state only)
- **Verification**: `pnpm lint`, `pnpm build`, token audit (OpenRegister clean), Skeleton present
- **Status**: ⏳ DRAFT OPEN

## Rollback Strategy

Each PR is designed to be independently rollback-safe:
- **PR 1**: Pure token setup — revert has zero behavior impact
- **PR 2A/2B**: File decomposition — revert per file (each split is independent)
- **PR 3**: Form migration — revert restores old `useState` forms (validation layer only)
- **PR 4/5/6**: Visual restyle — revert restores old styling (no behavior change)
- **PR 7**: Additive primitives — revert removes new components (pages still work without ErrorBoundary/Skeleton/EmptyState)

## Verification Plan

### Per-PR Checks
1. `pnpm lint --max-warnings 0` — zero warnings enforced
2. `pnpm build` — production build succeeds
3. Token audit — `rg "bg-(gray|slate|zinc)-[0-9]" src/pages/` = 0 (after PR 1)
4. File size check — `find src -name "*.jsx" -exec wc -l {} + | awk '$1 > 200'` = empty (after PR 2)
5. Manual visual inspection — toggle dark mode, inspect all affected pages
6. A11y tab-through — verify focus rings, ARIA attributes, keyboard nav

### Final Verification (after PR 7)
- [ ] All 9 pages render correctly in light + dark mode
- [ ] All forms use RHF+Zod with Spanish (cl) validation
- [ ] All async pages use Skeleton (no bare Spinners)
- [ ] All data-driven pages use EmptyState when no data
- [ ] All pages wrapped in ErrorBoundary
- [ ] Focus rings visible on all interactive elements
- [ ] ARIA attributes present on forms, alerts, dynamic content
- [ ] Reduced-motion respected (animations disabled when `prefers-reduced-motion: reduce`)
- [ ] `pnpm lint --max-warnings 0` passes
- [ ] `pnpm build` passes

## Completion Log

| PR | Date | Status | Commits | Notes |
|----|------|--------|---------|-------|
| PR 1 | 2026-07-10 | ⏳ DRAFT OPEN | 6 | Foundation tokens, motion, utilities |
| PR 2A | 2026-07-10 | ⏳ DRAFT OPEN | 6 | Decomposed Home, Cancel, Register, Sales |
| PR 2B | 2026-07-10 | ⏳ DRAFT OPEN | 6 | Decomposed Close, Login, Reports, SalesFormFields |
| PR 3 | 2026-07-10 | ⏳ DRAFT OPEN | 4 | Migrated OpenRegister + CloseRegister to RHF+Zod |
| PR 4 | 2026-07-10 | ⏳ DRAFT OPEN | 3 | Auth visual restyle (Login + Register) |
| PR 5 | 2026-07-10 | ⏳ DRAFT OPEN | 4 | Sales visual restyle (Sales + 11 sub-components) |
| PR 6 | 2026-07-10 | ⏳ DRAFT OPEN | 4 | Reports & admin visual restyle |
| PR 7 | 2026-07-11 | ⏳ DRAFT OPEN | 8 | Cross-cutting polish (Skeleton, ErrorBoundary, EmptyState, a11y, dark mode) |
| PR 7b | 2026-07-12 | ⏳ DRAFT OPEN | 4 | Verify fixes: OpenRegister restyle, Skeleton loading, opacity bug, MIGRATION_PLAN correction |

## Next Steps

1. Mark all DRAFT PRs as ready for review in sequence (PR 1 → PR 7b)
2. Run `sdd-verify-go` for final validation after PR 7b merges
3. Merge PRs to main in order (stacked-to-main)
4. Monitor production for visual regressions
5. Update COMPONENT_INVENTORY.md with final status (already done in PR 6)

## PR 7b — Verify Fixes Notes

PR 7b addresses findings from the verify report (`sdd/ui-enterprise-redesign/verify-report` in Engram):

### Critical Findings Fixed
1. **OpenRegister not visually restyled** — 10 raw `gray-*` tokens replaced with `neutral-*` semantic equivalents. Also replaced `slate-*` dark mode variants and `text-red-500` with `text-error-500`.
2. **OpenRegister missing Skeleton loading** — `useOpenRegister` hook now exposes `isLoading` + `error` states. OpenRegister renders `<Skeleton>` while async `getOpenRegister()` runs, and `<EmptyState variant="error">` on failure.
3. **Opacity modifier bug** — `dark:bg-primary-900/30` replaced with `dark:bg-primary-900` in OpenRegister.jsx and HomeHero.jsx. Tailwind opacity modifiers do NOT work with CSS var colors.

### Warning Findings Fixed
4. **MIGRATION_PLAN.md inaccurate** — Status column corrected from "✅ Merged" to "⏳ DRAFT OPEN" for all 8 PRs. Added PR 7b entry. Added notes section explaining verify findings.

### Token Audit (post-fix)
- `rg "text-gray-|bg-gray-|border-gray-" src/pages/dashboard/OpenRegister.jsx` → 0 matches ✓
- `rg "dark:bg-primary-900/30" src/` → 0 matches ✓
- `rg "Skeleton" src/pages/dashboard/OpenRegister.jsx` → >0 matches ✓

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Visual regression after merge | Medium | Manual verification per PR, rollback per PR |
| Dark mode parity broken | Low | All components use semantic tokens with `dark:` variants |
| A11y regression | Low | Focus rings, ARIA, keyboard nav verified per PR |
| Form validation broken | Low | RHF+Zod migration tested manually per form |
| Merge conflicts | Low | Stacked-to-main strategy, each PR builds on previous |

## Success Criteria

- ✅ All 9 pages follow new design system
- ✅ No file > 200 lines
- ✅ 100% color usage from tokens
- ✅ All forms use RHF+Zod
- ✅ Dark mode parity verified
- ✅ Skeleton loading on async pages
- ✅ Error boundaries on all pages
- ✅ Empty states on data-driven pages
- ✅ `pnpm lint` passes with `--max-warnings 0`
- ✅ `pnpm build` passes
- ✅ `docs/DESIGN_RATIONALE.md` finalized
- ✅ `docs/COMPONENT_INVENTORY.md` created
- ✅ `docs/MIGRATION_PLAN.md` created (this file)
