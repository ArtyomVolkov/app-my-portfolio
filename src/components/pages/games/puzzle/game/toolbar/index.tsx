import React from 'react';

import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Divider from '@mui/material/Divider';

import { Level } from '@pages/games/puzzle/game';

import styles from './style.module.scss';

interface Index {
  level: Level,
  onRefresh: () => void,
  onChangeItemsCount: (level: Level) => void,
  controls: React.ComponentElement<any, any>,
}

const Toolbar: React.FC<Index> = ({ onRefresh, level, onChangeItemsCount, controls }) => (
  <div className={styles.toolbar}>
    <div className={styles.actions}>
      <Button
        size="medium"
        title="Refresh"
        variant="contained"
        color="error"
        onClick={onRefresh}
      >
        <RestartAltIcon fontSize="small" />
      </Button>
      <Divider variant="middle" />
      <Button
        size="small"
        disabled={level === Level.EASY}
        variant={level === Level.EASY ? 'contained' : 'outlined'}
        onClick={() => onChangeItemsCount(Level.EASY)}
      >
        <span>EASY</span>
      </Button>
      <Button
        size="small"
        disabled={level === Level.MEDIUM}
        variant={level === Level.MEDIUM ? 'contained' : 'outlined'}
        onClick={() => onChangeItemsCount(Level.MEDIUM)}
      >
        <span>MEDIUM</span>
      </Button>
      <Button
        size="small"
        disabled={level === Level.HARD}
        variant={level === Level.HARD ? 'contained' : 'outlined'}
        onClick={() => onChangeItemsCount(Level.HARD)}
      >
        <span>HARD</span>
      </Button>
    </div>
    <Divider />
    { controls }
  </div>
);

export default Toolbar;
