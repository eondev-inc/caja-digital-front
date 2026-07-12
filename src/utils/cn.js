/**
 * className concatenation utility.
 * Simple join — no external dependencies.
 * Filters out falsy values (undefined, null, false, '').
 */

/**
 * Concatenate class names, filtering falsy values.
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
