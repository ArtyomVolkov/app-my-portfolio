import React from 'react';

import { mergeClassNames } from '@utils/common';

interface BoxItem {
  active: boolean,
  value: number,
  onPress: (data) => void,
}

const BoxItem: React.FC<BoxItem> = ({ active, value, onPress }) => {
  return (
    <div
      className={mergeClassNames([
        'box-item',
        active && 'active',
        !value && 'filled'
      ])}
      onClick={onPress}
    >
      {value > 0 ? value : ''}
    </div>
  );
}

export default BoxItem;