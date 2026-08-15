const assert = require('assert');
const { groupBy, keyBy, partition } = require('./collectionUtils');

function runTests() {
  // Test groupBy
  const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
    { type: 'veg', name: 'carrot' }
  ];
  assert.deepStrictEqual(groupBy(items, 'type'), {
    fruit: [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' }
    ],
    veg: [{ type: 'veg', name: 'carrot' }]
  });
  assert.deepStrictEqual(groupBy(null, 'type'), {});

  // Test keyBy
  assert.deepStrictEqual(keyBy(items, 'name'), {
    apple: { type: 'fruit', name: 'apple' },
    banana: { type: 'fruit', name: 'banana' },
    carrot: { type: 'veg', name: 'carrot' }
  });
  assert.deepStrictEqual(keyBy(null, 'name'), {});

  // Test partition
  const numbers = [1, 2, 3, 4, 5, 6];
  const [evens, odds] = partition(numbers, (n) => n % 2 === 0);
  assert.deepStrictEqual(evens, [2, 4, 6]);
  assert.deepStrictEqual(odds, [1, 3, 5]);
  assert.deepStrictEqual(partition(null, () => true), [[], []]);

  console.log('CollectionUtils tests passed successfully!');
}

runTests();
