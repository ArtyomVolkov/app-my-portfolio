import React from 'react';
import { useSelector } from 'react-redux';

import Track from './track';
import Ripple from '@shared/components/ripple';

import { ITrack } from '../../shared/interfaces/music-store';
import { IStore } from '../../store';

import styles from './style.module.scss';

interface ITrackList {
  data: Array<ITrack>,
  trackNamePriority?: 'artist'|'track',
  onSetPlayTrack?: (uri) => void,
}

const TrackList: React.FC<ITrackList> = ({ data, trackNamePriority= 'artist', onSetPlayTrack }) => {
  const player = useSelector((store: IStore) => store.player);

  if (!data) {
    return null;
  }
  return (
    <div className={styles.trackList}>
      {
        data.map((item, index) => (
          <Ripple key={item.id}>
            <Track
              index={index}
              track={item}
              paused={player.paused && player?.track?.uri === item.uri}
              loading={player?.track?.loading && player?.track?.uri === item.uri}
              isActive={player?.track?.uri && player?.track?.uri === item.uri}
              namePriority={trackNamePriority}
              onSetPlayTrack={onSetPlayTrack}
            />
          </Ripple>
        ))
      }
    </div>
  );
}

export default TrackList;
