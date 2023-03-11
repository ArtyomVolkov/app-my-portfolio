export const formatDuration = (value: number, multiplicity: number = 1) => {
  const timeValue = Math.floor(value / multiplicity);
  const minute = Math.floor(timeValue / 60);
  const secondLeft = timeValue - minute * 60;

  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
};

export const getImageSrc = (data: Array<{ url: string, width: number, height: number }>, maxSize = 300) => {
  return data.find((item) => (item.width <= maxSize || item.height <= maxSize))?.url;
};

export const getTrackArtists = (data: Array<{ name: string }>) => {
  return data.map(({ name }) => name).join(', ');
};
