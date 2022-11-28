/*
  [1 2 3]
  [4 5 6]
  [7 8 9]
   [ 0 ]
 */
// 1 => [2,4]
// 5 => [2,4,6,8]
// 11 => [22, 44]
// 12 => [21, 23, 25, 41, 45]

const data = [
  [1,  2,  3],  // 1, 2, 0
  [4,  5,  6],
  [7,  8,  9],
  [ 0 ]
];

// [2,4]  [1,3,5]  [2,6]  =>
// 123

const linkedList =  {
  0: [8],
  1: [2,4],
  2: [1,3,5],
  3: [2,6],
  4: [1,5,7],
  5: [2,4,6,8],
  6: [3,5,9],
  7: [4,8],
  8: [5,7,9,0],
  9: [6,8]
}

const getParents = (n) => {
  const str = String(n);

  if (str.length === 1) {
    return linkedList[n];
  }

  const variants = [n];
  str.split('').forEach((i, j) => {
    linkedList[i].forEach((b) => {

      variants.push(`${b}${j}`)
    })
  });
  return variants;
};

console.log(getParents(12));