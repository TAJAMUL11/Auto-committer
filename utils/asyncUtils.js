/**
 * Utility functions for asynchronous operations.
 */

/**
 * Delays execution for a specified number of milliseconds.
 * @param {number} ms - Delay in milliseconds.
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}

/**
 * Wraps a promise with a timeout limit.
 * @param {Promise<T>} promise - The promise to execute.
 * @param {number} ms - Timeout in milliseconds.
 * @param {string} [errorMessage] - Optional timeout error message.
 * @returns {Promise<T>}
 */
function withTimeout(promise, ms, errorMessage = 'Operation timed out') {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(errorMessage)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

/**
 * Retries an asynchronous function a specified number of times upon failure.
 * @param {Function} fn - Async function returning a promise.
 * @param {number} [retries=3] - Number of retry attempts.
 * @param {number} [delayMs=100] - Delay between retries in milliseconds.
 * @returns {Promise<any>}
 */
async function retry(fn, retries = 3, delayMs = 100) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries && delayMs > 0) {
        await sleep(delayMs);
      }
    }
  }
  throw lastError;
}

module.exports = {
  sleep,
  withTimeout,
  retry
};
