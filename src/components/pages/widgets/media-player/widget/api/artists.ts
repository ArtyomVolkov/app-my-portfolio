export const getArtists = async (token) => {
  const resp = await fetch(`https://api.spotify.com/v1/me/following?type=artist`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.json();
};
