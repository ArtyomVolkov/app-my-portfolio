import React, { useEffect, useMemo, useRef, useState } from 'react';

import Slider from '@mui/material/Slider';

import { mergeClassNames } from '@utils/common';
import { formatDuration } from '../../../utils/common';

import styles from './style.module.scss';

interface ITrackBar {
  paused: boolean,
  duration: number,
  position: number,
  changePosition: (value) => void,
  updateInterval?: number
}

const TrackBar: React.FC<ITrackBar> = ({
  paused,
  position = 0,
  duration = 200,
  updateInterval = 250,
  changePosition,
}) => {
  const interval = useRef(null);
  const [value, setValue] = useState(position);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (position !== value) {
      setValue(position);
    }
  }, [position]);

  useEffect(() => {
    !paused ? onStartUpdate() : onStopUpdate();
  }, [paused]);

  const step = useMemo(() => {
    return duration/1000;
  }, [duration])

  const onStartUpdate = () => {
    clearInterval(interval.current);
    interval.current = setInterval(onUpdateTrackValue, updateInterval);
  };

  const onStopUpdate = () => {
    clearInterval(interval.current);
  };

  const onUpdateTrackValue = () => {
    setValue((state) => {
      if (state >= duration) {
        return duration;
      }
      return (state+updateInterval);
    });
  };

  const onChange = (e, value) => {
    setValue(value);
    changePosition(value);
  };

  return (
    <div className={styles.trackBar}>
      <label className={styles.timeValue}>{ formatDuration(value, 1000) }</label>
      <Slider
        aria-label="track-slider"
        value={value}
        min={0}
        step={step}
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
        -{ formatDuration(duration - value, 1000) }
      </label>
    </div>

  );
}

export default TrackBar;
