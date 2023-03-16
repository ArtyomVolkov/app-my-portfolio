import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import PlayerRoutes from './routes';
import Player from './components/player';
import NavBar from './components/nav-bar';

import { useAuthActions } from './store/actions/auth';
import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const PlayerWidget = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { onFetchUser, onSetToken } = useAuthActions();

  useEffect(() => {
    onFetchData();
    window.addEventListener('message', onMessageReceive);

    return () => {
      window.removeEventListener('message', onMessageReceive);
    }
  }, []);

  const onMessageReceive = (evt) => {
    if (!evt.data || evt.data.authType !== 'spotify-auth') {
      return;
    }
    onSetToken(evt.data.access_token);
    onFetchUser().then(() => {
      navigate('/widgets/media-player/user');
    });
  };

  const onFetchData = () => {
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
