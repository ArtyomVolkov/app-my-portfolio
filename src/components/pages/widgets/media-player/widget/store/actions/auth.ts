import { useLocation, useNavigate } from 'react-router-dom';

import { getUserInfo } from '../../api/user';
import { useAuthData } from '../../store';
import { useUserData } from '../../store/user';

import { getImageSrc } from '../../utils/common';
import { saveAccessToken } from '../../services/auth-token';

export const useAuthActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken, getStore } = useAuthData();
  const { user, setUserData } = useUserData();

  const onSetToken = (token) => {
    saveAccessToken(token);
    setToken(token);
  };

  const onFetchUser = async () => {
    if (user) {
      return;
    }
    const { token } = getStore();

    if (!token) {
      return;
    }

    try {
      const data = await getUserInfo(token);

      if (data?.error?.status === 401) {
        onLogout();
        return;
      }

      setUserData({
        uri: data.uri,
        name: data.display_name,
        image: getImageSrc(data.images, 400),
        followers: data.followers.total,
        email: data.email,
        product: data.product,
        country: data.country?.toLowerCase() || 'en',
        spotifyURL: data.external_urls.spotify
      });
    } catch (e) {
      navigate('/widgets/media-player/login', { replace: true });
    }
  };

  const openSocialAuthModal = () => {
    const clientId = '48b22f435e084cebb6a38e338310dcaf';
    const spotifyAuth = 'https://accounts.spotify.com/authorize';
    const redirectURI = 'http://localhost:3000/widgets/media-player/spotify-auth';
    const scopes = [
      'streaming', // for premium Spotify account
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-email',
      'user-library-read',
      'user-top-read',
      'user-read-recently-played',
      'user-follow-modify',
      'user-follow-read',
      'user-read-playback-position',
      'user-top-read',
      'user-read-recently-played'
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

  const onLogout = () => {
    const expires = new Date().toUTCString();

    setUserData(null);
    document.cookie = `_MPT='';expires=${expires};path=/;Secure`;
    navigate(location.pathname.replace('login', ''), { replace: true });
  };

  const onCheckRedirect = (user) => {
    if (!user) {
      return;
    }
    const path = location.pathname.replace('login', '');
    navigate(path, { replace: true });
  }

  return {
    onSetToken,
    onLogin,
    onLogout,
    onFetchUser,
    onCheckRedirect
  }
};