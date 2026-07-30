const assert = require('assert');
const { pick, omit, isObject } = require('./objectUtils');

function runTests() {
  // Test pick
  const obj1 = { a: 1, b: 2, c: 3 };
  assert.deepStrictEqual(pick(obj1, ['a', 'c']), { a: 1, c: 3 });
  assert.deepStrictEqual(pick(null, ['a']), {});

  // Test omit
  assert.deepStrictEqual(omit(obj1, ['b']), { a: 1, c: 3 });
  assert.deepStrictEqual(omit(null, ['a']), {});

  // Test isObject
  assert.strictEqual(isObject({}), true);
  assert.strictEqual(isObject([]), false);
  assert.strictEqual(isObject(null), false);
  assert.strictEqual(isObject(42), false);

  console.log('ObjectUtils tests passed successfully!');
}

runTests();
