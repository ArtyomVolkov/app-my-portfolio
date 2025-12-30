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
<<<<<<< HEAD
  return 'Something went wrong';
}

export const toTimeInWords = (h: number, m: number): string => {
  const numbers = [
    'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
    'twenty one', 'twenty two', 'twenty three', 'twenty four', 'twenty five',
    'twenty six', 'twenty seven', 'twenty eight', 'twenty nine', 'thirty',
  ];
  const toMinutes = (value: number) => `minute${value > 1 ? 's' : ''}`;

  if (!m) {
    return `${numbers[h - 1]} o' clock`;
  }
  if (m === 30) {
    return `half past ${numbers[h - 1]}`
  }
  let [hours, minutes, upTo] = [h - 1, m, 'past'];

  if (m > 30) {
    hours = h;
    minutes = 60 - m;
    upTo = 'to'
  }

  if (minutes === 15) {
    return `quarter ${upTo} ${numbers[hours]}`;
  }
  return `${numbers[minutes - 1]} ${toMinutes(minutes)} ${upTo} ${numbers[hours]}`;
}
=======
  return "Something went wrong";
};
>>>>>>> b3662e5f8f0cf20cdf999392943e2431b3fb35e6
