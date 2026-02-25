// Median
// Formula: middle value of a sorted dataset
// Usage: a better example is the median household income, which is less affected by extreme values compared to the mean.

const data = [3, 1, 4, 2, 5, 6, 8, 7, 9];

const getMedian = (data: number[]): number => {
  const sortedData = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sortedData.length / 2);

  return sortedData.length % 2 !== 0
    ? sortedData[mid]
    : (sortedData[mid - 1] + sortedData[mid]) / 2;
};

const median = getMedian(data);
console.log("Median:", median); // Output: Median: 5

export default {
  getMedian,
};
