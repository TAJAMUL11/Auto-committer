const assert = require('assert');
const { sha256, md5, randomHex } = require('./cryptoUtils');

function runTests() {
  // Test sha256
  assert.strictEqual(
    sha256('hello'),
    '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
  );
  assert.strictEqual(sha256(123), '');

  // Test md5
  assert.strictEqual(md5('hello'), '5d41402abc4b2a76b9719d911017c592');
  assert.strictEqual(md5(null), '');

  // Test randomHex
  const hex = randomHex(16);
  assert.strictEqual(typeof hex, 'string');
  assert.strictEqual(hex.length, 32);

  console.log('CryptoUtils tests passed successfully!');
}

runTests();
