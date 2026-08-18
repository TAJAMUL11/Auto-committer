/**
 * Utility functions for precise type checking and checking primitive/composite data types.
 */

function isString(val) {
  return typeof val === 'string' || val instanceof String;
}

function isNumber(val) {
  return typeof val === 'number' && !isNaN(val) && isFinite(val);
}

function isBoolean(val) {
  return typeof val === 'boolean';
}

function isFunction(val) {
  return typeof val === 'function';
}

function isArray(val) {
  return Array.isArray(val);
}

function isPlainObject(val) {
  if (val === null || typeof val !== 'object' || Array.isArray(val)) return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto === Object.prototype;
}

function isNil(val) {
  return val === null || val === undefined;
}

module.exports = {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isArray,
  isPlainObject,
  isNil
};
