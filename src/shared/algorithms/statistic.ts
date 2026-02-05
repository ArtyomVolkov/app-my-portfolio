/*
   R = [n(Σxy) − ΣxΣy] / √[n(Σx²) − (Σx)²][n(Σy²) − (Σy)²]
 */
export const getPearsonCorrelation = (x: Array<number>, y: Array<number>): number => {
  if (x.length < 5 || y.length < 5) {
    throw Error('The sample size is too small to allow a reliable calculation');
  }
  if (x.length !== y.length) {
    throw Error('Items count of x should be equal to y');
  }
  const getMean = (data: Array<number>) => {
    return data.reduce((acc, item) => {
      acc += item;
      return acc;
    }, 0) / data.length;
  };

  const [xMean, yMean] = [getMean(x), getMean(y)];
  let [num, dx, dy] = [0, 0, 0];

  for (let i = 0; i < x.length; i++) {
    let xDiff = x[i] - xMean;
    let yDiff = y[i] - yMean;

    num += (xDiff * yDiff);
    dx += Math.pow(xDiff, 2);
    dy += Math.pow(yDiff, 2);
  }
  return +(num / Math.sqrt(dx * dy)).toFixed(3);
};