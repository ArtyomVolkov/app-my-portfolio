import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import Player from './components/player';
import NavBar from './components/nav-bar';
import Loader from './components/loader';
import PlayerRoutes from './routes';

import { mergeClassNames } from '@utils/common';

import STORE, { IStore } from './store';
import actions from './store/actions/app';
import userActions from './store/actions/user';

import styles from './style.module.scss';

const StoreProvider = ({ children }) => (
  <Provider store={STORE}>
    { children }
  </Provider>
);

const PlayerWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const fullScreen = useSelector((state: IStore) => state.app.fullScreen);

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

    await userActions.onFetchAccessToken(evt.data.code, navigate);
  };

  const onFetchData = () => {
    if (location.pathname.includes('spotify-auth')) {
      setLoading(false);
      return;
    }
    userActions.onFetchUser(navigate).finally(() => {
      setLoading(false);
    });
  };

  const onKeyDown = (e) => {
    if (fullScreen && e.code === 'Escape') {
      actions.toggleFullScreen();
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

export default () => (
  <StoreProvider>
    <PlayerWidget />
  </StoreProvider>
);
