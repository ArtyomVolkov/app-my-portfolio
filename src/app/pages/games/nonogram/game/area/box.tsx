import React from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { mergeClassNames } from '@utils/common';
import { BoxState, type TBoxState } from '@pages/games/nonogram/game/context';

import styles from './style.module.scss';

interface ICellBox {
  row: number;
  cell: number;
  size: number;
  state: TBoxState;
  onEnter: (row: number, cell: number) => void;
}

const CellBox: React.FC<ICellBox> = ({ row, cell, size, state, onEnter }) => {
  const renderItem = () => {
    switch (state) {
      case BoxState.Cross: {
        return <CloseRoundedIcon className={styles.cross} />;
      }
      case BoxState.Filled: {
        return <div className={styles.filled} />;
      }
      default:
        return null;
    }
  };

  const onMouseEnter = () => {
    onEnter(row, cell);
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onDragStart={onDragStart}
      data-row={row}
      data-cell={cell}
      className={mergeClassNames([
        styles.cell,
        cell !== size && !((cell + 1) % 5) && styles.divider,
      ])}
    >
      {renderItem()}
    </div>
  );
};

export default CellBox;
