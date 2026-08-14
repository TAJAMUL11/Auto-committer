/**
 * Utility functions for function execution control and higher-order helpers.
 */

/**
 * Creates a function that is restricted to invoking fn once.
 * Repeat calls to the function return the value of the first call.
 * @param {Function} fn - The function to restrict.
 * @returns {Function}
 */
function once(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

/**
 * Returns an identity function that returns the first argument given to it.
 * @template T
 * @param {T} val
 * @returns {T}
 */
function identity(val) {
  return val;
}

/**
 * Creates a function that returns the given constant value.
 * @template T
 * @param {T} val
 * @returns {() => T}
 */
function constant(val) {
  return () => val;
}

/**
 * Creates a no-operation function that does nothing and returns undefined.
 */
function noop() {}

module.exports = {
  once,
  identity,
  constant,
  noop
};
