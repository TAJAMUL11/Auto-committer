const assert = require('assert');
const { capitalize, truncate, isEmpty } = require('./stringUtils');

function runTests() {
  // Test capitalize
  assert.strictEqual(capitalize('hello'), 'Hello');
  assert.strictEqual(capitalize(''), '');
  assert.strictEqual(capitalize(null), '');

  // Test truncate
  assert.strictEqual(truncate('Hello World', 8), 'Hello...');
  assert.strictEqual(truncate('Short', 10), 'Short');

  // Test isEmpty
  assert.strictEqual(isEmpty(''), true);
  assert.strictEqual(isEmpty('   '), true);
  assert.strictEqual(isEmpty('hello'), false);

  console.log('StringUtils tests passed successfully!');
}

runTests();
