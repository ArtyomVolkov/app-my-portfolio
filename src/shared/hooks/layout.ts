import { useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

import { DEBOUNCE_DELAY } from '@shared/constants/commons';

export const useResizeChange = (callback) => {
  const onChangeResizeDebounce = useCallback(debounce((e) => {
    callback(e.target.innerWidth);
  }, DEBOUNCE_DELAY), []);

  useEffect(() => {
    window.addEventListener('resize', onChangeResizeDebounce);

    return () => {
      window.removeEventListener('resize', onChangeResizeDebounce);
    }
  }, []);
};
