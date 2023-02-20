import React from 'react';

import TrackBar from './track-bar';
import TrackActions from './track-actions';
import TrackOptions from './track-options';

import styles from './style.module.scss';

const Player = () => {
  return (
    <div className={styles.player}>
      <div className={styles.songMedia}>
        <div className={styles.songImage}>
          <img
            width={48}
            height={48}
            src="https://findicons.com/files/icons/2455/web_icons/48/music.png" alt="player-icon"
          />
        </div>
        <div className={styles.captions}>
          <b>The Offspring</b>
          <label>Hit That</label>
        </div>
      </div>
      <div className={styles.trackPanel}>
        <TrackActions />
        <TrackBar />
      </div>
      <div className={styles.trackOptions}>
        <TrackOptions />
      </div>
    </div>
  );
}

export default Player;
