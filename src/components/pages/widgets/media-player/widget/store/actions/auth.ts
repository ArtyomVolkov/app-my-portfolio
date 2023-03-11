import { useLocation, useNavigate } from 'react-router-dom';

import { getUserInfo } from '../../api/user';
import { useUserData } from '../../store/user';

import { getImageSrc } from '../../utils/common';

export const useAuthActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserData } = useUserData();

  const openSocialAuthModal = () => {
    const clientId = '48b22f435e084cebb6a38e338310dcaf';
    const spotifyAuth = 'https://accounts.spotify.com/authorize';
    const redirectURI = 'http://localhost:3000/widgets/media-player/spotify-auth';
    const scopes = [
      'user-read-private',
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
    console.log('on login', `${spotifyAuth}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes}&response_type=token`)

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

  const onFetchUser = async (token) => {
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
    onFetchUser,
    onCheckRedirect
  }
};