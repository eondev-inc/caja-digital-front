/**
 * Check if JWT is expired or invalid.
 * @param {string} token
 * @returns {boolean} true if missing, malformed or exp <= now
 */
export function isTokenExpired(token) {
  if (!token || typeof token !== 'string') return true;
  const parts = token.split('.');
  if (parts.length !== 3) return true;
  try {
    const payload = parts[1];
    // base64url -> base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    const data = JSON.parse(json);
    if (!data.exp || typeof data.exp !== 'number') return true;
    const now = Math.floor(Date.now() / 1000);
    return data.exp <= now;
  } catch {
    return true;
  }
}
