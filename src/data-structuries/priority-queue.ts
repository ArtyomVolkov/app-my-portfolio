/*
 *  A Priority Queue is a data structure that maintains a collection of elements, each associated with a priority.
 */
type Priority<D> = [priority: number, data: D];

class PriorityQueue<T> {
  private readonly queue: Array<Priority<T>>;

  constructor() {
    this.queue = [];
  }

  getSize(): number {
    return this.queue.length;
  }

  isEmpty(): boolean {
    return this.getSize() === 0;
  }

  // Complexity: O(n)
  add(item: Priority<T>) {
    if (this.getSize() === 0) {
      this.queue.push(item);
      return;
    }
    let hasAdded = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (item[0] === this.queue[i][0]) {
        // replace existing
        this.queue[i][1] = item[1];
        hasAdded = true;
        break;
      }
      if (item[0] < this.queue[i][0]) {
        this.queue.splice(i, 0, item);
        hasAdded = true;
        break;
      }
    }
    if (!hasAdded) {
      this.queue.push(item);
    }
  }

  // Complexity: O(1)
  remove() {
    this.queue.shift();
  }

  // Complexity: O(1)
  peek(): T|undefined {
    return this.queue[0][1];
  }

  // Complexity: O(n)
  contains(data: Priority<T>): boolean {
    const isComplexType = ['object', 'function'].includes(typeof data[1]);

    return !!this.queue.find((item) => {
      if (isComplexType) {
        return JSON.stringify(item) === JSON.stringify(data);
      }
      return item[0] === data[0] && item[1] === data[1];
    });
  }

  toString(): string {
    return JSON.stringify(this.queue);
  }
}

export default PriorityQueue;