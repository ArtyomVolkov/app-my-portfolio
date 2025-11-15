// Arithmetic mean
// Formula: X̄ = (x1 + x2 + ... + xn) / n
// Usage: a better example is the population of the income nation.
const data = [2, 8, 3, 7, 4, 10, 6, 5, 9, 1, 0];

const getArithmeticMean = (data: number[]): number => {
  return data.reduce((sum, value) => sum + value, 0) / data.length;
};
const arithmeticMean = getArithmeticMean(data);

// Weighted mean
// Formula: X̄w = (w1*x1 + w2*x2 + ... + wn*xn) / (w1 + w2 + ... + wn), where values leingth = weights length
// Usage: a better example is the student grades with different credits,
// or in finance, to calculate things like weighted average cost or portfolio returns.

const values = [85, 90, 78, 92];
const weights = [3, 4, 2, 1];

const getWeightedMean = (
  values: number[],
  weights: number[]
): number => {
  return (
    values.reduce((sum, value, index) => sum + value * weights[index], 0) /
    weights.reduce((sum, weight) => sum + weight, 0)
  );
};
const weightedMean = getWeightedMean(values, weights);

// Harmonic mean
// Formula: X̄h = n / (1/x1 + 1/x2 + ... + 1/xn)
// Usage: a better example is average speed when traveling the same distance at different speeds.

const speeds = [60, 80, 100, 75, 90, 40];

const getHarmonicMean = (data: number[]): number => {
  return data.length / data.reduce((sum, value) => sum + 1 / value, 0);
};
const harmonicMean = getHarmonicMean(speeds);

// Geometric mean
// Formula: X̄g = (x1 * x2 * ... * xn)^(1/n)
// Usage: a better example is average growth rates over time, such as population growth or investment returns.
const growthRates = [1.05, 1.1, 1.08, 1.12, 1.07];

const getGeometricMean = (data: number[]): number => {
  return Math.pow(
    data.reduce((product, value) => product * value, 1),
    1 / data.length
  );
};
const geometricMean = getGeometricMean(growthRates);

export default {
  getArithmeticMean,
  getWeightedMean,
  getHarmonicMean,
  getGeometricMean,
};
