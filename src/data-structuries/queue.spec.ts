import { describe, expect, test } from '@jest/globals';
import Queue from './queue';

describe('Queue', () => {
  test('add', () => {
    const queue = new Queue<string>();

    expect(queue.isEmpty()).toBeTruthy();
    queue.add('test');
    queue.add('art');
    queue.add('123');

    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.getSize()).toBe(3);
    expect(queue.contains('test')).toBeTruthy();
    expect(queue.contains('art')).toBeTruthy();
    expect(queue.contains('123')).toBeTruthy();
  });

  test('remove', () => {
    const queue = new Queue<number>();

    expect(queue.isEmpty()).toBeTruthy();
    queue.add(2);
    queue.add(1);
    queue.add(3);
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.contains(2)).toBeTruthy()
    queue.remove();
    expect(queue.contains(2)).toBeFalsy();
    expect(queue.peek()).toBe(1);
    queue.remove();
    expect(queue.peek()).toBe(3);
  });

  test('getSize', () => {
    const queue = new Queue<Array<string>>();

    expect(queue.getSize()).toBe(0);
    queue.add(['a3']);
    queue.add(['b2']);
    queue.add(['c1']);
    expect(queue.getSize()).toBe(3);
    queue.remove();
    expect(queue.getSize()).toBe(2);
  });

  test('contains', () => {
    type User = { name: string, age: number };
    const queue = new Queue<User>();

    expect(queue.getSize()).toBe(0);
    queue.add({ name: 'User 1', age: 21 });
    queue.add({ name: 'User 2', age: 30 });

    expect(queue.contains({ name: 'User 1', age: 21 })).toBeTruthy();
    expect(queue.contains({ name: 'User 1', age: 20 })).toBeFalsy();
    expect(queue.contains({ name: 'User 2', age: 30 })).toBeTruthy();
  });

  test('isEmpty', () => {
    const queue = new Queue<boolean>();

    expect(queue.isEmpty()).toBeTruthy();
    queue.add(false);
    queue.add(true);
    expect(queue.isEmpty()).toBeFalsy();
  });

  test('peek', () => {
    const queue = new Queue<Function>();
    const f1 = () => { console.log('test 1') };
    const f2 = () => { console.log('test 2') };

    queue.add(f1);
    queue.add(f2);

    expect(queue.peek()).toEqual(f1);
  });

  test('toString', () => {
    const queue = new Queue<Array<string>>();

    queue.add(['hello']);
    queue.add(['world']);

    expect(queue.toString()).toBe(`[["hello"],["world"]]`);
  });
});
