const assert = require('assert');
const { sleep, withTimeout, retry } = require('./asyncUtils');

async function runTests() {
  // Test sleep
  const start = Date.now();
  await sleep(50);
  const elapsed = Date.now() - start;
  assert.ok(elapsed >= 40, `sleep delayed execution (elapsed: ${elapsed}ms)`);

  // Test withTimeout resolved
  const resolved = await withTimeout(Promise.resolve('success'), 100);
  assert.strictEqual(resolved, 'success');

  // Test withTimeout rejected on timeout
  try {
    await withTimeout(new Promise((resolve) => setTimeout(resolve, 200)), 50, 'Custom timeout');
    assert.fail('Should have timed out');
  } catch (err) {
    assert.strictEqual(err.message, 'Custom timeout');
  }

  // Test retry success on second attempt
  let attempts = 0;
  const result = await retry(async () => {
    attempts++;
    if (attempts < 2) throw new Error('Temporary error');
    return 'retry ok';
  }, 3, 10);
  assert.strictEqual(result, 'retry ok');
  assert.strictEqual(attempts, 2);

  console.log('AsyncUtils tests passed successfully!');
}

runTests().catch((err) => {
  console.error('AsyncUtils tests failed:', err);
  process.exit(1);
});
