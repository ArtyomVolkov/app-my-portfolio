import React from 'react';
import { observer } from 'mobx-react';

import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import ReplayIcon from '@mui/icons-material/Replay';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';

import { Action } from '@pages/games/sudoku/game';
import { Level } from '@pages/games/sudoku/game/generator';

import './style.scss';

interface GamePanel {
  level: Level,
  hints: number,
  history: Array<any>,
  activeValue: number,
  onAction: (type: Action, data?: any) => void,
}

const GamePanel: React.FC<GamePanel> = ({ level, hints, history, activeValue, onAction }) => {
  const onChangeLevel = (e) => {
    onAction(Action.CHANGE_LEVEL, e.target.value);
  };

  return (
    <div className="panel">
      <FormControl size="small">
        <InputLabel>Level</InputLabel>
        <Select value={level} label="level" onChange={onChangeLevel}>
          <MenuItem value={Level.Easy}>Easy</MenuItem>
          <MenuItem value={Level.Medium}>Medium</MenuItem>
          <MenuItem value={Level.Hard}>Hard</MenuItem>
        </Select>
      </FormControl>
      <br />
      <div className="main-actions">
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
        <Button variant="outlined" onClick={() => onAction(Action.ERASE)} disabled={!activeValue}>
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
    </div>
  );
}

export default observer(GamePanel);
