import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import PlayerRoutes from './routes';
import Player from './components/player';
import NavBar from './components/nav-bar';

import { useAuthActions } from './store/actions/auth';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const PlayerWidget = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { onFetchUser, onFetchAccessToken } = useAuthActions();

  useEffect(() => {
    onFetchData();
    window.addEventListener('message', onMessageReceive);

    return () => {
      window.removeEventListener('message', onMessageReceive);
    }
  }, []);

  const onMessageReceive = async (evt) => {
    if (!evt.data || evt.data.authType !== 'spotify-auth') {
      return;
    }

    await onFetchAccessToken(evt.data.code);
  };

  const onFetchData = () => {
    if (location.pathname.includes('spotify-auth')) {
      setLoading(false);
      return;
    }
    onFetchUser().finally(() => {
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
