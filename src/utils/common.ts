export const mergeClassNames = (classNames = []) => classNames.filter((item) => item).join(' ');

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!bytes) {
    return '0 Bytes';
  }
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const dateFormat = (date: string, locale = 'en-US') => {
  if (!date) {
    return;
  }
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const getErrorMessage = (error, errorMap?: { [key: string]: string }) => {
  if(errorMap?.[error?.code]) {
    return errorMap[error.code];
  }
  if (error?.message) {
    return error.message;
  }
  if (error?.data?.message) {
    return error.data.message;
  }
  return 'Something went wrong';
}