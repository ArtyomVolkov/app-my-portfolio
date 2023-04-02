import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import Player from './components/player';
import NavBar from './components/nav-bar';
import Loader from './components/loader';
import PlayerRoutes from './routes';

import { useAuthActions } from './store/actions/auth';
import { mergeClassNames } from '@utils/common';

import { useLayoutData } from './store';

import styles from './style.module.scss';

const PlayerWidget = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { onFetchUser, onFetchAccessToken } = useAuthActions();
  const { fullScreen, toggleFullscreen } = useLayoutData((state) => ({
    fullScreen: state.fullScreen,
    toggleFullscreen: state.toggleFullScreen,
  }), shallow);

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

  const onKeyDown = (e) => {
    if (fullScreen && e.code === 'Escape') {
      toggleFullscreen();
    }
  };

  const renderAppContent = () => {
    if (loading) {
      return <Loader className={styles.loader} />;
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
    <div
      onKeyDown={onKeyDown}
      className={mergeClassNames([
        styles.playerWidget,
        fullScreen && styles.fullScreen,
        loading && styles.loading
      ])}
    >
      { renderAppContent() }
    </div>
  );
}

export default PlayerWidget;
