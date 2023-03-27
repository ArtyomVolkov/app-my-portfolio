import { useLocation, useNavigate } from 'react-router-dom';

import { getUserInfo } from '../../api/user';
import { fetchAccessToken } from '../../api/auth';
import { useUserData } from '../../store/user';

import { getImageSrc } from '../../utils/common';
import { removeAccessToken, saveTokens, getAccessToken } from '../../services/auth-token';

export const useAuthActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUserData } = useUserData();

  const onFetchAccessToken = async (code) => {
    try {
      const { access_token, refresh_token } = await fetchAccessToken(code);

      saveTokens(access_token, refresh_token);

      await onFetchUser();
      navigate('/widgets/media-player/search');
    } catch (e) {
    }
  };

  const onFetchUser = async () => {
    if (user) {
      return;
    }
    const token = getAccessToken();

    if (!token) {
      return;
    }

    try {
      const { data } = await getUserInfo();

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
      `${spotifyAuth}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes}&response_type=code`,
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
    setUserData(null);
    removeAccessToken();
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
    onLogin,
    onLogout,
    onFetchAccessToken,
    onFetchUser,
    onCheckRedirect
  }
};