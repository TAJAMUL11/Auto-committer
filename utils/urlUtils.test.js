const assert = require('assert');
const { parseQueryParams, buildQueryString } = require('./urlUtils');

function runTests() {
  // Test parseQueryParams
  assert.deepStrictEqual(parseQueryParams('?a=1&b=hello%20world'), { a: '1', b: 'hello world' });
  assert.deepStrictEqual(parseQueryParams('a=1'), { a: '1' });
  assert.deepStrictEqual(parseQueryParams(''), {});
  assert.deepStrictEqual(parseQueryParams(null), {});

  // Test buildQueryString
  assert.strictEqual(buildQueryString({ a: 1, b: 'hello world' }), '?a=1&b=hello%20world');
  assert.strictEqual(buildQueryString({}), '');
  assert.strictEqual(buildQueryString(null), '');

  console.log('UrlUtils tests passed successfully!');
}

runTests();
