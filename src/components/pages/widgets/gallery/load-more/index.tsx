import React, { useState } from 'react';

import Button from '@mui/material/Button';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import CircularProgress from '@mui/material/CircularProgress';

interface ILoadMore {
  hasMore: boolean,
  loading?: boolean,
  onRequestLoad: () => void,
}

const LoadMore: React.FC<ILoadMore> = ({ hasMore, onRequestLoad }) => {
  const [loading, setLoading] = useState(false);

  const onLoadMore = async () => {
    setLoading(true);

    setTimeout(async () => {
      await onRequestLoad();
      setLoading(false);
    }, 1000);
  }

  if (!hasMore) {
    return null;
  }

  return (
    <div className="load-more">
      <Button
        variant="outlined"
        disabled={loading}
        onClick={onLoadMore}
        startIcon={loading ? <CircularProgress size={16} className="loader" /> : <DownloadRoundedIcon />}
      >
        {
          loading ? 'Loading...' : 'Load more'
        }
      </Button>
    </div>
  );
}

export default LoadMore;
