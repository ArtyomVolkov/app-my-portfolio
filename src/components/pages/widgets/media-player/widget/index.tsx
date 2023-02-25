import React, { useEffect } from 'react';

import Player from '@pages/widgets/media-player/widget/player';

import { mergeClassNames } from '@utils/common';

import { useLayoutData, useAuthData } from './player/store';
import { getUserInfo } from './player/api/user';

import styles from './style.module.scss';

const PlayerWidget = () => {
  const { token, setToken } = useAuthData();
  const { fullWidth, toggleWidth } = useLayoutData();

  useEffect(() => {
    window.addEventListener('message', onMessageReceive, false);

    return () => {
      window.removeEventListener('message', onMessageReceive)
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [token])

  const onMessageReceive = (evt) => {
    if (evt.data && evt.data.authType === 'spotify-auth') {
      setToken(evt.data.access_token);
    }
  };

  const fetchUserData = () => {
    if (!token) {
      return;
    }
    getUserInfo(token).then((data) => {
      console.log(data)
    });
  };

  const onLogin = () => {
    openWindowModal();
  };

  const openWindowModal = () => {
    const clientId = '48b22f435e084cebb6a38e338310dcaf';
    const spotifyAuth = 'https://accounts.spotify.com/authorize';
    const redirectURI = 'http://localhost:3000/widgets/media-player/auth-callback';
    const scopes = ['user-read-private', 'user-read-email'].join(' ');
    const modal = { width: 650, height: 800 };
    const modalPosition = {
      top: (screen.height / 2) - (modal.height / 2),
      left: (screen.width / 2) - (modal.width / 2),
    };

    window.open(
      `${spotifyAuth}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes}&response_type=token`,
      '_blank',
      [
        'menubar=no',
        'location=no',
        'resizable=no',
        'scrollbars=no',
        'status=no',
        `width=${modal.width}`,
        `height=${modal.height}`,
        `top=${modalPosition.top}`,
        `left=${modalPosition.left}`
      ].join(','),
    );
  }

  return (
    <div className={styles.playerWidget}>
      <div className={mergeClassNames([styles.navBar, fullWidth && styles.small])}>
        <button onClick={toggleWidth}>resize</button>
        <button onClick={onLogin}>Login</button>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.footer}>
          <Player />
        </div>
      </div>
    </div>
  );
}

export default PlayerWidget;
