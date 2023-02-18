import React, { useState } from 'react';

import Button from '@mui/material/Button';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import CircularProgress from '@mui/material/CircularProgress';

import styles from '../style.module.scss';

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
    <div className={styles.loadMore}>
      <Button
        variant="outlined"
        disabled={loading}
        onClick={onLoadMore}
        startIcon={loading ? <CircularProgress size={16} /> : <DownloadRoundedIcon />}
      >
        {
          loading ? 'Loading...' : 'Load more'
        }
      </Button>
    </div>
  );
}

export default LoadMore;
