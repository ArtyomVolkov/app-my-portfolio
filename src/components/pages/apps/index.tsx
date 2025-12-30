import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import MusicVideoRoundedIcon from '@mui/icons-material/MusicVideoRounded';

import styles from './style.module.scss';

const AppsPage = () => {
  //throw new Error('Test error boundary in Apps Page');

  return (
    <Main className={styles.appsPage}>
      <NavButton
        path="/apps/wine-collection"
        title="Wine collection"
        icon={<LiquorOutlinedIcon className="icon"/>}
      />
      <NavButton
        path="/apps/spotify-app"
        title="Spotify App"
        icon={<MusicVideoRoundedIcon className="icon"/>}
      />
    </Main>
  );
}

export default AppsPage;
