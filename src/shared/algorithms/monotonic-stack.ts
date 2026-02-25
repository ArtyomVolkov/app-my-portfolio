// Monotonic stack: A stack that maintains its elements in a specific order (either increasing or decreasing).
// Commonly used for problems involving next greater/smaller elements, histogram area calculations, etc.
// Can help to decrease time complexity from O(n^2) to O(n) for certain problems.

class MonotonicStack {
  nextGreaterElements(arr: number[]): number[] {
    const result: number[] = new Array(arr.length).fill(-1);
    const stack: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
        const index = stack.pop()!;
        result[index] = arr[i];
      }
      stack.push(i);
    }
    return result;
  }

  nextSmallerElements(arr: number[]): number[] {
    const result: number[] = new Array(arr.length).fill(-1);
    const stack: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      while (stack.length && arr[i] < arr[stack[stack.length - 1]]) {
        const index = stack.pop()!;
        result[index] = arr[i];
      }
      stack.push(i);
    }
    return result;
  }
}

export default MonotonicStack;

// Example usage:
// Final Prices With a Special Discount in a Shop
// There is a special discount for items in the shop. If you buy the ith item,
// then you will receive a discount equivalent to prices[j] where j is the minimum
// index such that j > i and prices[j] <= prices[i]. Otherwise, you will not receive any discount at all.


// finalPrices
// Input: prices = [8,4,6,2,3]
// Output: [4,2,4,2,3]

function finalPrices(prices: number[]): number[] {
  const output = [...prices];
  const stack: number[] = [];

  for (let i = 0; i < prices.length; i++) {
    while(stack.length > 0 && prices[i] <= prices[stack[stack.length-1]]) {
      const stackIndex = stack.pop()!;
      output[stackIndex] = prices[stackIndex]-prices[i];
    }
    stack.push(i);
  }
  return output;
};

finalPrices([8,4,6,2,3]); // [4,2,4,2,3]

// input  [73, 74, 75, 71, 69, 72, 76, 73]
// output [1,  1,  4,  2,  1,  1,  0,  0]
export const dailyTemperatures = (temperatures: number[]): number[] => {
    const result: number[] = new Array(temperatures.length).fill(0);
    const stack: number[] = [];

    for (let i = 0; i < temperatures.length; i++) {
      while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
        const index = stack.pop()!;

        result[index] = i - index;
      }
      stack.push(i);
    }
    return result;
};
