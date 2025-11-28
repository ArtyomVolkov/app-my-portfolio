import mean from "./mean";
import deviation from "./deviation";

// coefficient of variations
// Formula: CV = (SD / mean) * 100
// Usage: a better example is to compare the relative variability of test scores from different exams.

const testScoresA: number[] = [85, 90, 78, 92, 88, 76, 95, 89, 84, 91];
const testScoresB: number[] = [70, 75, 80, 85, 90, 95, 100, 105, 110, 115];

const getCoefficientOfVariation = (data: number[]): number => {
  if (data.length === 0) {
    return 0;
  }

  const meanValue = mean.getArithmeticMean(data);
  if (meanValue === 0) {
    return 0;
  }
  return (deviation.getStandardDeviation(data) / meanValue) * 100;
};

// Example usage:
const cvTestScoresA = getCoefficientOfVariation(testScoresA);
const cvTestScoresB = getCoefficientOfVariation(testScoresB);

// Output:
// cvTestScoresA: 6.24 (indicating lower relative variability)
// cvTestScoresB: 15.81 (indicating higher relative variability)

// Correlations coefficients: Pearson, Spearman, Kendall


export default {
  getCoefficientOfVariation,
};
