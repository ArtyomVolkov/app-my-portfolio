import React, { useEffect } from 'react';

import Player from '@pages/widgets/media-player/widget/player';
import PlayerRoutes from './routes';
import NavBar from '@pages/widgets/media-player/widget/nav-bar';

import { useAuthData, useUserData } from './store';

import { getUserInfo } from './api/user';

import styles from './style.module.scss';

const PlayerWidget = () => {
  const { token, setToken } = useAuthData();
  const { setUserData } = useUserData();

  useEffect(() => {
    window.addEventListener('message', onMessageReceive, false);

    return () => {
      window.removeEventListener('message', onMessageReceive)
    }
  }, []);

  useEffect(() => {
    fetchUserData().finally();
  }, [token]);

  const onMessageReceive = (evt) => {
    if (evt.data && evt.data.authType === 'spotify-auth') {
      setToken(evt.data.access_token);
    }
  };

  const fetchUserData = async () => {
    if (!token) {
      return;
    }
    const data = await getUserInfo(token);

    if (data) {
      setUserData(data);
    }
  };

  return (
    <div className={styles.playerWidget}>
      <NavBar />
      <div className={styles.mainContent}>
        <PlayerRoutes />
        <div className={styles.footer}>
          <Player />
        </div>
      </div>
    </div>
  );
}

export default PlayerWidget;
