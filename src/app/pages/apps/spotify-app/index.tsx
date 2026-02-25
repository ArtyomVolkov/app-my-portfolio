import Main from '@app/layout/main';
import TechnologyList from '@shared/components/lists/technologies';
import AppWidget from './app';

import { TECHNOLOGIES } from '@pages/apps/spotify-app/data';

import styles from './style.module.scss';

const SpotifyApp = () => {
  return (
    <Main className={styles.spotifyApp}>
      <h3>Spotify App</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <AppWidget />
    </Main>
  );
};

export default SpotifyApp;
