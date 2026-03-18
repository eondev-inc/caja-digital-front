/**
 * Strips all non-alphanumeric characters from a RUT string,
 * and converts 'k'/'K' to uppercase 'K'.
 * @param {string} value
 * @returns {string} clean RUT digits + optional K (e.g. "123456789" or "12345678K")
 */
export const cleanRut = (value) =>
  value.replace(/[^0-9kK]/g, '').toUpperCase();

/**
 * Formats a clean RUT string into the Chilean format: XX.XXX.XXX-D
 * Accepts partial input (while the user is typing).
 * @param {string} value - raw input, may contain dots/dashes already
 * @returns {string} formatted RUT, e.g. "12.345.678-9"
 */
export const formatRut = (value) => {
  const clean = cleanRut(value);
  if (!clean) return '';

  const dv = clean.slice(-1);
  const body = clean.slice(0, -1);

  if (!body) return dv;

  // Add thousands separators to the body
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formatted}-${dv}`;
};

/**
 * Validates a Chilean RUT using the official modulo-11 algorithm.
 * Accepts formatted (12.345.678-9) or unformatted (123456789) input.
 * @param {string} value
 * @returns {boolean}
 */
export const validateRut = (value) => {
  const clean = cleanRut(value);
  if (clean.length < 2) return false;

  const dv = clean.slice(-1);
  const body = clean.slice(0, -1);

  if (!/^\d+$/.test(body)) return false;

  // Modulo-11 algorithm
  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  let expectedDv;
  if (remainder === 11) expectedDv = '0';
  else if (remainder === 10) expectedDv = 'K';
  else expectedDv = String(remainder);

  return dv === expectedDv;
};
