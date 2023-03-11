import React from 'react';

import Track from './track';

import { ITrack } from '../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface ITrackList {
  data: Array<ITrack>,
  trackNamePriority?: 'artist'|'track'
}

const TrackList: React.FC<ITrackList> = ({ data,trackNamePriority= 'artist'  }) => {
  if (!data) {
    return null;
  }
  return (
    <div className={styles.trackList}>
      {
        data.map((item, index) => (
          <Track
            key={item.id}
            track={item}
            namePriority={trackNamePriority}
            index={index}
          />
        ))
      }
    </div>
  );
}

export default TrackList;
