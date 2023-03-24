
export const getAccessToken = async (code) => {
  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
     'Authorization': `Basic ${window.btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`,
     'Content-type': 'application/x-www-form-urlencoded',
    },
    body: [
      'grant_type=authorization_code',
      `code=${code}`,
      'redirect_uri=http://localhost:3000/widgets/media-player/spotify-auth',
      `client_id=${process.env.CLIENT_ID}`,
      `client_secret=${process.env.CLIENT_SECRET}`
    ].join('&')
  });
  return resp.json();
}

export const getUserInfo = async (token) => {
  const resp = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  });

  return resp.json();
};

export const getTopItems = async (token, type = 'artists') => {
  const resp = await fetch(`https://api.spotify.com/v1/me/top/${type}?offset=0&limit=15&time_range=short_term`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};

export const getPlaylists = async (token) => {
  const resp = await fetch(`https://api.spotify.com/v1/me/playlists?limit=20`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};

export const getPlaylist = async (token, playListId) => {
  const resp = await fetch(`https://api.spotify.com/v1/playlists/${playListId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};
