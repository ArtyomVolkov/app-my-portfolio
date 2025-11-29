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

// Spearman's Correlation coefficient
// Formula: ρ = 1 - ( (6 * Σd²) / (n(n² - 1)) )
// -1 ≤ ρ ≤ 1
// -1 indicates a perfect negative correlation
// 0 indicates no correlation
// 1 indicates a perfect positive correlation
// Usage: to assess the strength and direction of the monotonic relationship between two variables, such as students' ranks in two different subjects.

const getRank = (data: number[]): number[] => {
  const sorted = Array.from(data).sort((a, b) => a - b);

  return data.map(value => sorted.indexOf(value) + 1);
};

const getSpearmansCorrelation = (dataA: number[], dataB: number[]): number => {
  if (dataA.length !== dataB.length || dataA.length === 0) {
    return 0;
  }

  const rankA = getRank(dataA);
  const rankB = getRank(dataB);
  const dSquared = rankA.map((rank, i) => Math.pow(rank - rankB[i], 2));
  const sumDSquared = dSquared.reduce((acc, val) => acc + val, 0);

  return 1 - ( (6 * sumDSquared) / (dataA.length * (Math.pow(dataA.length, 2) - 1)) );
};

const studentRanksMath: number[] = [1, 2, 3, 4, 5];
const studentRanksScience: number[] = [2, 1, 4, 3, 5];
const spearmansCorrelation = getSpearmansCorrelation(studentRanksMath, studentRanksScience);

// Output:
// spearmansCorrelation: 0.8 (indicating a strong positive correlation)

export default {
  getCoefficientOfVariation,
  getSpearmansCorrelation,
};
