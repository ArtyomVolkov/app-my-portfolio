import React, { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

import CircularProgress from '@mui/material/CircularProgress';

interface ILoadMore {
  hasMore: boolean,
  loading?: boolean,
  onRequestLoad: () => void,
}

const LoadMore: React.FC<ILoadMore> = ({ hasMore, loading, onRequestLoad }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', onScrollDebounce, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollDebounce);
    }
  }, []);

  useEffect(() => {
    scrollTopOffset();
  }, [loading]);

  const scrollTopOffset = () => {
    if (loading || !elementRef.current) {
      return;
    }
    window.scrollTo({
      top: window.scrollY - elementRef.current.clientHeight,
      behavior: 'smooth'
    });
  }

  const onCheckIsVisibleView = () => {
    if (!elementRef.current) {
      return;
    }
    const rect = elementRef.current.getBoundingClientRect();
    const visible = rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

    if (visible && !loading) {
      onRequestLoad()
    }
  };

  const onScroll = () => {
    onCheckIsVisibleView();
  };

  const onScrollDebounce = debounce(onScroll, 200, { leading: false, trailing: true });

  if (!hasMore) {
    return null;
  }

  return (
    <div className="load-more" ref={elementRef}>
      <CircularProgress size={21} className="loader" />
      <span>Load more...</span>
    </div>
  );
}

export default LoadMore;
