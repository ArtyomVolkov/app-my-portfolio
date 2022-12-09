import React  from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { mergeClassNames } from '@utils/common';

interface ICellBox {
  row: number,
  cell: number,
  size: number,
  onPress: (row, cell) => void,
  onEnter: (row, cell) => void,
  filled: boolean,
  incorrect: boolean,
}

const CellBox: React.FC<ICellBox> = ({ row, cell, size, filled, incorrect, onPress, onEnter }) => {
  const renderItem = () => {
    if (incorrect) {
      return <CloseRoundedIcon className="wrong" />
    }
    if (filled) {
      return <div className="filled" />;
    }
    return null;
  };

  const onClick = () => {
    onPress(row, cell);
  };

  const onMouseEnter = () => {
    onEnter(row, cell);
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
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