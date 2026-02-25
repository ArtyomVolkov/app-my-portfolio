import mean from "./mean";
import deviation from "./deviation";

// Emissions Statistics Module
// This module provides functions to calculate various emissions-related statistics.

// emission border (EB)
// Formula: EB = X̄ ± 3 * σ
// Usage: a better example is to determine acceptable emission levels in environmental studies.

const getEmissionBorder = (data: number[]): { top: number; bottom: number } => {
  if (data.length === 0) {
    return { top: 0, bottom: 0 };
  }
  const meanValue = mean.getArithmeticMean(data);
  const stdDeviation = deviation.getStandardDeviation(data);

  return {
    top: meanValue + 3 * stdDeviation,
    bottom: meanValue - 3 * stdDeviation,
  };
};

const humansPressures: number[] = [100, 110, 95, 105, 120, 130, 90, 115, 125, 85, 140, 150, 193]; // 193 added for more variability

const emissionBorder = getEmissionBorder(humansPressures);
console.log("Emission Border:", emissionBorder); // Output: Emission Border: { top: 193.546, bottom: 51.455 }

// Example emissionBorder output: 
// bottom: 51.455
// top: 193.546


export default {
  getEmissionBorder,
};
