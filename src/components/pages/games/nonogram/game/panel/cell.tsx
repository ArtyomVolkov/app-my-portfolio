import React from 'react';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import styles from './style.module.scss';

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
      className={styles.cell}
      onClick={onToggleFilled}
      onContextMenu={(e) => e.preventDefault()}
    >
      {
        Boolean(filled) && <CloseRoundedIcon className={styles.crossIcon} />
      }
      { value }
    </div>
  );
}

export default CellBox;