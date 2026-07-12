/**
 * Motion utilities — pre-composed Tailwind transition classes
 * using the design token durations and easings.
 */

import { duration } from '../lib/design-tokens/motion.js';

/** Transition for color/background changes (hover, focus) */
export const transitionColors = [
  `transition-colors`,
  `duration-[${duration.base}]`,
  `ease-standard`,
].join(' ');

/** Transition for all properties (expand/collapse, fade) */
export const transitionAll = [
  `transition-all`,
  `duration-[${duration.base}]`,
  `ease-standard`,
].join(' ');

/** Transition for transform only (scale, translate) */
export const transitionTransform = [
  `transition-transform`,
  `duration-[${duration.fast}]`,
  `ease-decelerate`,
].join(' ');

/**
 * Compose a custom transition string.
 * @param {string} property - Tailwind transition property class
 * @param {string} dur - Duration key from tokens (instant/fast/base/slow)
 * @param {string} ease - Easing key from tokens (standard/decelerate/accelerate)
 */
export function transition(property = 'all', dur = 'base', ease = 'standard') {
  return [
    `transition-${property}`,
    `duration-[${duration[dur]}]`,
    `ease-${ease}`,
  ].join(' ');
}
