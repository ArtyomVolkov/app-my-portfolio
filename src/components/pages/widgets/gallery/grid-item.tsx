import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { mergeClassNames } from '@utils/common';

const GridItem = ({ data }) => {
  const [loading, setLoading] = useState(true);

  const onLoadImage = () => {
    setLoading(false);
  };

  const onErrorImage = () => {
    setLoading(false);
  };

  return (
    <section className={mergeClassNames(['card', loading && 'loading'])}>
      {
        loading && (
          <div className="loading-wrap">
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

export default GridItem;
