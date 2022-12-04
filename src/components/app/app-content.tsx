import React from 'react';
import { observer } from 'mobx-react';

import Header from '@components/header';
import SideBar from '@components/aside';
import AppRoutes from '@components/routes';

import { mergeClassNames } from '@utils/common';
import { useResizeChange } from '@shared/hooks/layout';

import STORE from '@store/app';
import { RESIZE } from '@shared/constants/layout';

const AppContent = () => {
  useResizeChange((width) => {
    STORE.setFullWidth(width < RESIZE.tablet);
  });

  return (
    <div className={mergeClassNames(['app-entry', STORE.layout.fullWidth && 'full-width'])}>
      <SideBar fullWidth={STORE.layout.fullWidth} />
      <div className="main-content">
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
};

export default observer(AppContent);
