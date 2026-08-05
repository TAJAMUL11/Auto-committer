const assert = require('assert');
const { getEnv, getEnvAsInt, getEnvAsBool, hasEnv } = require('./envUtils');

function runTests() {
  // Setup temporary test env variables
  process.env.TEST_STR = 'hello';
  process.env.TEST_INT = '42';
  process.env.TEST_BOOL_TRUE = 'true';
  process.env.TEST_BOOL_FALSE = 'false';

  // Test getEnv
  assert.strictEqual(getEnv('TEST_STR', 'default'), 'hello');
  assert.strictEqual(getEnv('NON_EXISTENT_KEY', 'fallback'), 'fallback');

  // Test getEnvAsInt
  assert.strictEqual(getEnvAsInt('TEST_INT', 0), 42);
  assert.strictEqual(getEnvAsInt('NON_EXISTENT_KEY', 10), 10);

  // Test getEnvAsBool
  assert.strictEqual(getEnvAsBool('TEST_BOOL_TRUE', false), true);
  assert.strictEqual(getEnvAsBool('TEST_BOOL_FALSE', true), false);
  assert.strictEqual(getEnvAsBool('NON_EXISTENT_KEY', false), false);

  // Test hasEnv
  assert.strictEqual(hasEnv('TEST_STR'), true);
  assert.strictEqual(hasEnv('NON_EXISTENT_KEY'), false);

  // Cleanup
  delete process.env.TEST_STR;
  delete process.env.TEST_INT;
  delete process.env.TEST_BOOL_TRUE;
  delete process.env.TEST_BOOL_FALSE;

  console.log('EnvUtils tests passed successfully!');
}

runTests();
