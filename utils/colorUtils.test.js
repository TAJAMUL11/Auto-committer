const assert = require('assert');
const { red, green, yellow, blue, bold, stripAnsi } = require('./colorUtils');

function runTests() {
  // Test colored strings
  assert.strictEqual(red('error'), '\x1b[31merror\x1b[0m');
  assert.strictEqual(green('success'), '\x1b[32msuccess\x1b[0m');
  assert.strictEqual(yellow('warn'), '\x1b[33mwarn\x1b[0m');
  assert.strictEqual(blue('info'), '\x1b[34minfo\x1b[0m');
  assert.strictEqual(bold('header'), '\x1b[1mheader\x1b[0m');

  // Test invalid input edge case
  assert.strictEqual(red(null), '');

  // Test stripAnsi
  const coloredText = `${red('failed')} ${green('passed')}`;
  assert.strictEqual(stripAnsi(coloredText), 'failed passed');

  console.log('ColorUtils tests passed successfully!');
}

runTests();
