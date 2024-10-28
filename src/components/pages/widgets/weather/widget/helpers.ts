export const fahrenheitToCelsius = (value, postfix = '°C') => {
  return Math.ceil((value-32)*(5/9)) + postfix;
};

export const getPercentage = (value: number) => {
  return Math.ceil(value) + '%';
}

export const getWindDirection = (i: number) => {
  const j = (i + 11.25) % 360;

  if (j <= 22.5) return +i + '° N';
  else if (j <= 45) return +i + '° NNE';
  else if (j <= 67.5) return +i + '° NE';
  else if (j <= 90) return +i + '° ENE';
  else if (j <= 112.5) return +i + '° E';
  else if (j <= 135) return +i + '° ESE';
  else if (j <= 157.5) return +i + '° SE';
  else if (j <= 180) return +i + '° SSE';
  else if (j <= 202.5) return +i + '° S';
  else if (j <= 225) return +i + '° SSW';
  else if (j <= 247.5) return +i + '° SW';
  else if (j <= 270) return +i + '° WSW';
  else if (j <= 292.5) return +i + '° W';
  else if (j <= 315) return +i + '° WNW';
  else if (j <= 337.5) return +i + '° NW';
  else return +i + '° NNW';
}