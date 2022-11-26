import { useEffect, useState } from 'react';

export const useResizeChange = () => {
  const [small] = useState(false);

  useEffect(() => {
    console.log('change width');

  }, [window.innerWidth]);

  return small;
};