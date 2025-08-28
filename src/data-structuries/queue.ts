/*
 *  A Queue is a data structure that follows the First In, First Out (FIFO) principle, where the first element
 *  added is the first one to be removed.
 */
class Queue<T> {
  private readonly queue: Array<T>;

  constructor() {
    this.queue = [];
  }

  // Complexity: O(1)
  add(item: T) {
    this.queue.push(item);
  }

  // Complexity: O(1)
  remove() {
    this.queue.shift();
  }

  getSize() {
    return this.queue.length;
  }

  // Complexity: O(n)
  contains(value: T): boolean {
    if (['object', 'function'].includes(typeof value)) {
      return !!this.queue.find((item) => JSON.stringify(item) === JSON.stringify(value));
    }
    return this.queue.includes(value);
  }

  isEmpty(): boolean {
    return this.getSize() === 0;
  }

  // Complexity: O(1)
  peek(): T {
    return this.queue[0];
  }

  toString(): string {
    return JSON.stringify(this.queue);
  }
}

export default Queue;