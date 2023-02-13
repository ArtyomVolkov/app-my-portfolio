import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

const LoadMore = ({ hasMore }) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="load-more">
      <CircularProgress size={21} className="loader" />
      <span>Load more...</span>
    </div>
  );
}

export default LoadMore;
