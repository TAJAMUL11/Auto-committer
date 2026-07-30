/**
 * Number utility functions for common mathematical operations.
 * Provides helpers for clamping, rounding, random number generation, and range checks.
 */

/**
 * Clamps a number between a minimum and maximum value.
 * @param {number} value - The number to clamp.
 * @param {number} min - The minimum bound.
 * @param {number} max - The maximum bound.
 * @returns {number} The clamped value.
 */
function clamp(value, min, max) {
  if (min > max) throw new RangeError('min must be less than or equal to max');
  return Math.min(Math.max(value, min), max);
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer in [min, max].
 */
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param {number} value - The number to round.
 * @param {number} [decimals=0] - The number of decimal places.
 * @returns {number} The rounded number.
 */
function roundTo(value, decimals = 0) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Checks whether a number falls within a given range (inclusive).
 * @param {number} value - The number to check.
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {boolean} True if value is within [min, max].
 */
function inRange(value, min, max) {
  return value >= min && value <= max;
}

/**
 * Returns the sum of all numbers in an array.
 * @param {number[]} arr - Array of numbers.
 * @returns {number} The sum.
 */
function sum(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  return arr.reduce((acc, n) => acc + n, 0);
}

/**
 * Returns the average (mean) of all numbers in an array.
 * @param {number[]} arr - Array of numbers.
 * @returns {number} The average, or NaN for an empty array.
 */
function average(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (arr.length === 0) return NaN;
  return sum(arr) / arr.length;
}

module.exports = { clamp, randomInt, roundTo, inRange, sum, average };
