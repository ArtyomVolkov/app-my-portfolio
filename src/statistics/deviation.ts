// Mean Absolute Deviation
// Formula: MAD = (1/n) * Σ |xi - mean| for i = 1 to n
// Usage: a better example is to measure the variability of daily temperatures over a month.

const data: number[] = [20, 16, 22, 19, 24, 18, 21, 17, 23, 20];

const getAbsoluteDeviation = (data: number[]): number => {
  if (data.length === 0) {
    return 0;
  }
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;

  return (
    data.reduce((sum, value) => sum + Math.abs(value - mean), 0) / data.length
  );
};

// Standard Deviation (SD)
// Formula: SD = sqrt((1/n) * Σ (xi - mean)²) for i = 1 to n
// Usage: a better example is to assess the volatility of stock prices over a certain period.

const getStandardDeviation = (data: number[]): number => {
  if (data.length === 0) {
    return 0;
  }
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
  const variance =
    data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
    data.length;

  return Math.sqrt(variance);
};

export default {
  getAbsoluteDeviation,
  getStandardDeviation,
};
