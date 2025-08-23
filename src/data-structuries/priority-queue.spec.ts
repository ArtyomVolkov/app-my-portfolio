import { describe, expect, test } from '@jest/globals';
import PriorityQueue from './priority-queue';

describe('priority-queue', () => {
  test('getSize', () => {
    const pQueue = new PriorityQueue<string>();

    expect(pQueue.getSize()).toBe(0);
    pQueue.add([1, 'test']);
    pQueue.add([0, '123']);
    pQueue.add([2, 'art']);
    expect(pQueue.getSize()).toBe(3);
  });

  test('isEmpty', () => {
    const pQueue = new PriorityQueue<number>();

    expect(pQueue.isEmpty()).toBeTruthy();
    pQueue.add([0, 1]);
    pQueue.add([1, 2]);
    pQueue.add([2, 3]);
    expect(pQueue.isEmpty()).toBeFalsy();
  });

  test('add', () => {
    const pQueue = new PriorityQueue<string>();

    expect(pQueue.isEmpty()).toBeTruthy();
    pQueue.add([0, '123']);
    pQueue.add([2, '234']);
    expect(pQueue.getSize()).toBe(2);
    pQueue.add([2, '345']);
    expect(pQueue.getSize()).toBe(2);
    pQueue.add([3, '136']);
    expect(pQueue.getSize()).toBe(3);
    expect(pQueue.peek()).toBe('123');
    pQueue.add([-1, 'art']);
    expect(pQueue.peek()).toBe('art');
  });

  test('remove', () => {
    const pQueue = new PriorityQueue<Array<number>>();

    expect(pQueue.isEmpty()).toBeTruthy();
    pQueue.add([0, [1,2,3]]);
    pQueue.add([1, [4,5,6]]);
    pQueue.add([2, [7,8,9]]);
    expect(pQueue.contains([0, [1,2,3]])).toBeTruthy();
    pQueue.remove();
    expect(pQueue.contains([0, [1,2,3]])).toBeFalsy();
    expect(pQueue.peek()).toEqual([4,5,6]);

    const pQueue1 = new PriorityQueue<string>();
    expect(pQueue1.contains([1, '321'])).toBeFalsy();
    pQueue1.add([1, '321']);
    expect(pQueue1.contains([1, '321'])).toBeTruthy();
    pQueue1.remove();
    expect(pQueue1.contains([1, '321'])).toBeFalsy();
  });

  test('toString', () => {
    const pQueue = new PriorityQueue<Array<boolean>>();

    expect(pQueue.isEmpty()).toBeTruthy();
    pQueue.add([1, [true]]);
    pQueue.add([0, [false]]);
    pQueue.add([3, [false]]);
    expect(pQueue.toString()).toEqual(`[[0,[false]],[1,[true]],[3,[false]]]`);
  });
});