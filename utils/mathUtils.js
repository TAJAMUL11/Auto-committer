/**
 * Utility functions for advanced mathematical and statistical operations.
 */

/**
 * Calculates the factorial of a non-negative integer.
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('Expected a non-negative integer');
  }
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculates the Greatest Common Divisor (GCD) of two integers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calculates the Least Common Multiple (LCM) of two integers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculates the median of an array of numbers.
 * @param {number[]} numbers
 * @returns {number}
 */
function median(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new TypeError('Expected a non-empty array of numbers');
  }
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

module.exports = {
  factorial,
  gcd,
  lcm,
  median
};
