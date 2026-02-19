import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { mergeClassNames } from '@utils/common';

import styles from '../style.module.scss';

const ImageCard = ({ data, onPreview }) => {
  const [loading, setLoading] = useState(true);

  const onLoadImage = () => {
    setLoading(false);
  };

  const onErrorImage = () => {
    setLoading(false);
  };

  return (
    <section
      className={mergeClassNames([styles.card, loading && styles.loading])}
      onClick={() => onPreview(data)}
      title={data.alt}
    >
      {
        loading && (
          <div className={styles.loadingWrap}>
            <CircularProgress />
          </div>
        )
      }
      <img
        alt={data.alt}
        src={data.src.large}
        onLoad={onLoadImage}
        onError={onErrorImage}
      />
    </section>
  );
}

export default ImageCard;
