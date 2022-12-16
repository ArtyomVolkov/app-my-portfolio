import React  from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { mergeClassNames } from '@utils/common';

interface ICellBox {
  row: number,
  cell: number,
  size: number,
  onEnter: (row, cell) => void,
  filled: boolean,
  incorrect: boolean,
}

const CellBox: React.FC<ICellBox> = ({ row, cell, size, filled, incorrect, onEnter }) => {
  const renderItem = () => {
    if (incorrect) {
      return <CloseRoundedIcon className="wrong" />
    }
    if (filled) {
      return <div className="filled" />;
    }
    return null;
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
        'cell',
        (cell !== size) && !((cell+1)%5) && 'divider',
        incorrect && 'disabled'
      ])}
    >
      { renderItem() }
    </div>
  );
};

export default CellBox