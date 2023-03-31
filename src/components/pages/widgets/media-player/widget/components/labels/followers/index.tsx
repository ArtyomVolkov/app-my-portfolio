import React from 'react';

interface IFollowers {
  value: number,
  format?: string,
}

const Followers: React.FC<IFollowers> = ({ value, format  }) => {
  if (Number.isNaN(value)) {
    return null;
  }
  return (
    <span>{ `${value.toLocaleString(format)}`  + ' Followers' }</span>
  );
}

export default Followers;
