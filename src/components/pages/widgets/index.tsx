import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import CollectionsIcon from '@mui/icons-material/Collections';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import styles from './style.module.scss';

const WidgetsPage = () => {
  return (
    <Main className={styles.widgetsPage}>
      <NavButton
        path="/widgets/gallery"
        title="Gallery"
        icon={<CollectionsIcon className="icon"/>}
      />
      <NavButton
        path="/widgets/weather"
        title="Weather"
        icon={<WbSunnyIcon className="icon"/>}
      />
    </Main>
  );
}

export default WidgetsPage;
