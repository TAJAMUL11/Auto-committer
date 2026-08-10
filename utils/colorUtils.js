/**
 * Utility functions for ANSI color formatting and string styling in terminal outputs.
 */

const ANSI_REGEX = /\u001b\[\d+m/g;

/**
 * Wraps string in red ANSI color code.
 * @param {string} str
 * @returns {string}
 */
function red(str) {
  if (typeof str !== 'string') return '';
  return `\x1b[31m${str}\x1b[0m`;
}

/**
 * Wraps string in green ANSI color code.
 * @param {string} str
 * @returns {string}
 */
function green(str) {
  if (typeof str !== 'string') return '';
  return `\x1b[32m${str}\x1b[0m`;
}

/**
 * Wraps string in yellow ANSI color code.
 * @param {string} str
 * @returns {string}
 */
function yellow(str) {
  if (typeof str !== 'string') return '';
  return `\x1b[33m${str}\x1b[0m`;
}

/**
 * Wraps string in blue ANSI color code.
 * @param {string} str
 * @returns {string}
 */
function blue(str) {
  if (typeof str !== 'string') return '';
  return `\x1b[34m${str}\x1b[0m`;
}

/**
 * Wraps string in bold ANSI code.
 * @param {string} str
 * @returns {string}
 */
function bold(str) {
  if (typeof str !== 'string') return '';
  return `\x1b[1m${str}\x1b[0m`;
}

/**
 * Strips all ANSI escape codes from a string.
 * @param {string} str
 * @returns {string}
 */
function stripAnsi(str) {
  if (typeof str !== 'string') return '';
  return str.replace(ANSI_REGEX, '');
}

module.exports = {
  red,
  green,
  yellow,
  blue,
  bold,
  stripAnsi
};
