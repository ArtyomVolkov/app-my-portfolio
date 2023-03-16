import React from 'react';

import Track from './track';

import { usePlayerActions } from '../../store/actions/player';
import { ITrack } from '../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface ITrackList {
  data: Array<ITrack>,
  trackNamePriority?: 'artist'|'track'
}

const TrackList: React.FC<ITrackList> = ({ data,trackNamePriority= 'artist'  }) => {
  const { onSetPlayTrack } = usePlayerActions();

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
            onSetPlayTrack={onSetPlayTrack}
          />
        ))
      }
    </div>
  );
}

export default TrackList;
