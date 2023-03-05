export const formatDuration = (value: number, multiplicity: number = 1) => {
  const timeValue = Math.floor(value / multiplicity);
  const minute = Math.floor(timeValue / 60);
  const secondLeft = timeValue - minute * 60;

  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
};