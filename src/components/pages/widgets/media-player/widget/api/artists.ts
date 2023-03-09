export const getArtists = async (token) => {
  const resp = await fetch(`https://api.spotify.com/v1/me/following?type=artist`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};

export const getArtist = async (token, artistId) => {
  const resp = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};

export const getArtistAlbums = async (token, artistId) => {
  const resp = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};