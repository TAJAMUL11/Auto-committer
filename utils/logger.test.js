const assert = require('assert');
const { logInfo, logWarn, logError } = require('./logger');

function runTests() {
  const capturedLogs = [];
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  console.log = (msg) => capturedLogs.push(msg);
  console.warn = (msg) => capturedLogs.push(msg);
  console.error = (msg) => capturedLogs.push(msg);

  try {
    logInfo('Test info message');
    logWarn('Test warning message');
    logError('Test error message');

    assert.strictEqual(capturedLogs.length, 3);
    assert.ok(capturedLogs[0].includes('[INFO]'));
    assert.ok(capturedLogs[0].includes('Test info message'));
    assert.ok(capturedLogs[1].includes('[WARN]'));
    assert.ok(capturedLogs[1].includes('Test warning message'));
    assert.ok(capturedLogs[2].includes('[ERROR]'));
    assert.ok(capturedLogs[2].includes('Test error message'));

    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;

    console.log('Logger tests passed successfully!');
  } catch (err) {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
    throw err;
  }
}

runTests();
