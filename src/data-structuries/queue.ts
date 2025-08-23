// FIFO
class Queue<T> {
  private readonly queue: Array<T>;

  constructor() {
    this.queue = [];
  }

  add(item: T) {
    this.queue.push(item);
  }

  remove() {
    this.queue.shift();
  }

  getSize() {
    return this.queue.length;
  }

  contains(value: T): boolean {
    if (['object', 'function'].includes(typeof value)) {
      return !!this.queue.find((item) => JSON.stringify(item) === JSON.stringify(value));
    }
    return this.queue.includes(value);
  }

  isEmpty(): boolean {
    return this.getSize() === 0;
  }

  peek(): T {
    return this.queue[0];
  }

  toString(): string {
    return JSON.stringify(this.queue);
  }
}

export default Queue;