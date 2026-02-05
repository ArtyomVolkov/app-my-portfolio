export const mergeClassNames = (classNames = []) =>
  classNames.filter((item) => item).join(" ");

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!bytes) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getQueryParams = () => {
  const hash = location.search.replace("?", "").split("&");

  return hash.reduce((previous, current) => {
    const [key, value] = current.split("=");

    if (!key) {
      return previous;
    }

    previous[key] = value;
    return previous;
  }, {});
};

export const getErrorMessage = (error) => {
  if (error?.message) {
    return error.message;
  }
  if (error?.data?.message) {
    return error.data.message;
  }
  return "Something went wrong";
};

export const toTimeInWords = (h: number, m: number): string => {
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twenty one",
    "twenty two",
    "twenty three",
    "twenty four",
    "twenty five",
    "twenty six",
    "twenty seven",
    "twenty eight",
    "twenty nine",
    "thirty",
  ];
  const toMinutes = (value: number) => `minute${value > 1 ? "s" : ""}`;

  if (!m) {
    return `${numbers[h - 1]} o' clock`;
  }
  if (m === 30) {
    return `half past ${numbers[h - 1]}`;
  }
  let [hours, minutes, upTo] = [h - 1, m, "past"];

  if (m > 30) {
    hours = h;
    minutes = 60 - m;
    upTo = "to";
  }

  if (minutes === 15) {
    return `quarter ${upTo} ${numbers[hours]}`;
  }
  return `${numbers[minutes - 1]} ${toMinutes(minutes)} ${upTo} ${
    numbers[hours]
  }`;
};

export const isPrimeNumber = (num: number): boolean => {
  let div = 2;

  while (div < num) {
    if (num % div === 0) {
      return false;
    }
    div++;
  }
  return true;
};

export const getFibonacci = (val: number): number[] => {
  const output = [0, 1];

  for (let i = 2; i < val; i++) {
    output.push(output[i - 1] + output[i - 2]);
  }
  return output;
};

export const getFactorial = (num: number): number => {
  if (num === 0) return 1;
  let val = 1;

  for (let i = 1; i <= num; i++) {
    val *= i;
  }
  return val;
};

// find frequently occurring number in an array
export const findFON = (arr: number[]): number => {
  const km = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;

    return acc;
  }, {});

  return Object.keys(km).reduce(
    (acc, val) => {
      if (km[val] > acc[1]) {
        return [+val, km[val]];
      }
      return acc;
    },
    [null, 0]
  )[0];
};

export const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};