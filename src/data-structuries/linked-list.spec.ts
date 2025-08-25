import { describe, expect, test } from '@jest/globals';
import LinkedList from './linked-list';

describe('LinkedList', () => {
  test('push', () => {
    const linkedList = new LinkedList<string>();

    linkedList.push('1');
    linkedList.push('2');
    linkedList.push('3');
    expect(linkedList.toArray()).toEqual(['1', '2', '3'])
  });

  test('pop', () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.toArray()).toEqual([]);
    expect(linkedList.pop()).toEqual(null);
    linkedList.push(21);
    linkedList.push(45);
    linkedList.push(56);
    expect(linkedList.toArray()).toEqual([21, 45, 56]);
    linkedList.pop();
    expect(linkedList.toArray()).toEqual([21, 45]);
    linkedList.pop();
    linkedList.pop();
    expect(linkedList.toArray()).toEqual([]);
  });

  test('delete', () => {
    const linkedList = new LinkedList<string>();

    expect(linkedList.toArray()).toEqual([]);
    expect(linkedList.delete('123')).toEqual(null);
    linkedList.push('foo');
    linkedList.push('bar');
    linkedList.push('art');
    expect(linkedList.toArray()).toEqual(['foo', 'bar', 'art']);

    expect(linkedList.delete('bar')).toEqual('bar');
    expect(linkedList.toArray()).toEqual(['foo', 'art']);
    linkedList.delete('foo');
    expect(linkedList.delete('123')).toEqual(null);
  });

  test('find', () => {
    const linkedList = new LinkedList<string>();
    const linkedList1 = new LinkedList<Array<string>>();

    expect(linkedList.toArray()).toEqual([]);
    linkedList.push('test-1');
    linkedList.push('test-3');
    linkedList.push('test-2');
    expect(linkedList.find('test-3')).toBeTruthy();
    expect(linkedList.find('test')).toBeFalsy();

    expect(linkedList1.toArray()).toEqual([]);
    expect(linkedList1.find(['1','2','3'])).toBeFalsy();
    linkedList1.push(['1','2','3']);
    expect(linkedList1.find(['2','1','3'])).toBeFalsy();
    expect(linkedList1.find(['1','2','3'])).toBeTruthy();
  });

  test('reverse', () => {
    const linkedList = new LinkedList<string>();

    expect(linkedList.toArray()).toEqual([]);
    linkedList.push('a');
    linkedList.push('b');
    linkedList.push('c');
    expect(linkedList.toArray()).toEqual(['a','b','c']);
    linkedList.reverse();
    expect(linkedList.toArray()).toEqual(['c','b','a']);
  });

  test('getSize', () => {
    const linkedList = new LinkedList<boolean>();

    expect(linkedList.getSize()).toBe(0);
    linkedList.push(true);
    linkedList.push(true);
    linkedList.push(false);
    expect(linkedList.getSize()).toBe(3);
    linkedList.pop();
    expect(linkedList.getSize()).toBe(2);
    linkedList.delete(false);
    expect(linkedList.getSize()).toBe(2);
    linkedList.delete(true);
    expect(linkedList.getSize()).toBe(1);
  });

  test('getFirst', () => {
    const linkedList = new LinkedList<number>();

    expect(linkedList.getFirst()).toBe(null);
    linkedList.push(3);
    linkedList.push(6);
    linkedList.push(9);
    expect(linkedList.getFirst()).toBe(3);
  });

  test('getLast', () => {
    const linkedList = new LinkedList<string>();

    expect(linkedList.getLast()).toBe(null);
    linkedList.push('g');
    linkedList.push('t');
    linkedList.push('x');
    expect(linkedList.getLast()).toBe('x');
    linkedList.pop();
    expect(linkedList.getLast()).toBe('t');
  });

  test('clear', () => {
    const linkedList = new LinkedList<Array<boolean>>();

    expect(linkedList.getFirst()).toBe(null);
    linkedList.push([true, false, true]);
    linkedList.push([false, true, false]);
    linkedList.push([true, false, true]);
    expect(linkedList.toArray()).toEqual([[true, false, true], [false, true, false], [true, false, true]])
    linkedList.clear();
    expect(linkedList.toArray()).toEqual([]);
  });
});
