const assert = require('assert');
const { capitalize, truncate, isEmpty, slugify } = require('./stringUtils');

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

  // Test slugify
  assert.strictEqual(slugify('Hello World!'), 'hello-world');
  assert.strictEqual(slugify('  JS & Node.js -- Auto Committer  '), 'js-nodejs-auto-committer');
  assert.strictEqual(slugify(''), '');

  console.log('StringUtils tests passed successfully!');
}

runTests();
