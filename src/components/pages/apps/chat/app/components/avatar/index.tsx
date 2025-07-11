import React, { useEffect, useState } from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

type AvatarProps = {
  size?: number;
  url?: string;
  className?: string;
  placeholder?: boolean;
}

const PlaceholderImage = 'https://static.thenounproject.com/png/363640-200.png';

const Avatar: React.FC<AvatarProps> = ({size = 40, url,  placeholder = true, className}) => {
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
      <img src={url || (placeholder && PlaceholderImage)} alt="avatar" onLoad={onLoad} onError={onError}/>
    </div>
  );
};

export default Avatar;