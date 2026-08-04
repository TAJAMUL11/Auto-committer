/**
 * Utility functions for array manipulation.
 */

function unique(arr) {
  if (!Array.isArray(arr)) return [];
  return Array.from(new Set(arr));
}

function chunk(arr, size = 1) {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function flatten(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
}

function compact(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.filter(Boolean);
}

function difference(arr1, arr2) {
  if (!Array.isArray(arr1)) return [];
  if (!Array.isArray(arr2)) return [...arr1];
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

module.exports = {
  unique,
  chunk,
  flatten,
  compact,
  difference
};
