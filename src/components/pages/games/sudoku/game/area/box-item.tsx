import React from 'react';

import { mergeClassNames } from '@utils/common';

interface BoxItem {
  active: boolean,
  filled: number,
  origin: number
  value: number,
  onPress: (data) => void,
}

const BoxItem: React.FC<BoxItem> = ({ active, filled, value, origin, onPress }) => {
  return (
    <div
      className={mergeClassNames([
        'box-item',
        !origin && 'filled',
        (value > 0 && value !== filled) && 'incorrect',
        active && 'active',
      ])}
      onClick={!origin ? onPress : null}
    >
      {value > 0 ? value : ''}
    </div>
  );
}

export default BoxItem;