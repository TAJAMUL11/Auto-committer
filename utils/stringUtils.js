/**
 * Utility functions for string manipulation and validation.
 */

function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncate(str, maxLength, suffix = '...') {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

function isEmpty(str) {
  return typeof str !== 'string' || str.trim().length === 0;
}

module.exports = {
  capitalize,
  truncate,
  isEmpty
};
