/**
 * Simple logging utility for consistent script console outputs.
 */
const { getFormattedDateString } = require('./dateFormatter');

function logInfo(message) {
  const dateStr = getFormattedDateString(new Date());
  console.log(`[INFO] [${dateStr}] ${message}`);
}

function logWarn(message) {
  const dateStr = getFormattedDateString(new Date());
  console.warn(`[WARN] [${dateStr}] ${message}`);
}

function logError(message) {
  const dateStr = getFormattedDateString(new Date());
  console.error(`[ERROR] [${dateStr}] ${message}`);
}

module.exports = {
  logInfo,
  logWarn,
  logError
};
