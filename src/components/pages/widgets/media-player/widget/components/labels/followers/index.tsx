import React from 'react';

interface IFollowers {
  value: number,
  format?: string,
}

const Followers: React.FC<IFollowers> = ({ value, format = 'en' }) => {
  if (Number.isNaN(value)) {
    return null;
  }
  return (
    <span>{ new Intl.NumberFormat(format).format(value)  + ' Followers' }</span>
  );
}

export default Followers;
