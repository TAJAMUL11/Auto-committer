const assert = require('assert');
const { defer, mapConcurrent } = require('./promiseUtils');

async function runTests() {
  // Test defer
  const deferred = defer();
  let resolvedValue = null;
  deferred.promise.then((val) => {
    resolvedValue = val;
  });
  assert.strictEqual(resolvedValue, null);
  deferred.resolve('deferred result');
  await deferred.promise;
  assert.strictEqual(resolvedValue, 'deferred result');

  // Test mapConcurrent
  const items = [10, 20, 30, 40];
  let maxActive = 0;
  let active = 0;

  const results = await mapConcurrent(
    items,
    async (item) => {
      active++;
      if (active > maxActive) maxActive = active;
      await new Promise((resolve) => setTimeout(resolve, 20));
      active--;
      return item * 2;
    },
    2
  );

  assert.deepStrictEqual(results, [20, 40, 60, 80]);
  assert.ok(maxActive <= 2, `Expected max active concurrency <= 2, got ${maxActive}`);

  // Test mapConcurrent edge cases
  assert.deepStrictEqual(await mapConcurrent(null, async () => {}), []);

  console.log('PromiseUtils tests passed successfully!');
}

runTests().catch((err) => {
  console.error('PromiseUtils tests failed:', err);
  process.exit(1);
});
