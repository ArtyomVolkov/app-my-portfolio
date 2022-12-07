import React  from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { mergeClassNames } from '@utils/common';

interface ICellBox {
  index: number,
  size: number,
  onPress: (index) => void,
  filled?: boolean,
  empty?: boolean,
}

const CellBox: React.FC<ICellBox> = ({ index, size, filled, empty, onPress }) => {
  const renderItem = () => {
    if (empty) {
      return <CloseRoundedIcon />
    }
    if (filled) {
      return <div className="filled" />;
    }
    return null;
  };

  return (
    <div
      onClick={onPress}
      className={mergeClassNames([
        'cell',
        (index !== size) && !((index+1)%5) && 'divider'
      ])}
    >
      { renderItem() }
    </div>
  );
};

export default CellBox