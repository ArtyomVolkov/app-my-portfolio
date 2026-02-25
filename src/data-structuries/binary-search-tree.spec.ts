import { describe, expect, test } from '@jest/globals';
import BST from './binary-search-tree';

describe('BinarySearchTree', () => {
  test('insert', () => {
    const bst = new BST<number>();

    expect(bst.toArray()).toEqual([]);
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    expect(bst.toArray()).toEqual([5,3,7]);
    bst.insert(2);
    bst.insert(1);
    expect(bst.toArray()).toEqual([5,3,2,1,7]);
  });

  test('delete', () => {
    const bst = new BST();

    expect(bst.toArray()).toEqual([]);
    bst.insert(5);
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    bst.insert(9);
    bst.insert(2);
    expect(bst.find(3)?.value).toEqual(3);
    bst.delete(3);
    expect(bst.delete(11)).toEqual(false);
    expect(bst.find(3)).toEqual(null);
    expect(bst.toArray()).toEqual([5,7,9]);
    bst.delete(7);
    expect(bst.toArray()).toEqual([5]);
  });

  test('find', () => {
    const bst = new BST<number>();

    expect(bst.toArray()).toEqual([]);
    bst.insert(4);
    bst.insert(4);
    bst.insert(3);
    bst.insert(8);
    bst.insert(9);
    const node = bst.find(9);

    expect(node?.value).toEqual(9);
    expect(node?.parent?.value).toEqual(8);
    expect(node?.hasChildren()).toBeFalsy();
    expect(bst.find(11)).toEqual(null);
  });

  test('inOrderTraversal', () => {
    const bst = new BST<number>();

    expect(bst.toArray()).toEqual([]);
    bst.insert(6);
    bst.insert(3);
    bst.insert(8);
    bst.insert(9);
    bst.insert(4);
    bst.insert(2);
    expect(bst.toArray(true)).toEqual([2,3,4,6,8,9]);
  });

  test('getMin', () => {
    const bst = new BST<number>();

    expect(bst.getMin()).toBe(undefined)
    bst.insert(11);
    bst.insert(5);
    bst.insert(7);
    bst.insert(0);
    bst.insert(3);
    bst.insert(8);

    expect(bst.getMin()).toEqual(0);
    bst.delete(0);
    expect(bst.getMin()).toEqual(5);
  });

  test('getMax', () => {
    const bst = new BST<number>();

    expect(bst.getMax()).toBe(undefined);
    bst.insert(5);
    bst.insert(15);
    bst.insert(12);
    bst.insert(16);
    bst.insert(13);

    expect(bst.getMax()).toEqual(16);
  });
});
