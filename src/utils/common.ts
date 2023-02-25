export const mergeClassNames = (classNames = []) => classNames.filter((item) => item).join(' ');

export const getCookies = () => {
  return document.cookie.split(';').reduce((prev, cur) => {
    const [key, value] = cur.split('=');

    if (key) {
      prev[key] = value;
    }
    return prev;
  }, {});
};
