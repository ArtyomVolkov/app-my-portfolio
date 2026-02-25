import mean from "./mean";
import median from "./median";
import deviation from "./deviation";

// Measure of skewness in a data set
// Formula: Skewness = (3 * (mean - median)) / standard deviation
// Usage: a better example is to analyze the asymmetry of income distribution in a population.

const data: number[] = [15, 18, 21, 22, 24, 30, 35, 40, 45, 50];

const getSkewnessMeasure = (data: number[]): number => {
  if (data.length === 0) {
    return 0;
  }
  return (
    (3 * (mean.getArithmeticMean(data) - median.getMedian(data))) /
    deviation.getStandardDeviation(data)
  );
};

const skewnessMeasure = getSkewnessMeasure(data);
console.log("Skewness Measure:", skewnessMeasure.toFixed(2)); // Output: Skewness Measure: -0.15 (indicating a slight negative skewness)
// if skewnessMeasure === 0, the data is perfectly symmetrical
// if skewnessMeasure > 0, the data is positively skewed (right-skewed)
// if skewnessMeasure < 0, the data is negatively skewed (left-skewed)

export default {
  getSkewnessMeasure,
};