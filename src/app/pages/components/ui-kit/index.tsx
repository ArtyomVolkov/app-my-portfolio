import React from 'react';

import Main from '@app/layout/main';
import TechnologyList from '@shared/components/lists/technologies';
import UiKitWidget from '@pages/components/ui-kit/widget';

import { TECHNOLOGIES } from '@pages/components/ui-kit/data';

import styles from './style.module.scss';

const UiKit = () => {
  return (
    <Main className={styles.uiKitPage}>
      <h3>UI-Kit</h3>
      <TechnologyList data={TECHNOLOGIES} className={styles.technologyList} />
      <UiKitWidget />
    </Main>
  );
};

export default UiKit;
