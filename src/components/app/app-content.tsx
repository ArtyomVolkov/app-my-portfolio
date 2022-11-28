import React from 'react';
import { observer } from 'mobx-react';

import Header from '@components/header';
import SideBar from '@components/aside';
import AppRoutes from '@components/routes';

import { mergeClassNames } from '@utils/common';
import { IAppStore } from '@store/app';

interface IAppContent {
  store: IAppStore
}

const AppContent = observer<React.FC<IAppContent>>(({ store }) => {
  return (
    <div className={mergeClassNames(['app-entry', store.layout.fullWidth && 'full-width'])}>
      <SideBar fullWidth={store.layout.fullWidth} />
      <div className="main-content">
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
});

export default AppContent;
