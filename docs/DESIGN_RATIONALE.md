# Design Rationale — Caja Digital UI Redesign

## Why This Style

Vercel-inspired: type-driven, minimal, technical, dark-friendly. The design prioritizes clarity and professionalism appropriate for a healthcare cashier system. No decorative elements — every pixel serves a function.

## Principles

1. **Accessibility-first** — WCAG AA contrast minimum. Focus rings on all interactive elements. Keyboard navigation works end-to-end. Skip-to-content link present.
2. **Dark mode parity** — Every component renders correctly in both light and dark modes. CSS variable inversion handles the swap; no separate dark-only styles.
3. **Motion respects user preferences** — All transitions honor `prefers-reduced-motion: reduce`. The `useReducedMotion` hook provides JS-side detection. No animation library (zero bundle cost).
4. **Semantic tokens over raw colors** — Page code uses `bg-primary-500`, `text-secondary-700`, never `bg-emerald-500` or `bg-teal-600`. Aliases (blue→teal, gray→slate, neutral→slate) exist only for Flowbite internal compatibility.
5. **No file exceeds 200 lines** — Oversized components decompose into section components + hooks before visual changes land.

## References

- **Vercel** — Type scale, spacing rhythm, minimal chrome, dark mode execution
- **Stripe** — Form patterns, data density, professional tone
- **Linear** — Motion philosophy (fast, purposeful, respects user prefs), issue list patterns

## Anti-Patterns

- Soft pastels — too gentle for a professional cashier system
- Playful illustrations — distracts from data-heavy workflows
- Decorative gradients — adds visual noise without information value
- Rounded-everything — excessive border-radius reduces perceived precision
- Heavy shadows — only used purposefully (elevation scale: xs→2xl)

## Token System Overview

| Domain | Location | Key Tokens |
|--------|----------|------------|
| Color | `src/lib/design-tokens/colors.js` | primary (Emerald), secondary (Teal), success/warning/error/info, slate neutrals |
| Typography | `src/lib/design-tokens/typography.js` | Figtree (headings) + Noto Sans (body), display→bodyXs scale |
| Spacing | `src/lib/design-tokens/spacing.js` | 4px base grid, container widths (sm→2xl), page padding |
| Motion | `src/lib/design-tokens/motion.js` | duration (instant/fast/base/slow), easing (standard/decelerate/accelerate) |
| Elevation | `src/lib/design-tokens/elevation.js` | shadow scale (xs→2xl), CSS vars in `src/index.css` |

All tokens are defined as CSS variables in `src/index.css` (with dark mode overrides) and mirrored as JS exports in `src/lib/design-tokens/` for programmatic access.

## Acceptance Criteria

See the delta spec for full acceptance criteria:
- All 9 pages follow the new design system
- No file > 200 lines
- 100% color usage from tokens (no raw gray/slate/blue bypassing)
- All forms use RHF+Zod
- Dark mode parity verified
- Skeleton loading on all async pages
- Reduced motion respected
- WCAG AA focus styles on all interactive elements
