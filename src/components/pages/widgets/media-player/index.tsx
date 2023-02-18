import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import PlayerWidget from '@pages/widgets/media-player/widget';

import { TECHNOLOGIES } from '@pages/widgets/media-player/data';

import styles from './style.module.scss';

const MediaPlayer = () => {
  return (
    <Main className={styles.mediaPlayerPage}>
      <h3>Media Player</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <PlayerWidget />
    </Main>
  );
};

export default MediaPlayer;
