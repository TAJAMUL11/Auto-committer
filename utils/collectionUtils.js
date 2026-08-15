/**
 * Utility functions for collection manipulation (grouping, keying, and partitioning).
 */

/**
 * Groups array elements by the result of a key generator function or property name.
 * @param {Array} arr
 * @param {Function|string} keyFn
 * @returns {Object}
 */
function groupBy(arr, keyFn) {
  if (!Array.isArray(arr)) return {};
  const getKey = typeof keyFn === 'function' ? keyFn : (item) => item?.[keyFn];
  return arr.reduce((acc, item) => {
    const key = getKey(item);
    if (key !== undefined && key !== null) {
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
    }
    return acc;
  }, {});
}

/**
 * Maps array elements into an object keyed by a generated key.
 * @param {Array} arr
 * @param {Function|string} keyFn
 * @returns {Object}
 */
function keyBy(arr, keyFn) {
  if (!Array.isArray(arr)) return {};
  const getKey = typeof keyFn === 'function' ? keyFn : (item) => item?.[keyFn];
  return arr.reduce((acc, item) => {
    const key = getKey(item);
    if (key !== undefined && key !== null) {
      acc[key] = item;
    }
    return acc;
  }, {});
}

/**
 * Splits an array into two arrays: one with elements satisfying predicate, one with elements that do not.
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {[Array, Array]}
 */
function partition(arr, predicate) {
  if (!Array.isArray(arr)) return [[], []];
  const pass = [];
  const fail = [];
  const fn = typeof predicate === 'function' ? predicate : Boolean;
  for (const item of arr) {
    if (fn(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }
  return [pass, fail];
}

module.exports = {
  groupBy,
  keyBy,
  partition
};
