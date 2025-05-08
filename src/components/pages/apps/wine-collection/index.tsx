import React from 'react';

import Main from '@components/main';
import TechnologyList from '@shared/components/lists/technologies';
import WineApp from '@pages/apps/wine-collection/app';

import { TECHNOLOGIES } from '@pages/apps/wine-collection/data';

import styles from './style.module.scss';

const WineCollection = () => {
  return (
    <Main className={styles.wineCollection}>
      <h3>Wine Collection</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <WineApp />
    </Main>
  );
};

export default WineCollection;
