import { describe, expect, test } from '@jest/globals';
import Stack from './stack';

describe('stack', () => {
  test('push', () => {
    const stack = new Stack<number>();

    expect(stack.getSize()).toBe(0);
    stack.push(132);
    expect(stack.peek()).toEqual(132);
    stack.push(75);
    stack.push(12);
    stack.push(236);
    expect(stack.peek()).toEqual(236);
  });

  test('pop', () => {
    const stack = new Stack<string>();

    expect(stack.contains('345')).toBeFalsy();
    stack.push('345');
    expect(stack.contains('345')).toBeTruthy();
    expect(stack.peek()).toEqual('345');
    stack.push('11');
    stack.push('17');
    expect(stack.contains('17')).toBeTruthy();
    stack.pop();
    expect(stack.contains('17')).toBeFalsy();
    expect(stack.peek()).toEqual('11');
  });

  test('getSize', () => {
    const stack = new Stack<boolean>();

    expect(stack.getSize()).toEqual(0);
    stack.push(true);
    expect(stack.getSize()).toEqual(1);
    stack.push(false);
    stack.push(false);
    expect(stack.getSize()).toEqual(3);
  });

  test('isEmpty', () => {
    const stack = new Stack<string>();

    expect(stack.isEmpty()).toBeTruthy();
    stack.push('test');
    expect(stack.isEmpty()).toBeFalsy();
    stack.clear();
    expect(stack.isEmpty()).toBeTruthy();
  });

  test('clear', () => {
    const stack = new Stack<number>();

    stack.push(44);
    stack.push(55);
    expect(stack.isEmpty()).toBeFalsy();
    stack.clear();
    expect(stack.isEmpty()).toBeTruthy();
  });

  test('peek', () => {
    type User = { name: string, age: number };
    const stack = new Stack<User>();

    expect(stack.peek()).toBe(undefined);
    stack.push({ name: 'User', age: 34 });
    expect(stack.peek()).toEqual({ name: 'User', age: 34 });
  });

  test('contains', () => {
    const stack = new Stack<number>();

    stack.push(77);
    stack.push(11);
    stack.push(88);
    expect(stack.contains(99)).toBeFalsy();
    expect(stack.contains(11)).toBeTruthy();
    expect(stack.contains(88)).toBeTruthy();
    expect(stack.contains(77)).toBeTruthy();
  });

  test('clone', () => {
    type User = { name: string, age: number };
    const stack = new Stack<User>();
    const user1 = {
      name: 'User 1',
      age: 30
    };
    const user2 = {
      name: 'User 2',
      age: 31
    };

    stack.push(user1);
    stack.push(user2);

    const users = stack.clone();
    // mutate
    user1.name = 'User 1 changed';
    user2.name = 'User 2 changed';
    expect(users).toEqual([
      {
        name: 'User 1',
        age: 30
      },
      {
        name: 'User 2',
        age: 31
      }
    ]);
  });

  test('toString', () => {
    const stack = new Stack<Array<number>>();

    stack.push([1,2,3]);
    stack.push([4,5,6]);
    stack.push([7,8,9]);

    expect(stack.toString()).toEqual('[[1,2,3],[4,5,6],[7,8,9]]');
  });
});