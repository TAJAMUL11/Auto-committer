/**
 * Utility functions for URL parsing and query parameter manipulation.
 */

/**
 * Parses a query string into a key-value object.
 * @param {string} queryString - The query string to parse (e.g., "?a=1&b=2").
 * @returns {Record<string, string>} Object containing query parameter key-value pairs.
 */
function parseQueryParams(queryString) {
  if (typeof queryString !== 'string' || !queryString.trim()) return {};
  const query = queryString.trim().replace(/^\?/, '');
  if (!query) return {};

  const params = {};
  const pairs = query.split('&');
  for (const pair of pairs) {
    if (!pair) continue;
    const [key, val] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = val !== undefined ? decodeURIComponent(val) : '';
    }
  }
  return params;
}

/**
 * Builds a query string from an object of key-value pairs.
 * @param {Record<string, any>} obj - Object containing parameters.
 * @returns {string} Formatted query string starting with "?".
 */
function buildQueryString(obj) {
  if (typeof obj !== 'object' || obj === null) return '';
  const parts = [];
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined && val !== null) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`);
    }
  }
  return parts.length > 0 ? `?${parts.join('&')}` : '';
}

module.exports = {
  parseQueryParams,
  buildQueryString
};
