class Stack<T> {
  private stack: Array<T>;

  constructor() {
    this.stack = [];
  }

  push(item: T) {
    this.stack.push(item);
  }

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

  peek(): T|undefined {
    return this.stack[this.getSize()-1];
  }

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
