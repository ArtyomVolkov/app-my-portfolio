import React from 'react';

import Button from '@mui/material/Button';

import ReplayIcon from '@mui/icons-material/Replay';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

export enum ActionType {
  UNDO,
  ERASE,
  HINT
}

interface GamePanel {
  onAction: (type: ActionType) => void,
}

const GamePanel: React.FC<GamePanel> = ({ onAction }) => {
  return (
    <div className="panel">
      <Button variant="outlined">
        <AppsOutlinedIcon fontSize="small" />
        New Game
      </Button>
      <Button variant="outlined" onClick={() => onAction(ActionType.UNDO)}>
        <ReplayIcon fontSize="small" />
        Undo
      </Button>
      <Button variant="outlined" onClick={() => onAction(ActionType.ERASE)}>
        <BackspaceOutlinedIcon fontSize="small" />
        Erase
      </Button>
      <Button variant="outlined" onClick={() => onAction(ActionType.HINT)}>
        <TipsAndUpdatesOutlinedIcon />
        Hint
      </Button>
    </div>
  );
}

export default GamePanel;
