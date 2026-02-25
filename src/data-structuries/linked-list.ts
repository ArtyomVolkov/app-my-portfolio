/*
 *  A Linked List is a linear data structure consisting of nodes, where each node points to the next one
 *  in the sequence.
 */
class NodeItem<T> {
  value: T;
  next: NodeItem<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  head: NodeItem<T> | null;

  constructor() {
    this.head = null;
  }

  // Complexity: O(n)
  push(item: T) {
    const node = new NodeItem<T>(item);

    if (!this.head) {
      this.head = node;
      return;
    }
    let current = this.head;

    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }

  // Complexity: O(n)
  pop(): T|null {
    let current = this.head;
    let prev: NodeItem<T> | null = null;

    if (!current) {
      return null;
    }
    while (current.next) {
      prev = current;
      current = current.next;
    }
    if (!prev) {
      this.head = null;
    } else {
      prev.next = null;
    }
    return current.value;
  }

  // Complexity: O(n)
  delete(value: T): T | null {
    let current = this.head;
    let prev: NodeItem<T> | null = null;

    if (!current) {
      return null;
    }
    while (current && current.value !== value) {
      prev = current;
      current = current.next;
    }
    if (!current) {
      return null;
    }
    if (!prev) {
      this.head = current.next;
    } else {
      prev.next = current.next;
    }
    return current.value;
  }

  // Complexity: O(n)
  find(value: T): boolean {
    let current = this.head;
    const isComplexType = ['object', 'function'].includes(typeof value);

    while (current) {
      if (isComplexType) {
        if (JSON.stringify(value) === JSON.stringify(current.value)) {
          return true;
        }
      } else {
        if (current.value === value) {
          return true;
        }
      }
      current = current.next;
    }
    return false;
  }

  // Complexity: O(n)
  reverse() {
    let current = this.head;
    let prev = null;

    while (current) {
      const next = current.next;

      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }

  getSize(): number {
    let size = 0;
    let current = this.head;

    while (current) {
      size+=1;
      current = current.next;
    }

    return size;
  }

  getFirst(): T | null {
    return this.head ? this.head.value : null;
  }

  getLast(): T | null {
    let current = this.head;

    if (!current) {
      return null;
    }
    while (current.next) {
      current = current.next;
    }
    return current.value;
  }

  toArray(): Array<T> {
    let current = this.head;
    const list: Array<T> = [];

    while (current) {
      list.push(current.value);
      current = current.next;
    }
    return list;
  }

  clear() {
    this.head = null;
  }
}

export default LinkedList;