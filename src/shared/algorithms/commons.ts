// Implement a function sum that can be called in a chained manner to sum numbers.
// Each call to sum with a number adds that number to the total sum.
// When sum is called without any arguments, it returns the total sum.

// Example usage:
// sum(1)(2)(3)() => 6
// sum(2)(3)(4)(-1)() => 8
// sum(5)(10)(3)() => 18

const sum = (n: number) => {
  let value = n;

  const calc = (m?: number): any => {
    if (m === undefined) {
      return value;
    }
    value += m;
    return calc;
  }
};

// function add(a: number, b: number, c: number): number => f(a)(b)(c)
// curry function => addCurry(a)(b)(c): number => number

// const add = (a: number, b: number, c: number): number => {
//   return a + b + c;
// };

type JSONValue = string | number | boolean | { [key: string]: JSONValue } | Array<JSONValue> | null;

// transform add to curried version
const toCurry = (fn: Function) => {
  return function curried(...args: JSONValue[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function (...args2: JSONValue[]) {
      return curried(...args, ...args2);
    };
  }
};

// const addCurry = toCurry(add);
// addCurry(1)(2)(3) => 6

export default {
  sum,
  toCurry,
};
