/*
 * A Stack is a linear data structure that follows the Last In, First Out (LIFO) principle.
 * This means that the last element added to the stack is the first one to be removed.
 */
class Stack<T> {
  private stack: Array<T>;

  constructor() {
    this.stack = [];
  }

  // Complexity: O(1)
  push(item: T) {
    this.stack.push(item);
  }

  // Complexity: O(1)
  pop() {
    this.stack.pop();
  }

  getSize(): number {
    return this.stack.length;
  }

  isEmpty(): boolean {
    return !this.stack.length;
  }

  clear() {
    this.stack = [];
  }

  // Complexity: O(1)
  peek(): T | undefined {
    return this.stack[this.getSize() - 1];
  }

  // Complexity: O(n)
  contains(value: T): boolean {
    return this.stack.includes(value);
  }

  clone(): Array<T> {
    return JSON.parse(this.toString());
  }

  toString(): string {
    return JSON.stringify(this.stack);
  }
}

export default Stack;
