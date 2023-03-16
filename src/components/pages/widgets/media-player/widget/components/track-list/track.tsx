import React, { useMemo } from 'react';

import IconButton from '@mui/material/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import { ITrack as TrackData } from '../../shared/interfaces/music-store';

import { mergeClassNames } from '@utils/common';
import { formatDuration } from '../../utils/common';

import styles from './style.module.scss';

interface ITrack {
  index: number,
  track: TrackData,
  namePriority: string,
  onSetPlayTrack?: (uri) => void,
}

export const Track: React.FC<ITrack> = ({ track, index, namePriority, onSetPlayTrack }) => {
  const duration = useMemo(() => {
    return formatDuration(track.duration_ms, 1000);
  }, [track.duration_ms]);

  const onPress = () => {
    onSetPlayTrack(track.uri);
  };

  return (
    <div key={track.id} className={styles.track} onClick={onPress}>
      <span className={styles.number}>{index+1}</span>
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
