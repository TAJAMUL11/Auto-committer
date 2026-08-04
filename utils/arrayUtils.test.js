const assert = require('assert');
const { unique, chunk, flatten, compact, difference } = require('./arrayUtils');

function runTests() {
  // Test unique
  assert.deepStrictEqual(unique([1, 2, 2, 3, 1]), [1, 2, 3]);

  // Test chunk
  assert.deepStrictEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);

  // Test flatten
  assert.deepStrictEqual(flatten([1, [2, [3, 4]], 5]), [1, 2, 3, 4, 5]);

  // Test compact
  assert.deepStrictEqual(compact([0, 1, false, 2, '', 3, null, undefined]), [1, 2, 3]);

  // Test difference
  assert.deepStrictEqual(difference([1, 2, 3, 4], [2, 4]), [1, 3]);

  console.log('ArrayUtils tests passed successfully!');
}

runTests();
