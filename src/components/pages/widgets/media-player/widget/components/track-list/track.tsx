import React, { useMemo } from 'react';
import { formatDuration } from '../../utils/common';

import IconButton from '@mui/material/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import styles from './style.module.scss';

export const Track = ({ track, index }) => {
  const artists = useMemo(() => {
    return track.artists.map((item) => item.name).join(', ');
  }, [track.artists]);

  const albumImage = useMemo(() => {
    return track.album.images[0]?.url;
  }, [track.album.images]);

  return (
    <div key={track.id} className={styles.track}>
      <span className={styles.number}>{index+1}</span>
      <img src={albumImage} alt="album" className={styles.image} />
      <div className={styles.trackName}>
        <label className={styles.artist}>{ artists }</label>
        <label className={styles.name}>{ track.name }</label>
      </div>
      <label className={styles.album}>
        { track.album.name }
      </label>
      <label className={styles.duration}>
        { formatDuration(track.duration_ms, 1000)}
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
