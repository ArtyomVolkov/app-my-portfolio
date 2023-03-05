import React, { useState } from 'react';

import Slider from '@mui/material/Slider';

import { mergeClassNames } from '@utils/common';
import { formatDuration } from '../../../utils/common';

import styles from './style.module.scss';

const TrackBar = ({ duration = 200 }) => {
  const [value, setValue] = useState(0);

  const onChange = (e, value) => {
    setValue(value);
  };

  return (
    <div className={styles.trackBar}>
      <label className={styles.timeValue}>{ formatDuration(value) }</label>
      <Slider
        aria-label="track-slider"
        value={value}
        min={0}
        step={1}
        max={duration}
        onChange={onChange}
        classes={{
          root: styles.muiRoot,
          track: styles.muiTrack,
          rail: styles.muiTrackRail,
          thumb: styles.muiThumb,
          focusVisible: styles.muiThumbFocus
        }}
      />
      <label className={mergeClassNames([styles.timeValue, styles.odd])}>
        -{ formatDuration(duration - value) }
      </label>
    </div>

  );
}

export default TrackBar;
