import React from 'react';

import Button from '@mui/material/Button';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

import playerActions from '../../../store/actions/player';

import styles from '../style.module.scss';

const PlayerError = () => {
  return (
    <div className={styles.errorContent}>
      <label className={styles.title}>Player error</label>
      <Button
        variant="outlined"
        color="inherit"
        className={styles.refreshButton}
        startIcon={<RestartAltRoundedIcon />}
        onClick={playerActions.onRefreshInit}
      >
        Refresh
      </Button>
    </div>
  );
}

export default PlayerError;
