/*
 * LRU (Least Recently Used) Cache Implementation.
 * This class provides a simple LRU cache mechanism.
 * It supports get and put operations with O(1) time complexity.
 */

class LRUCache {
  private capacity: number;
  private cache = new Map<number, number>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
      return;
    }

    if (this.cache.size === this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// Example usage:
// const lruCache = new LRUCache(3);
// lruCache.put('a', 1); // cache is {a:1}
// lruCache.put('b', 2); // cache is {a:1, b:2}
// lruCache.put('c', 3); // cache is {a:1, b:2, c:3}
// lruCache.get('a');    // return 1
// lruCache.put('d', 4); // evicts key 'b', cache is {a:1, c:3, d:4}
// lruCache.get('b');    // return -1 (not found)
// lruCache.put('e', 5); // evicts key 'c', cache is {a:1, d:4, e:5}


/*
 * LFU (Least Frequently Used) Cache Implementation.
 * This class provides a simple LFU cache mechanism.
 * It supports get and put operations with O(1) time complexity.
 */
class LFUCache {
  private capacity: number;
  private cache: Map<number, { value: number; freq: number }>;
  private freqMap: Map<number, Set<number>>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.freqMap = new Map();
  }

  get(key: number): number {
    if (!this.cache.has(key)) {
      return -1;
    }
    const { value, freq } = this.cache.get(key);

    this.cache.set(key, { value, freq: freq + 1 });
    this.freqMap.get(freq).delete(key);

    if (!this.freqMap.has(freq + 1)) {
      this.freqMap.set(freq + 1, new Set());
    }
    this.freqMap.get(freq + 1).add(key);

    return value;
  }

  put(key: number, value: number): void {
    
  }
}

export default { LRUCache, LFUCache };
