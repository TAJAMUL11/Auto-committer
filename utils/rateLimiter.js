/**
 * Utility functions for function rate limiting, debouncing, and throttling.
 */

/**
 * Creates a debounced function that delays invoking fn until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param {Function} fn - Function to debounce.
 * @param {number} wait - Wait time in milliseconds.
 * @returns {Function}
 */
function debounce(fn, wait = 100) {
  if (typeof fn !== 'function') throw new TypeError('Expected a function');
  let timeoutId = null;
  return function (...args) {
    const context = this;
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Creates a throttled function that only invokes fn at most once per every wait milliseconds.
 * @param {Function} fn - Function to throttle.
 * @returns {Function}
 */
function throttle(fn, wait = 100) {
  if (typeof fn !== 'function') throw new TypeError('Expected a function');
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

module.exports = {
  debounce,
  throttle
};
