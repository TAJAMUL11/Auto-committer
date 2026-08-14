const assert = require('assert');
const {
  normalizeSlashes,
  getFileExtension,
  getFileNameWithoutExtension,
  isAbsolutePath
} = require('./pathUtils');

function runTests() {
  // Test normalizeSlashes
  assert.strictEqual(normalizeSlashes('utils\\pathUtils.js'), 'utils/pathUtils.js');
  assert.strictEqual(normalizeSlashes('a/b/c'), 'a/b/c');
  assert.strictEqual(normalizeSlashes(123), '');

  // Test getFileExtension
  assert.strictEqual(getFileExtension('script.JS'), '.js');
  assert.strictEqual(getFileExtension('README'), '');
  assert.strictEqual(getFileExtension(null), '');

  // Test getFileNameWithoutExtension
  assert.strictEqual(getFileNameWithoutExtension('src/utils/pathUtils.js'), 'pathUtils');
  assert.strictEqual(getFileNameWithoutExtension('archive.tar.gz'), 'archive.tar');

  // Test isAbsolutePath
  assert.strictEqual(isAbsolutePath('/usr/bin'), true);
  assert.strictEqual(isAbsolutePath('relative/path.js'), false);
  assert.strictEqual(isAbsolutePath(''), false);

  console.log('PathUtils tests passed successfully!');
}

runTests();
