/**
 * Utility functions for safe file system operations.
 */
const fs = require('fs');
const path = require('path');

/**
 * Ensures that a directory exists, creating it recursively if needed.
 * @param {string} dirPath - Directory path.
 */
function ensureDirSync(dirPath) {
  if (typeof dirPath !== 'string' || !dirPath) return;
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Safely reads a UTF-8 text file, returning fallback value on failure.
 * @param {string} filePath - Path to file.
 * @param {string} [fallback=''] - Default content on error.
 * @returns {string}
 */
function readFileSafe(filePath, fallback = '') {
  if (typeof filePath !== 'string' || !filePath) return fallback;
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return fallback;
  }
}

/**
 * Safely writes content to a file, ensuring parent directory exists.
 * @param {string} filePath - Path to file.
 * @param {string} content - File content.
 * @returns {boolean} True if write succeeded, false otherwise.
 */
function writeFileSafe(filePath, content) {
  if (typeof filePath !== 'string' || !filePath) return false;
  try {
    ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Checks whether a path exists and points to a regular file.
 * @param {string} filePath - Path to check.
 * @returns {boolean}
 */
function isFile(filePath) {
  if (typeof filePath !== 'string' || !filePath) return false;
  try {
    return fs.statSync(filePath).isFile();
  } catch (e) {
    return false;
  }
}

module.exports = {
  ensureDirSync,
  readFileSafe,
  writeFileSafe,
  isFile
};
