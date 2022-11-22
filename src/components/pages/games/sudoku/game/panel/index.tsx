import React from 'react';

import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

import { Action } from '@pages/games/sudoku/game';

interface GamePanel {
  hints: number,
  history: Array<any>,
  onAction: (type: Action) => void,
}

const GamePanel: React.FC<GamePanel> = ({ hints, history, onAction }) => {
  return (
    <div className="panel">
      <Button variant="outlined" onClick={() => onAction(Action.NEW_GAME)}>
        <AppsOutlinedIcon fontSize="small" />
        New Game
      </Button>
      <Button
        variant="outlined"
        disabled={!history.length}
        onClick={() => onAction(Action.UNDO)}
      >
        <ReplayIcon fontSize="small" />
        Undo
      </Button>
      <Button variant="outlined" onClick={() => onAction(Action.ERASE)}>
        <BackspaceOutlinedIcon fontSize="small" />
        Erase
      </Button>
      <Button
        variant="outlined"
        onClick={() => onAction(Action.HINT)}
        disabled={!hints}
      >
        <TipsAndUpdatesOutlinedIcon />
        {`Hint (${hints})`}
      </Button>
    </div>
  );
}

export default GamePanel;
