class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const toListNode = (arr: number[]): ListNode | null => {
  let linkedList: ListNode | null = null;

  arr.forEach((item) => {
    const node = new ListNode(item);

    node.next = linkedList;
    linkedList = node;
  });
  return linkedList;
};

const toArray = (ln: ListNode | null): number[] => {
  const arr: number[] = [];
  let cursor = ln;

  while (cursor) {
    arr.push(cursor.val);
    cursor = cursor.next;
  }
  return arr;
};

const addTwoNumbers = (
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null => {
  let ln: ListNode = new ListNode(0);
  let rest = 0;
  let cursor = ln;

  while (l1 || l2 || rest) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + rest;
    const node = new ListNode(sum % 10);
    rest = Math.floor(sum / 10);

    cursor.next = node;
    cursor = cursor.next;

    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  return ln.next;
};

const L1 = [2, 4, 3];
const L2 = [5, 6, 4];
let l1 = toListNode(L1);
let l2 = toListNode(L2);
addTwoNumbers(l1, l2); // [7,0,8]

export { ListNode, addTwoNumbers, toArray };
