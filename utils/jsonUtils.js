/**
 * Utility functions for safe JSON parsing, stringifying, and validation.
 */

function safeParse(str, fallback = null) {
  if (typeof str !== 'string') return fallback;
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}

function safeStringify(val, space = 0, fallback = '') {
  try {
    return JSON.stringify(val, null, space);
  } catch (e) {
    return fallback;
  }
}

function isValidJson(str) {
  if (typeof str !== 'string' || str.trim().length === 0) return false;
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  safeParse,
  safeStringify,
  isValidJson
};
