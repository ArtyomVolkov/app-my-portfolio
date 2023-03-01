import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import { useUserData } from '../../store';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserData();

  useEffect(() => {
    onCheckUser();
  }, [user]);

  const onCheckUser = () => {
    if (user) {
      const path = location.pathname.replace('login', '');
      navigate(path, { replace: true });
    }
  }

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

  if (user) {
    return null;
  }

  return (
    <div>
      <Button onClick={onLogin}>Login</Button>
    </div>
  );
}

export default LoginPage;
