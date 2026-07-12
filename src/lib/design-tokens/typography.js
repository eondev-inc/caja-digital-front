/**
 * Typography tokens — Vercel-inspired type scale.
 * Font families: Figtree (headings) + Noto Sans (body).
 */

export const fontFamily = {
  heading:
    "Figtree, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  body: "Noto Sans, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

export const fontSize = {
  display: { size: '3.75rem', lineHeight: '1.2', letterSpacing: '-0.02em' },
  h1: { size: '3rem', lineHeight: '1.2', letterSpacing: '-0.02em' },
  h2: { size: '2.25rem', lineHeight: '1.25', letterSpacing: '-0.02em' },
  h3: { size: '1.875rem', lineHeight: '1.25', letterSpacing: '-0.01em' },
  h4: { size: '1.5rem', lineHeight: '1.35', letterSpacing: '-0.01em' },
  h5: { size: '1.25rem', lineHeight: '1.35', letterSpacing: '0' },
  h6: { size: '1rem', lineHeight: '1.5', letterSpacing: '0' },
  bodyLg: { size: '1.125rem', lineHeight: '1.65', letterSpacing: '0' },
  body: { size: '1rem', lineHeight: '1.5', letterSpacing: '0' },
  bodySm: { size: '0.875rem', lineHeight: '1.5', letterSpacing: '0' },
  bodyXs: { size: '0.75rem', lineHeight: '1.5', letterSpacing: '0.025em' },
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};
