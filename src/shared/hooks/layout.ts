import { useEffect } from 'react';
import debounce from 'lodash/debounce';

import { DEBOUNCE_DELAY } from '@shared/constants/commons';

export const useResizeChange = (callback: (width: number) => void) => {
  const onChangeResizeDebounce = debounce((e) => {
    callback(e.target.innerWidth);
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    callback(window.innerWidth);

    window.addEventListener('resize', onChangeResizeDebounce);

    return () => {
      window.removeEventListener('resize', onChangeResizeDebounce);
    }
  }, []);
};
