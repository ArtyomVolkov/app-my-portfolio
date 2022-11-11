import React from 'react';

import { mergeClassNames } from '@utils/common';

import { Level } from '@pages/games/puzzle/puzzle-tags';

interface PuzzleArea {
  size: number,
  zeroIndex: number
  isOver: boolean,
  level: Level,
  items: any,
}

const PuzzleArea: React.FC<PuzzleArea> = ({ size, level, isOver, items, zeroIndex }) => (
  <div className="area">
    <div className="holst" style={{ width: size * level }}>
      {
        isOver && <div className="game-over">Game Over!</div>
      }
      {
        items.map((item, index) => (
          <div
            key={index}
            style={{ width: size, height: size }}
            className={mergeClassNames([
              'item',
              (item - 1) === index && 'done',
              zeroIndex === index && 'empty'
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