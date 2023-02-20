import React, { useState } from 'react';

import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';

import styles from './style.module.scss';

const TrackOptions = () => {
  const [volume, setVolume] = useState(5);

  const onChangeVolume = (e, value) => {
    setVolume(value);
  };

  const renderVolumeIcon = () => {
    if (!volume) {
      return <VolumeOffRoundedIcon className={styles.icon} />;
    }
    return <VolumeUpRoundedIcon className={styles.icon} />;
  };

  return (
    <div className={styles.trackOptions}>
      <div className={styles.options}>
        <IconButton>
          <MoreHorizRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </div>
      <div className={styles.volume}>
        { renderVolumeIcon() }
        <Slider
          aria-label="volume-slider"
          value={volume}
          min={0}
          step={1}
          max={100}
          onChange={onChangeVolume}
          classes={{
            root: styles.muiRoot,
            track: styles.muiTrack,
            rail: styles.muiTrackRail,
            thumb: styles.muiThumb,
            focusVisible: styles.muiThumbFocus
          }}
        />
        <span className={styles.value}>{ Math.round(volume) }</span>
      </div>
    </div>
  );
}

export default TrackOptions;
