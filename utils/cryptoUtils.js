/**
 * Utility functions for basic cryptographic and hashing operations using Node.js native crypto.
 */
const crypto = require('crypto');

/**
 * Generates SHA-256 hash of a string.
 * @param {string} data
 * @returns {string} Hex encoded hash
 */
function sha256(data) {
  if (typeof data !== 'string') return '';
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Generates MD5 hash of a string.
 * @param {string} data
 * @returns {string} Hex encoded hash
 */
function md5(data) {
  if (typeof data !== 'string') return '';
  return crypto.createHash('md5').update(data).digest('hex');
}

/**
 * Generates a random hexadecimal string of specified byte length.
 * @param {number} [bytes=16] Number of random bytes
 * @returns {string}
 */
function randomHex(bytes = 16) {
  if (typeof bytes !== 'number' || bytes <= 0) bytes = 16;
  return crypto.randomBytes(bytes).toString('hex');
}

module.exports = {
  sha256,
  md5,
  randomHex
};
