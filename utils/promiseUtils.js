/**
 * Utility functions for advanced Promise control and concurrency operations.
 */

/**
 * Creates a deferred object containing a promise along with its resolve and reject functions.
 * @template T
 * @returns {{ promise: Promise<T>, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }}
 */
function defer() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/**
 * Maps an array of items using an async mapper function with a concurrency limit.
 * @template T, R
 * @param {T[]} items - Array of items to map.
 * @param {(item: T, index: number) => Promise<R>} mapper - Async mapping function.
 * @param {number} [concurrency=2] - Maximum number of pending promises.
 * @returns {Promise<R[]>}
 */
async function mapConcurrent(items, mapper, concurrency = 2) {
  if (!Array.isArray(items)) return [];
  if (typeof mapper !== 'function') throw new TypeError('Mapper must be a function');

  const limit = Math.max(1, Math.floor(concurrency));
  const results = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      results[index] = await mapper(items[index], index);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

module.exports = {
  defer,
  mapConcurrent
};
