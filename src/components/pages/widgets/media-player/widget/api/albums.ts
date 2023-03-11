export const getAlbum = async (token, albumId) => {
  const resp = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};

export const getUsersAlbums = async (token) => {
  const resp = await fetch('https://api.spotify.com/v1/me/albums', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};
