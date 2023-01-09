import React, { useState } from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface ICellBox {
  value: number,
}

const CellBox: React.FC<ICellBox> = ({ value }) => {
  const [filled, setFilled] = useState(false);

  const onToggleFilled = () => {
    if (!value) {
      return;
    }
    setFilled(!filled);
  };

  return (
    <div
      className="cell"
      onClick={onToggleFilled}
      onContextMenu={(e) => e.preventDefault()}
    >
      {
        filled && <CloseRoundedIcon className="cross-icon" />
      }
      { value }
    </div>
  );
}

export default CellBox;