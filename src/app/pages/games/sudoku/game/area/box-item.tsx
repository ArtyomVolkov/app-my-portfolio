import React from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

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
        styles.boxItem,
        !origin && styles.filled,
        (value > 0 && value !== filled) && styles.incorrect,
        active && styles.active,
      ])}
      onClick={!origin ? onPress : null}
    >
      {value > 0 ? value : ''}
    </div>
  );
}

export default BoxItem;