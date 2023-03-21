import React, { useMemo } from 'react';

import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';

import { ITrack as TrackData } from '../../shared/interfaces/music-store';

import { mergeClassNames } from '@utils/common';
import { formatDuration } from '../../utils/common';

import styles from './style.module.scss';

interface ITrack {
  paused: boolean,
  loading: boolean,
  isActive: boolean,
  index: number,
  track: TrackData,
  namePriority: string,
  onSetPlayTrack?: (uri) => void,
}

export const Track: React.FC<ITrack> = ({ track, paused, loading, isActive, index, namePriority, onSetPlayTrack }) => {
  const duration = useMemo(() => {
    return formatDuration(track.duration_ms, 1000);
  }, [track.duration_ms]);

  const onPress = () => {
    if (onSetPlayTrack) {
      onSetPlayTrack(track.uri);
    }
  };

  const renderTrackLabel = () => {
    if (loading) {
      return <CircularProgress className={styles.loadingTrack} size={20} />;
    }
    if (paused) {
      return <PlayCircleOutlineRoundedIcon className={styles.playIcon} />;
    }
    if (isActive) {
      return <PauseCircleOutlineRoundedIcon className={styles.playIcon} />;
    }
    return <span className={styles.number}>{index+1}</span>;
  }

  return (
    <div
      key={track.id}
      onClick={onPress}
      className={mergeClassNames([styles.track, loading && styles.loading, isActive && styles.active])}
    >
      {
        renderTrackLabel()
      }
      <img src={track.image} alt="album" className={styles.image} />
      <div className={mergeClassNames([styles.trackName, namePriority])}>
        <label className={styles.artist}>{ track.artists }</label>
        <label className={styles.name}>{ track.name }</label>
      </div>
      <label className={styles.album}>
        { track.album }
      </label>
      <label className={styles.duration}>
        { duration }
      </label>
      <div className={styles.actions}>
        <IconButton>
          <MoreHorizRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Track;
