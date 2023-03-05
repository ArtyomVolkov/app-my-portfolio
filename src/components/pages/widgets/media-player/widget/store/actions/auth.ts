import { useLocation, useNavigate } from 'react-router-dom';

import { getUserInfo } from '../../api/user';
import { useUserData } from '../../store';

export const useAuthActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserData } = useUserData();

  const openSocialAuthModal = () => {
    const clientId = '48b22f435e084cebb6a38e338310dcaf';
    const spotifyAuth = 'https://accounts.spotify.com/authorize';
    const redirectURI = 'http://localhost:3000/widgets/media-player/auth-callback';
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-library-read',
      'user-top-read',
      'user-read-recently-played',
    ].join(' ');
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

  const onLogin = () => {
    openSocialAuthModal();
  };

  const onFetchUser = async (token) => {
    if (!token) {
      return;
    }
    const data = await getUserInfo(token);

    if (!data.error) {
      setUserData(data);
      return;
    }
    if (data.error.status === 401) {
      navigate('/widgets/media-player/login', { replace: true });
    }
  };

  const onCheckRedirect = (user) => {
    if (!user) {
      return;
    }
    const path = location.pathname.replace('login', '');
    navigate(path, { replace: true });
  }

  return {
    onLogin,
    onFetchUser,
    onCheckRedirect
  }
};