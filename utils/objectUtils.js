/**
 * Utility functions for object manipulation and validation.
 */

function pick(obj, keys = []) {
  if (typeof obj !== 'object' || obj === null) return {};
  const result = {};
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

function omit(obj, keys = []) {
  if (typeof obj !== 'object' || obj === null) return {};
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

module.exports = {
  pick,
  omit,
  isObject
};
