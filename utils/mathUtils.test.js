const assert = require('assert');
const { factorial, gcd, lcm, median } = require('./mathUtils');

function runTests() {
  // Test factorial
  assert.strictEqual(factorial(0), 1);
  assert.strictEqual(factorial(1), 1);
  assert.strictEqual(factorial(5), 120);
  assert.throws(() => factorial(-1), TypeError);

  // Test gcd
  assert.strictEqual(gcd(12, 18), 6);
  assert.strictEqual(gcd(-12, 18), 6);

  // Test lcm
  assert.strictEqual(lcm(12, 18), 36);
  assert.strictEqual(lcm(0, 5), 0);

  // Test median
  assert.strictEqual(median([3, 1, 2]), 2);
  assert.strictEqual(median([4, 1, 3, 2]), 2.5);
  assert.throws(() => median([]), TypeError);

  console.log('MathUtils tests passed successfully!');
}

runTests();
