import React, { useEffect } from 'react';

import BoxItem from './box-item';

import { Action, type TAction } from '@pages/games/sudoku/game';
import type { RowData } from '../store';
import type { Level } from '../generator';

import styles from './style.module.scss';

const KeyCodes = {
  Erase: 8,
};

type ActionData = RowData | Level | null;

const AvailableCodes = [
  8, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104,
  105,
];

interface GameArea {
  blank: Array<Array<number>>;
  origin: Array<Array<number>>;
  filled: Array<Array<number>>;
  active: [block: number, cell: number];
  onAction: (action: TAction, data?: ActionData) => void;
}

const GameArea: React.FC<GameArea> = ({
  active,
  blank,
  origin,
  filled,
  onAction,
}) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onSetActive = ([block, cell]: [number, number]) => {
    if (active[0] === block && active[1] === cell) {
      return;
    }
    onAction(Action.SET_ACTIVE, [block, cell]);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const [row, cell] = active;

    if (row < 0 || cell < 0 || !AvailableCodes.includes(e.keyCode)) {
      return;
    }

    fillItem(e.keyCode === KeyCodes.Erase ? 0 : Number(e.key));
  };

  const fillItem = (value: number) => {
    onAction(Action.FILL, value);
  };

  return (
    <div className={styles.area}>
      {blank.map((item, blockIndex) => (
        <div className={styles.boxArea} key={blockIndex}>
          {item.map((item, cellIndex) => {
            const [block, cell] = active;

            return (
              <BoxItem
                key={blockIndex + cellIndex}
                value={item}
                origin={origin[blockIndex][cellIndex]}
                filled={filled[blockIndex][cellIndex]}
                active={block === blockIndex && cell === cellIndex}
                onPress={() => onSetActive([blockIndex, cellIndex])}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameArea;
