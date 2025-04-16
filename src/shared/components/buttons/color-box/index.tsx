import React from 'react';

import styles from './style.module.scss';
import { mergeClassNames } from '@utils/common';

interface IColorBox {
  name: string;
  colors: Array<string>
  active?: boolean;
  onClick?: () => void;
  circleSize?: number;
}

const ColorBox: React.FC<IColorBox> = ({ colors, name, active, onClick, circleSize = 25 }) => {
  return (
    <div
      title={name}
      onClick={onClick}
      className={mergeClassNames([styles.colorBox, active && styles.active])}
    >
      {colors.map((item, index) => (
        <span
          style={{ background: item, width: circleSize, height: circleSize }}
          key={index}
          className={styles.circlePoint}
        />
      ))}
    </div>
  );
};

export default ColorBox;