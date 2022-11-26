import React from 'react';

import Button from '@mui/material/Button';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { Level } from '@pages/games/puzzle/game';

interface Controls {
  items: any,
  zeroIndex: number,
  level: Level,
  onMoveUp: () => void,
  onMoveLeft: () => void,
  onMoveRight: () => void,
  onMoveDown: () => void,
}

const Controls: React.FC<Controls> = ({
  items,
  zeroIndex,
  level,
  onMoveUp,
  onMoveLeft,
  onMoveRight,
  onMoveDown
}) => (
  <div className="controls">
    <div className="vertical">
      <Button size="small" variant="outlined" onClick={onMoveUp} disabled={!items[zeroIndex+level]}>
        <KeyboardArrowUpRoundedIcon />
      </Button>
    </div>
    <div className="horizontal">
      <Button size="small" variant="outlined" onClick={onMoveLeft} disabled={(zeroIndex % level) >= level-1}>
        <KeyboardArrowLeftRoundedIcon />
      </Button>
      <Button size="small" variant="outlined" onClick={onMoveRight} disabled={!(zeroIndex % level)}>
        <KeyboardArrowRightRoundedIcon />
      </Button>
    </div>
    <div className="vertical">
      <Button
        size="small"
        variant="outlined"
        onClick={onMoveDown}
        disabled={!items[zeroIndex-level]}
      >
        <KeyboardArrowDownRoundedIcon />
      </Button>
    </div>
  </div>
);

export default Controls;
