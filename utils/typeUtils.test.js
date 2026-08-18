const assert = require('assert');
const {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isArray,
  isPlainObject,
  isNil
} = require('./typeUtils');

function runTests() {
  // Test isString
  assert.strictEqual(isString('hello'), true);
  assert.strictEqual(isString(123), false);

  // Test isNumber
  assert.strictEqual(isNumber(42), true);
  assert.strictEqual(isNumber(NaN), false);
  assert.strictEqual(isNumber(Infinity), false);

  // Test isBoolean
  assert.strictEqual(isBoolean(true), true);
  assert.strictEqual(isBoolean(false), true);
  assert.strictEqual(isBoolean('true'), false);

  // Test isFunction
  assert.strictEqual(isFunction(() => {}), true);
  assert.strictEqual(isFunction(null), false);

  // Test isArray
  assert.strictEqual(isArray([1, 2, 3]), true);
  assert.strictEqual(isArray({ length: 3 }), false);

  // Test isPlainObject
  assert.strictEqual(isPlainObject({ a: 1 }), true);
  assert.strictEqual(isPlainObject(new Date()), false);
  assert.strictEqual(isPlainObject([]), false);

  // Test isNil
  assert.strictEqual(isNil(null), true);
  assert.strictEqual(isNil(undefined), true);
  assert.strictEqual(isNil(0), false);

  console.log('TypeUtils tests passed successfully!');
}

runTests();
