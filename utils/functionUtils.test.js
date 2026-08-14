const assert = require('assert');
const { once, identity, constant, noop } = require('./functionUtils');

function runTests() {
  // Test once
  let count = 0;
  const increment = once((amount) => {
    count += amount;
    return count;
  });
  assert.strictEqual(increment(5), 5);
  assert.strictEqual(increment(10), 5);
  assert.strictEqual(count, 5);

  // Test identity
  assert.strictEqual(identity('hello'), 'hello');
  assert.strictEqual(identity(42), 42);

  // Test constant
  const getTen = constant(10);
  assert.strictEqual(getTen(), 10);
  assert.strictEqual(getTen(), 10);

  // Test noop
  assert.strictEqual(noop(), undefined);

  console.log('FunctionUtils tests passed successfully!');
}

runTests();
