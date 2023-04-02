export const formatDuration = (value: number) => {
  const minutes = Math.floor((value % 3600000) / 60000);
  const seconds = Math.floor(((value % 360000) % 60000) / 1000);

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const getImageSrc = (data: Array<{ url: string, width: number, height: number }>, maxSize = 300) => {
  return data.find((item) => (item.width <= maxSize || item.height <= maxSize))?.url;
};

export const getTrackArtists = (data: Array<{ name: string }>) => {
  return data.map(({ name }) => name).join(', ');
};

export const getRotePaths = (pathname: string) => {
  const paths = pathname.split('/');
  const pmIndex = paths.indexOf('media-player');

  return paths.filter((item,  index) => index > pmIndex);
}
