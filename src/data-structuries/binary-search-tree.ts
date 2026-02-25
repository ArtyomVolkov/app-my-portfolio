/*
 *  A Binary Search Tree (BST) is a hierarchical data structure that follows the binary tree property: for each node,
 *  all elements in its left subtree are less than the node, and all elements in its right subtree are greater.
 */
type TreeTypeData = number | string;

class TreeNode<T = TreeTypeData> {
  left: TreeNode<T>|null;
  right: TreeNode<T>|null;
  parent: TreeNode<T>|null;
  value: T;

  constructor(value: T, parent: TreeNode<T>|null = null) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.parent = parent;
  }

  hasChildren(): boolean {
    return Boolean(this.left || this.right);
  }
}

class BinarySearchTree<T = TreeTypeData> {
  private root: TreeNode<T>|null;

  constructor() {
    this.root = null;
  }

  // Complexity: O(n)
  *inOrderTraversal(node: TreeNode<T>|null = this.root): IterableIterator<TreeNode<T>> {
    if (!node) {
      return;
    }
    yield node;

    if (node.left) {
      yield* this.inOrderTraversal(node.left);
    }
    if (node.right) {
      yield* this.inOrderTraversal(node.right);
    }
  }

  // Complexity: O(n)
  *preOrderTraversal(node: TreeNode<T>|null = this.root): IterableIterator<TreeNode<T>> {
    if (!node) {
      return;
    }
    yield node;

    if (node.left) {
      yield* this.preOrderTraversal(node.left);
    }
    if (node.right) {
      yield* this.preOrderTraversal(node.right);
    }
  }

  // Complexity: O(log n) O(log n) or O(n)
  insert(value: T) {
    if (!this.root) {
      this.root = new TreeNode(value);
      return;
    }

    let current = this.root;

    while(true) {
      if (value === current.value) {
        return;
      }
      if (value < current.value) {
        if (current.left === null) {
          current.left = new TreeNode(value, current);
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new TreeNode(value, current);
          return;
        }
        current = current.right;
      }
    }
  }

  // Complexity: O(log n) or O(n)
  delete(value: TreeTypeData): boolean {
    for (let node of this.inOrderTraversal()) {
      if (node.left?.value === value) {
        node.left = null;
        return true;
      }
      if (node.right?.value === value) {
        node.right = null;
        return true;
      }
    }
    return false;
  }

  // Complexity: O(log n) or O(n)
  find(value: TreeTypeData): TreeNode<T>|null {
    for (let node of this.preOrderTraversal()) {
      if (node.value === value) {
        return node;
      }
    }
    return null;
  }

  // Complexity: O(log n) or O(n)
  getMin(): TreeTypeData|undefined {
    let current: TreeNode<T>|null = this.root;

    if (!current) {
      return undefined;
    }
    while (current.left) {
      current = current.left;
    }
    return current.value as TreeTypeData;
  }

  // Complexity: O(log n) or O(n)
  getMax(): TreeTypeData|undefined {
    let current: TreeNode<T>|null = this.root;

    if (!current) {
      return undefined;
    }
    while (current.right) {
      current = current.right;
    }
    return current.value as TreeTypeData;
  }

  toArray(inOrder = false): Array<TreeTypeData> {
    const values = [];
    const iterator = inOrder ? this.inOrderTraversal() : this.preOrderTraversal();

    for (const node of iterator) {
      values.push(node.value);
    }
    return values as Array<TreeTypeData>;
  }
}

export default BinarySearchTree;