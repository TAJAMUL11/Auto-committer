const assert = require('assert');
const { unique, chunk, flatten } = require('./arrayUtils');

function runTests() {
  // Test unique
  assert.deepStrictEqual(unique([1, 2, 2, 3, 1]), [1, 2, 3]);

  // Test chunk
  assert.deepStrictEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);

  // Test flatten
  assert.deepStrictEqual(flatten([1, [2, [3, 4]], 5]), [1, 2, 3, 4, 5]);

  console.log('ArrayUtils tests passed successfully!');
}

runTests();
