const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { ensureDirSync, readFileSafe, writeFileSafe, isFile } = require('./fileUtils');

function runTests() {
  const testDir = path.join(__dirname, '..', '.tmp_test_fileUtils');
  const testFile = path.join(testDir, 'nested', 'test.txt');

  try {
    // Test ensureDirSync & writeFileSafe
    const writeOk = writeFileSafe(testFile, 'hello world');
    assert.strictEqual(writeOk, true);

    // Test isFile
    assert.strictEqual(isFile(testFile), true);
    assert.strictEqual(isFile(testDir), false);
    assert.strictEqual(isFile('non_existent_file_path.txt'), false);

    // Test readFileSafe
    assert.strictEqual(readFileSafe(testFile), 'hello world');
    assert.strictEqual(readFileSafe('non_existent_file_path.txt', 'default'), 'default');

    console.log('FileUtils tests passed successfully!');
  } finally {
    // Cleanup
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  }
}

runTests();
