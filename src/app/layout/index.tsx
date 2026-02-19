import React from 'react';

import AppRoutes from '@app/routes';
import Header from '@app/layout/header';
import SideBar from '@app/layout/sidebar';

import { mergeClassNames } from '@utils/common';
import { useResizeChange } from '@shared/hooks/layout';

import { useAppStore } from '@store/app';
import { RESIZE } from '@shared/constants/layout';

import styles from './style.module.scss';

const AppLayout = () => {
  const appStore = useAppStore();

  useResizeChange((width: number) => {
    appStore.setFullWidth(width < RESIZE.tablet);
  });

  return (
    <div
      className={mergeClassNames([
        styles.appEntry,
        appStore.layout.fullWidth && styles.fullWidth,
      ])}
    >
      <SideBar />
      <div className={styles.mainContent}>
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
};

export default AppLayout;
