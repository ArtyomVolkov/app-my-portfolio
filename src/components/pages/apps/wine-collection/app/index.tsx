import React, { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

import AppRoutes from './routes';
import AppModal from '../app/components/app-modal';

import { useStore } from '../app/store';

import './firebase';

import styles  from './style.module.scss';

const WineApp = () => {
  const { actions, user } = useStore((store) => store);

  useEffect(() => {
    actions.subscribeAuthStateChanged();

    return () => {
      actions.onClearAppData();
    }
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }
    const unsubscribe = actions.onSubscribeWineList([user.uid, 'wine-list']);

    return () => {
      unsubscribe();
    }
  }, [user]);

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