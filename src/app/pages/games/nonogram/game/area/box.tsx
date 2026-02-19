import React from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { mergeClassNames } from '@utils/common';
import { EBoxState } from '@pages/games/nonogram/game/context';

import styles from './style.module.scss';

interface ICellBox {
  row: number,
  cell: number,
  size: number,
  state: EBoxState,
  onEnter: (row, cell) => void,
}

const CellBox: React.FC<ICellBox> = ({ row, cell, size, state, onEnter }) => {
  const renderItem = () => {
    switch (state) {
      case EBoxState.Cross: {
        return <CloseRoundedIcon className={styles.cross} />
      }
      case EBoxState.Filled: {
        return <div className={styles.filled} />;
      }
      default:
        return null;
    }
  };

  const onMouseEnter = () => {
    onEnter(row, cell);
  }

  const onDragStart = (e) => {
    e.preventDefault();
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onDragStart={onDragStart}
      data-row={row}
      data-cell={cell}
      className={mergeClassNames([
        styles.cell,
        (cell !== size) && !((cell+1)%5) && styles.divider,
      ])}
    >
      { renderItem() }
    </div>
  );
};

export default CellBox