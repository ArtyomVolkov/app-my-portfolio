import React from 'react';

import Button from '@mui/material/Button';

import ReplayIcon from '@mui/icons-material/Replay';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

const GamePanel = () => {
  return (
    <div className="panel">
      <Button variant="outlined">
        <AppsOutlinedIcon fontSize="small" />
        New Game
      </Button>
      <Button variant="outlined">
        <ReplayIcon fontSize="small" />
        Erase
      </Button>
      <Button variant="outlined">
        <BackspaceOutlinedIcon fontSize="small" />
        Undo
      </Button>
      <Button variant="outlined">
        <TipsAndUpdatesOutlinedIcon />
        Hint
      </Button>
    </div>
  );
}

export default GamePanel;
