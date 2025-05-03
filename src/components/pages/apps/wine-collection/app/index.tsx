import React from 'react';
import { SnackbarProvider } from 'notistack';

import AppRoutes from './routes';
import AppModal from '../app/components/app-modal';

import './firebase';

import styles  from './style.module.scss';

const WineApp = () => {
  return (
    <div className={styles.wineApp}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <AppRoutes />
        <AppModal />
      </SnackbarProvider>
    </div>
  );
};

export default WineApp;