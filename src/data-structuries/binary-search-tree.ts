type TreeTypeData = number | string;

class TreeNode<T = TreeTypeData> {
  left: TreeNode|null;
  right: TreeNode|null;
  parent: TreeNode|null;
  value: T;

  constructor(value, parent = null) {
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
  private root: TreeNode|null;

  constructor() {
    this.root = null;
  }

  *inOrderTraversal(node = this.root) {
    if (node.left) {
      yield* this.inOrderTraversal(node.left);
    }
    yield node;

    if (node.right) {
      yield* this.inOrderTraversal(node.right);
    }
  }

  *preOrderTraversal(node = this.root) {
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

  find(value: TreeTypeData): TreeNode|null {
    for (let node of this.preOrderTraversal()) {
      if (node.value === value) {
        return node;
      }
    }
    return null;
  }

  getMin(): TreeTypeData|undefined {
    let current: TreeNode|null = this.root;

    if (!current) {
      return undefined;
    }
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  getMax(): TreeTypeData|undefined {
    let current = this.root;

    if (!current) {
      return undefined;
    }
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }

  toArray(inOrder = false): Array<TreeTypeData> {
    const values = [];
    const iterator = inOrder ? this.inOrderTraversal() : this.preOrderTraversal();

    for (const node of iterator) {
      values.push(node.value);
    }
    return values;
  }
}

export default BinarySearchTree;