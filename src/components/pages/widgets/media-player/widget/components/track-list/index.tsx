import React from 'react';

import Track from './track';

import { usePlayerData } from '../../store/player';
import { usePlayerActions } from '../../store/actions/player';
import { ITrack } from '../../shared/interfaces/music-store';

import styles from './style.module.scss';

interface ITrackList {
  data: Array<ITrack>,
  trackNamePriority?: 'artist'|'track'
}

const TrackList: React.FC<ITrackList> = ({ data, trackNamePriority= 'artist' }) => {
  const { track } = usePlayerData();
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
            index={index}
            track={item}
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
