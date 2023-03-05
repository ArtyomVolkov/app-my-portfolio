import React, { useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import PlayerRoutes from './routes';
import Player from './components/player';
import NavBar from './components/nav-bar';

import { useAuthData } from './store';
import { useAuthActions } from './store/actions/auth';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const PlayerWidget = () => {
  const [loading, setLoading] = useState(true);
  const { onFetchUser } = useAuthActions();
  const { token, setToken } = useAuthData();

  useEffect(() => {
    onFetchData();
    window.addEventListener('message', onMessageReceive);

    return () => {
      window.removeEventListener('message', onMessageReceive);
    }
  }, []);

  const onMessageReceive = (evt) => {
    if (evt.data && evt.data.authType === 'spotify-auth') {
      setToken(evt.data.access_token);
      onFetchUser(evt.data.access_token).then();
    }
  };

  const onFetchData = () => {
    onFetchUser(token).finally(() => {
      setLoading(false);
    });
  };

  const renderAppContent = () => {
    if (loading) {
      return (
        <div className={styles.loaderWrap}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <>
        <NavBar />
        <div className={styles.mainContent}>
          <PlayerRoutes />
          <div className={styles.footer}>
            <Player />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={mergeClassNames([styles.playerWidget, loading && styles.loading])}>
      { renderAppContent() }
    </div>
  );
}

export default PlayerWidget;
