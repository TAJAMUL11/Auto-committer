/**
 * Utility functions for common data validation.
 */

/**
 * Validates whether a string is a basic formatted email address.
 * @param {string} email - The email string to validate.
 * @returns {boolean}
 */
function isEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates whether a string is a valid HTTP or HTTPS URL.
 * @param {string} urlStr - The URL string to validate.
 * @returns {boolean}
 */
function isUrl(urlStr) {
  if (typeof urlStr !== 'string') return false;
  try {
    const parsed = new URL(urlStr);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

/**
 * Checks whether a value is numeric (number or valid numeric string).
 * @param {any} val - The value to check.
 * @returns {boolean}
 */
function isNumeric(val) {
  if (typeof val === 'number') return !isNaN(val) && isFinite(val);
  if (typeof val !== 'string') return false;
  return val.trim() !== '' && !isNaN(Number(val));
}

module.exports = {
  isEmail,
  isUrl,
  isNumeric
};
