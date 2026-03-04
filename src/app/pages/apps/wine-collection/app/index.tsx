import './firebase';
import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

import LayoutObserver from '@shared/components/layout-observer';

import AppRoutes from './routes';
import AppModal from '../app/components/app-modal';

import { useStore } from '../app/store';

import styles from './style.module.scss';

const MIN_LAYOUT_WIDTH = 685;

const WineApp = () => {
  const { actions, user } = useStore((store) => store);

  useEffect(() => {
    actions.subscribeAuthStateChanged();

    return () => {
      actions.onClearAppData();
    };
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }
    const unsubscribe = actions.onSubscribeWineList([user.uid, 'wine-list']);

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <LayoutObserver className={styles.wineApp} minWidth={MIN_LAYOUT_WIDTH}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <AppRoutes />
        <AppModal />
      </SnackbarProvider>
    </LayoutObserver>
  );
};

export default WineApp;
