const { clamp, randomInt, roundTo, inRange, sum, average } = require('./numberUtils');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- numberUtils tests ---\n');

// clamp
console.log('clamp:');
assert(clamp(5, 1, 10) === 5, 'clamp(5, 1, 10) returns 5');
assert(clamp(-3, 0, 10) === 0, 'clamp(-3, 0, 10) returns 0');
assert(clamp(15, 0, 10) === 10, 'clamp(15, 0, 10) returns 10');
assert(clamp(5, 5, 5) === 5, 'clamp(5, 5, 5) returns 5');
try { clamp(5, 10, 1); assert(false, 'clamp throws on min > max'); } catch (e) { assert(e instanceof RangeError, 'clamp throws RangeError on min > max'); }

// randomInt
console.log('\nrandomInt:');
const r = randomInt(1, 10);
assert(r >= 1 && r <= 10, `randomInt(1, 10) returns value in range (got ${r})`);
assert(Number.isInteger(randomInt(5, 5)), 'randomInt(5, 5) returns an integer');
assert(randomInt(5, 5) === 5, 'randomInt(5, 5) returns 5');

// roundTo
console.log('\nroundTo:');
assert(roundTo(3.14159, 2) === 3.14, 'roundTo(3.14159, 2) returns 3.14');
assert(roundTo(3.14159, 0) === 3, 'roundTo(3.14159, 0) returns 3');
assert(roundTo(2.5) === 3, 'roundTo(2.5) returns 3');
assert(roundTo(1.005, 2) === 1, 'roundTo(1.005, 2) handles floating point');

// inRange
console.log('\ninRange:');
assert(inRange(5, 1, 10) === true, 'inRange(5, 1, 10) returns true');
assert(inRange(1, 1, 10) === true, 'inRange(1, 1, 10) returns true (inclusive)');
assert(inRange(0, 1, 10) === false, 'inRange(0, 1, 10) returns false');

// sum
console.log('\nsum:');
assert(sum([1, 2, 3]) === 6, 'sum([1, 2, 3]) returns 6');
assert(sum([]) === 0, 'sum([]) returns 0');
assert(sum([-1, 1]) === 0, 'sum([-1, 1]) returns 0');

// average
console.log('\naverage:');
assert(average([2, 4, 6]) === 4, 'average([2, 4, 6]) returns 4');
assert(Number.isNaN(average([])), 'average([]) returns NaN');

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
