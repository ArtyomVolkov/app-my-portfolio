// Counting Sort Algorithm
// only works for non-negative integers

const countingSort = (arr: number[]): number[] => {
  if (arr.length === 0) {
    return [];
  }
  const result: number[] = [];
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  for (const num of arr) {
    count[num]++;
  }

  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      result.push(i);
      count[i]--;
    }
  }
  return result;
};

export default { countingSort };
