import React from 'react';
import { observer } from 'mobx-react';

import Header from '@components/header';
import SideBar from '@components/aside';
import AppRoutes from '@components/routes';

import { mergeClassNames } from '@utils/common';
import { useResizeChange } from '@shared/hooks/layout';

import STORE from '@store/app';
import { RESIZE } from '@shared/constants/layout';

import styles from './style.module.scss';

const AppContent = () => {
  useResizeChange((width) => {
    STORE.setFullWidth(width < RESIZE.tablet);
  });

  return (
    <div className={mergeClassNames([styles.appEntry, STORE.layout.fullWidth && styles.fullWidth])}>
      <SideBar fullWidth={STORE.layout.fullWidth} />
      <div className={styles.mainContent}>
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
};

export default observer(AppContent);
