/**
 * Utility functions for file path manipulation and normalization.
 */
const path = require('path');

/**
 * Normalizes a path string to use standard forward slashes.
 * @param {string} filePath - Path to normalize.
 * @returns {string} Normalized path string with forward slashes.
 */
function normalizeSlashes(filePath) {
  if (typeof filePath !== 'string') return '';
  return filePath.replace(/\\+/g, '/');
}

/**
 * Extracts the file extension from a path string.
 * @param {string} filePath - Path to extract extension from.
 * @returns {string} Lowercase file extension including leading dot (e.g., '.js'), or empty string.
 */
function getFileExtension(filePath) {
  if (typeof filePath !== 'string') return '';
  return path.extname(filePath).toLowerCase();
}

/**
 * Extracts the base filename without its extension.
 * @param {string} filePath - Path string.
 * @returns {string} Filename without extension.
 */
function getFileNameWithoutExtension(filePath) {
  if (typeof filePath !== 'string') return '';
  const ext = path.extname(filePath);
  return path.basename(filePath, ext);
}

/**
 * Checks whether a given path is an absolute path.
 * @param {string} filePath - Path to check.
 * @returns {boolean} True if path is absolute.
 */
function isAbsolutePath(filePath) {
  if (typeof filePath !== 'string' || !filePath.trim()) return false;
  return path.isAbsolute(filePath);
}

module.exports = {
  normalizeSlashes,
  getFileExtension,
  getFileNameWithoutExtension,
  isAbsolutePath
};
