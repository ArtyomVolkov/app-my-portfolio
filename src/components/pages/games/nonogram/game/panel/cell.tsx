import React from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface ICellBox {
  value: number,
  filled: boolean,
  onPress: (value) => void,
}

const CellBox: React.FC<ICellBox> = ({ value, filled, onPress }) => {
  const onToggleFilled = () => {
    if (!value) {
      return;
    }
    onPress(!filled ? 1: 0);
  };

  return (
    <div
      className="cell"
      onClick={onToggleFilled}
      onContextMenu={(e) => e.preventDefault()}
    >
      {
        Boolean(filled) && <CloseRoundedIcon className="cross-icon" />
      }
      { value }
    </div>
  );
}

export default CellBox;