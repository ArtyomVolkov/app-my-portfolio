import React from 'react';

import Main from '@app/layout/main';
import NavButton from '@shared/components/buttons/navigation';

import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import SpotifyIcon from '@assets/icons/spotify';

import styles from './style.module.scss';

const AppsPage = () => {
  return (
    <Main className={styles.appsPage}>
      <NavButton
        path="/apps/wine-collection"
        title="Wine collection"
        icon={<LiquorOutlinedIcon className="icon" />}
      />
      <NavButton
        path="/apps/spotify-app"
        title="Spotify App"
        icon={<SpotifyIcon className="icon" />}
      />
    </Main>
  );
};

export default AppsPage;
