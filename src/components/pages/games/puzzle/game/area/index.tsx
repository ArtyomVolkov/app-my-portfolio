import React from 'react';

import { mergeClassNames } from '@utils/common';

import { Level } from '@pages/games/puzzle/game';

import styles from './style.module.scss';

interface PuzzleArea {
  size: number,
  zeroIndex: number
  isOver: boolean,
  level: Level,
  items: any,
}

const PuzzleArea: React.FC<PuzzleArea> = ({ size, level, isOver, items, zeroIndex }) => (
  <div className={styles.area}>
    <div className={styles.holst} style={{ width: size * level }}>
      {
        isOver && <div className={styles.gameOver}>Game Over!</div>
      }
      {
        items.map((item, index) => (
          <div
            key={index}
            style={{ width: size, height: size }}
            className={mergeClassNames([
              styles.item,
              (item - 1) === index && styles.done,
              zeroIndex === index && styles.empty
            ])}
          >
            {item}
          </div>
        ))
      }
    </div>
  </div>
);

export default PuzzleArea;