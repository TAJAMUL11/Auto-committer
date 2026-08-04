const assert = require('assert');
const { isEmail, isUrl, isNumeric } = require('./validationUtils');

function runTests() {
  // Test isEmail
  assert.strictEqual(isEmail('user@example.com'), true);
  assert.strictEqual(isEmail('invalid-email'), false);
  assert.strictEqual(isEmail(null), false);

  // Test isUrl
  assert.strictEqual(isUrl('https://example.com'), true);
  assert.strictEqual(isUrl('http://localhost:3000/api'), true);
  assert.strictEqual(isUrl('ftp://example.com'), false);
  assert.strictEqual(isUrl('not-a-url'), false);

  // Test isNumeric
  assert.strictEqual(isNumeric(42), true);
  assert.strictEqual(isNumeric('3.14'), true);
  assert.strictEqual(isNumeric('abc'), false);
  assert.strictEqual(isNumeric(NaN), false);

  console.log('ValidationUtils tests passed successfully!');
}

runTests();
