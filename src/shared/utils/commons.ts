const fibonacci = (n) => {
  const list =  Array(n).fill(0);

  list.forEach((item, index) => {
    if (index < 2) {
      list[index] = index;
      return;
    }
    list[index] = list[index-2] + list[index-1];
  });
  return list;
};
// fibonacci(7); => [0, 1, 1, 2, 3, 5, 8]


// factorial in function style  /n! = n * (n-1)...1
const factorial = (value) => {
  if (value <= 0) {
    return 0;
  }
  return Array(value).fill(0).map((item,index) => value-index).reduce((acc, cur) => {
    acc = acc*cur;
    return acc;
  }, 1);
};

// memo function
const memo = (() => {
  const cache = {};

  return (func, ...args) => {
    const key = `${func.name}:${JSON.stringify(args)}`;

    if (key in cache) {
      return cache[key];
    }
    cache[key] = func(...args);

    return cache[key];
  }
})();
//memo(factorial, 20);

const requestMock = (success: boolean = true, timer = 1000, data?: unknown) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
       success ? res(data) : rej(data);
    }, timer);
  });
};

const pool = [
  requestMock.bind(null, true, 1500, { value: 1 }),
  requestMock.bind(null, true, 2000, { value: 2 }),
  requestMock.bind(null, true, 1000, { value: 3 }),
  requestMock.bind(null, true, 3000, { value: 4 }),
  requestMock.bind(null, true, 5000, { value: 5 }),
];

// async iterator
const iterator = async (requests: Array<Function>) => {
  for (let i = 0; i < requests.length; i++) {
    console.log(await requests[i]());
  }
};

// iterator(pool).finally();
// => value: 1 ... 5 with an interval
