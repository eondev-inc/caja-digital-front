/**
 * Motion tokens — duration and easing values.
 * Mirror the CSS variables in src/index.css.
 */

export const duration = {
  instant: '0ms',
  fast: '150ms',
  base: '250ms',
  slow: '400ms',
};

export const easing = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
};
