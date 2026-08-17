const assert = require('assert');
const { debounce, throttle } = require('./rateLimiter');

async function runTests() {
  // Test debounce
  let count = 0;
  const increment = debounce(() => { count++; }, 50);
  increment();
  increment();
  increment();
  assert.strictEqual(count, 0);
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.strictEqual(count, 1);

  // Test throttle
  let throttleCount = 0;
  const throttledInc = throttle(() => { throttleCount++; }, 100);
  throttledInc();
  throttledInc();
  throttledInc();
  assert.strictEqual(throttleCount, 1);

  console.log('RateLimiter tests passed successfully!');
}

runTests().catch((err) => {
  console.error('RateLimiter tests failed:', err);
  process.exit(1);
});
