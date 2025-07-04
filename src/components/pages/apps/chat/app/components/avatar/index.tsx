import React, { useEffect, useState } from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

type AvatarProps = {
  size?: number;
  url?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({size = 40, url, className}) => {
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (url) {
      setLoading(true)
    }
  }, [url]);

  const onLoad = () => {
    setLoading(false);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <div
      className={mergeClassNames([
        styles.chatAppAvatar,
        loading && styles.loading,
        error && styles.error,
        className
      ])}
      style={{
        width: size,
        height: size,
      }}
    >
      {
        url && <img src={url} alt="avatar" onLoad={onLoad} onError={onError}/>
      }
    </div>
  );
};

export default Avatar;