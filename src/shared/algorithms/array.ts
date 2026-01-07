// [4,3,2,1] => [4,3,2,2]
// [9,9,9] => [1,0,0,0]
const plusOne = (digits: number[]): number[] => {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i] += 1;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);

  return digits;
};

const repeatedNTimes = (arr: number[]): number => {
  const len = arr.length;
  const countMap: Record<number, number> = {};

  for (let i = 0; i < len; i++) {
    const num = arr[i];
    countMap[num] = (countMap[num] || 0) + 1;

    if (countMap[num] > len / 2) {
      return num;
    }
  }
  return -1;
};

// O(log (m+n))
export const findMedianSortedArrays = (
  nums1: number[],
  nums2: number[]
): number => {
  const merge = [];
  let [i, j, m, n] = [0, 0, nums1.length, nums2.length];

  while (i < m && j < n) {
    if (nums1[i] < nums2[j]) {
      merge.push(nums1[i]);
      i++;
    } else {
      merge.push(nums2[j]);
      j++;
    }
  }

  while (i < m) {
    merge.push(nums1[i]);
    i++;
  }

  while (j < n) {
    merge.push(nums2[j]);
    j++;
  }

  const mid = Math.floor(merge.length / 2);

  if (!(merge.length % 2)) {
    return (merge[mid - 1] + merge[mid]) / 2;
  }
  return merge[mid];
};
