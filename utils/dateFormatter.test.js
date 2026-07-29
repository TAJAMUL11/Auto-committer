const assert = require('assert');
const { getFormattedDateString, isValidDate } = require('./dateFormatter');

function runTests() {
  // Test isValidDate
  assert.strictEqual(isValidDate(new Date()), true);
  assert.strictEqual(isValidDate(new Date('invalid date string')), false);

  // Test getFormattedDateString format YYYY-MM-DD
  const testDate = new Date('2025-01-15T12:00:00Z');
  const formatted = getFormattedDateString(testDate, 'UTC');
  assert.strictEqual(formatted, '2025-01-15');

  console.log('DateFormatter tests passed successfully!');
}

runTests();
