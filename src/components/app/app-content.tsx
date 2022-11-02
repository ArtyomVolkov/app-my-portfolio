import React from 'react';
import { useSelector } from 'react-redux';

import Header from '@components/header';
import SideBar from '@components/aside';
import AppRoutes from '@components/routes';

import { mergeClassNames } from '@utils/common';

import { ReduxStore } from '@shared/interfaces/redux-store';

const AppContent = () => {
  const fullWidth = useSelector(({ app }: ReduxStore) => app.fullWidth);

  return (
    <div className={mergeClassNames(['app-entry', fullWidth && 'full-width'])}>
      <SideBar />
      <div className="main-content">
        <Header />
        <AppRoutes />
      </div>
    </div>
  );
}

export default AppContent;
