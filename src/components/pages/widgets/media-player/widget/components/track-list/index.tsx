import React from 'react';

import Track from './track';

import { usePlayerData } from '../../store/player';
import { ITrack } from '../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface ITrackList {
  data: Array<ITrack>,
  trackNamePriority?: 'artist'|'track',
  onSetPlayTrack?: (uri) => void,
}

const TrackList: React.FC<ITrackList> = ({ data, trackNamePriority= 'artist', onSetPlayTrack }) => {
  const { paused, track } = usePlayerData();

  if (!data) {
    return null;
  }
  return (
    <div className={styles.trackList}>
      {
        data.map((item, index) => (
          <Track
            key={item.id}
            index={index}
            track={item}
            paused={paused && track.uri === item.uri}
            loading={track.loading && track.uri === item.uri}
            isActive={track.uri && track.uri === item.uri}
            namePriority={trackNamePriority}
            onSetPlayTrack={onSetPlayTrack}
          />
        ))
      }
    </div>
  );
}

export default TrackList;
