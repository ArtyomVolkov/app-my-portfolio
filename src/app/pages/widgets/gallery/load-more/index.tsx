import React, { useState } from 'react';

import Button from '@shared/components/ui-kit/button';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import styles from '../style.module.scss';

interface ILoadMore {
  hasMore: boolean;
  loading?: boolean;
  onRequestLoad: () => Promise<void>;
}

const LoadMore: React.FC<ILoadMore> = ({ hasMore, onRequestLoad }) => {
  const [loading, setLoading] = useState(false);

  const onLoadMore = async () => {
    setLoading(true);
    await onRequestLoad();
    setLoading(false);
  };

  if (!hasMore) {
    return null;
  }

  return (
    <div className={styles.loadMore}>
      <Button
        variant="outlined"
        color="primary"
        disabled={loading}
        loading={loading}
        onClick={onLoadMore}
        startIcon={<DownloadRoundedIcon />}
      >
        Load more
      </Button>
    </div>
  );
};

export default LoadMore;
