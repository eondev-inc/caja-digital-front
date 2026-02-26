/**
 * Shared formatting utilities for currency and dates.
 * All values are formatted for the Chilean locale (es-CL).
 */

/**
 * Formats a numeric amount as Chilean Pesos (CLP).
 * @param {number} amount - The amount to format.
 * @returns {string} Formatted currency string, e.g. "$1.000".
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(amount);
};

/**
 * Formats an ISO date string as a localised Chilean date-time.
 * @param {string} dateString - ISO 8601 date string.
 * @returns {string} Formatted date string, e.g. "01/02/2025 10:30".
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
