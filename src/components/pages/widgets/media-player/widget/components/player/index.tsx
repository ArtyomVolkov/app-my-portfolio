import React, { useEffect } from 'react';

import TrackBar from './track-bar';
import TrackActions from './track-actions';
import TrackOptions from './track-options';

import { useAuthData } from '../../store';
import { usePlayerData } from '../../store/player';
import { usePlayerActions } from '../../store/actions/player';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const Player = () => {
  const { token } = useAuthData();
  const { loading, paused, track } = usePlayerData();
  const { onInit, onDestroy, onTogglePlay, onPlayNext, onPlayPrevious, onChangeVolume, onChangePosition } = usePlayerActions();

  useEffect(() => {
    onInit();

    return () => {
      onDestroy();
    };
  }, [token]);

  return (
    <div className={mergeClassNames([styles.player, loading && styles.loading])}>
      <div className={styles.songMedia}>
        <div className={styles.songImage}>
          <img
            src={track.album.image || "https://findicons.com/files/icons/2455/web_icons/48/music.png"}
            alt="player-icon"
          />
        </div>
        <div className={styles.captions}>
          <label className={styles.trackName}>{ track.name }</label>
          <label className={styles.trackArtists}>{ track.artists }</label>
        </div>
      </div>
      <div className={styles.trackPanel}>
        <TrackActions
          onPlay={onTogglePlay}
          onPlayNext={onPlayNext}
          onPlayPrevious={onPlayPrevious}
        />
        <TrackBar
          paused={paused}
          duration={track.duration}
          position={track.position}
          changePosition={onChangePosition}
        />
      </div>
      <div className={styles.trackOptions}>
        <TrackOptions
          changeVolume={onChangeVolume}
        />
      </div>
    </div>
  );
}

export default Player;
