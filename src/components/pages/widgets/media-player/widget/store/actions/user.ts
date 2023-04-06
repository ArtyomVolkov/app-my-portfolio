import store from '../../store';
import { actions } from '../reducers/user';
import sharedActions from './shared';

import { getTopItems, getUserInfo } from '../../api/user';
import { fetchAccessToken } from '../../api/auth';
import { getImageSrc } from '../../utils/common';
import { getAccessToken, removeAccessToken, saveTokens } from '../../services/auth-token';

const onFetchTopArtists = async () => {
  const { user } = store.getState();

  if (user.topArtists) {
    return;
  }
  store.dispatch(actions.setLoading(true));

  try {
    const { data } = await getTopItems('artists');

    store.dispatch(
      actions.setTopArtists(data.items.map((item) => ({
        id: item.id,
        name: item.name,
        genres: item.genres,
        image: getImageSrc(item.images)
      })))
    );
    store.dispatch(actions.setLoading(false));
  } catch (e) {
    store.dispatch(actions.setLoading(false));
  }
};

const onFetchUser = async (navigate) => {
  const { user } = store.getState();

  if (user.data) {
    return;
  }
  const token = getAccessToken();

  if (!token) {
    return;
  }

  try {
    const { data } = await getUserInfo();

    store.dispatch(
      actions.setUserData({
        uri: data.uri,
        name: data.display_name,
        image: getImageSrc(data.images, 400),
        followers: data.followers.total,
        email: data.email,
        product: data.product,
        country: data.country?.toLowerCase() || 'en',
        spotifyURL: data.external_urls.spotify
      })
    );
  } catch (e) {
    navigate('/widgets/media-player/login', { replace: true });
  }
};

const onFetchAccessToken = async (code: string, navigate) => {
  try {
    const { access_token, refresh_token } = await fetchAccessToken(code);

    saveTokens(access_token, refresh_token);

    await onFetchUser(navigate);
  } catch (e) {
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

const onLogout = (navigate) => {
  store.dispatch(actions.setUserData(null));
  removeAccessToken();
  navigate(location.pathname.replace('login', ''), { replace: true });
}

const onCheckRedirect = (user, navigate) => {
  if (!user) {
    return null;
  }
  navigate(location.pathname.replace('login', ''), {
    replace: true
  });
}

const onSetPlayTrack = async (trackURI) => {
  const { data } = store.getState().user;

  await sharedActions.onSetActiveTrack(`${data.uri}:top:tracks`, [], trackURI);
};

export default {
  onLogin,
  onLogout,
  onFetchUser,
  onCheckRedirect,
  onFetchAccessToken,
  onFetchTopArtists,
  onSetPlayTrack,
}
