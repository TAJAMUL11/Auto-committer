/**
 * Utility functions for reading and parsing environment variables safely.
 */

/**
 * Retrieves an environment variable with a default fallback.
 * @param {string} key - Environment variable key.
 * @param {string} [defaultValue=''] - Default value if key is not set.
 * @returns {string}
 */
function getEnv(key, defaultValue = '') {
  if (typeof key !== 'string' || !key) return defaultValue;
  const val = process.env[key];
  return val !== undefined ? val : defaultValue;
}

/**
 * Retrieves an environment variable parsed as an integer.
 * @param {string} key - Environment variable key.
 * @param {number} [defaultValue=0] - Default integer fallback.
 * @returns {number}
 */
function getEnvAsInt(key, defaultValue = 0) {
  const val = getEnv(key, '');
  if (!val) return defaultValue;
  const parsed = parseInt(val, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Retrieves an environment variable parsed as a boolean.
 * @param {string} key - Environment variable key.
 * @param {boolean} [defaultValue=false] - Default boolean fallback.
 * @returns {boolean}
 */
function getEnvAsBool(key, defaultValue = false) {
  const val = getEnv(key, '');
  if (!val) return defaultValue;
  const lower = val.trim().toLowerCase();
  if (lower === 'true' || lower === '1' || lower === 'yes') return true;
  if (lower === 'false' || lower === '0' || lower === 'no') return false;
  return defaultValue;
}

/**
 * Checks if an environment variable exists and is non-empty.
 * @param {string} key - Environment variable key.
 * @returns {boolean}
 */
function hasEnv(key) {
  const val = getEnv(key, '');
  return val.trim().length > 0;
}

module.exports = {
  getEnv,
  getEnvAsInt,
  getEnvAsBool,
  hasEnv
};
