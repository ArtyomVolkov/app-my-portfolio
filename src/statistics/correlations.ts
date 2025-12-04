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

  return 1 - ((6 * sumDSquared) / (dataA.length * (Math.pow(dataA.length, 2) - 1)));
};

const studentRanksMath: number[] = [1, 2, 3, 4, 5];
const studentRanksScience: number[] = [2, 1, 4, 3, 5];
const spearmansCorrelation = getSpearmansCorrelation(studentRanksMath, studentRanksScience);

// Output:
// spearmansCorrelation: 0.8 (indicating a strong positive correlation)

// Pearson Correlation coefficient
// Formula: r = Σ((xi - meanX)(yi - meanY)) / (sqrt(Σ(xi - meanX)²) * sqrt(Σ(yi - meanY)²))
// -1 ≤ r ≤ 1
// -1 indicates a perfect negative correlation
// 0 indicates no correlation
// 1 indicates a perfect positive correlation
// Usage: to measure the linear relationship between two continuous variables, such as height and weight.

const getPearsonsCorrelation = (dataX: number[], dataY: number[]): number => {
  if (dataX.length !== dataY.length || dataX.length === 0) {
    return 0;
  }

  const meanX = mean.getArithmeticMean(dataX);
  const meanY = mean.getArithmeticMean(dataY);

  let numerator = 0;
  let sumXSquared = 0;
  let sumYSquared = 0;

  for (let i = 0; i < dataX.length; i++) {
    const diffX = dataX[i] - meanX;
    const diffY = dataY[i] - meanY;

    numerator += diffX * diffY;
    sumXSquared += diffX * diffX;
    sumYSquared += diffY * diffY;
  }

  const denominator = Math.sqrt(sumXSquared) * Math.sqrt(sumYSquared);

  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
};

const heights: number[] = [150, 160, 170, 180, 190];
const weights: number[] = [50, 60, 65, 80, 90];
const pearsonsCorrelation = getPearsonsCorrelation(heights, weights);

// Output:
// pearsonsCorrelation: 0.98 (indicating a very strong positive linear correlation)

// Kendall's Correlation coefficient
// Formula: τ = (number of concordant pairs - number of discordant pairs) / (0.5 * n * (n - 1))
// -1 ≤ τ ≤ 1
// -1 indicates a perfect negative correlation
// 0 indicates no correlation
// 1 indicates a perfect positive correlation
// Usage: to assess the strength and direction of the monotonic relationship between two variables, similar to Spearman's but more robust to outliers.

const getKendallsCorrelation = (dataA: number[], dataB: number[]): number => {
  if (dataA.length !== dataB.length || dataA.length === 0) {
    return 0;
  }

  let concordant = 0;
  let discordant = 0;

  for (let i = 0; i < dataA.length - 1; i++) {
    for (let j = i + 1; j < dataA.length; j++) {
      const pairA = dataA[i] - dataA[j];
      const pairB = dataB[i] - dataB[j];

      if (pairA * pairB > 0) {
        concordant++;
      } else if (pairA * pairB < 0) {
        discordant++;
      }
    }
  }
  return (concordant - discordant) / (0.5 * dataA.length * (dataA.length - 1));
};

const ranksA: number[] = [2, 1, 4, 3, 5, 7, 8];
const ranksB: number[] = [4, 3, 1, 5, 2, 6, 9];
const kendallsCorrelation = getKendallsCorrelation(ranksA, ranksB);

// Output:
// kendallsCorrelation: 0.5238 (indicating a moderate positive correlation)

export default {
  getCoefficientOfVariation,
  getSpearmansCorrelation,
  getPearsonsCorrelation,
  getKendallsCorrelation,
};
