const assert = require('assert');
const { safeParse, safeStringify, isValidJson } = require('./jsonUtils');

function runTests() {
  // Test safeParse
  assert.deepStrictEqual(safeParse('{"a":1}'), { a: 1 });
  assert.strictEqual(safeParse('invalid json', 'fallback'), 'fallback');
  assert.strictEqual(safeParse(123, null), null);

  // Test safeStringify
  assert.strictEqual(safeStringify({ a: 1 }), '{"a":1}');
  const circular = {};
  circular.self = circular;
  assert.strictEqual(safeStringify(circular, 0, 'error'), 'error');

  // Test isValidJson
  assert.strictEqual(isValidJson('{"valid": true}'), true);
  assert.strictEqual(isValidJson('{invalid}'), false);
  assert.strictEqual(isValidJson(''), false);

  console.log('JsonUtils tests passed successfully!');
}

runTests();
