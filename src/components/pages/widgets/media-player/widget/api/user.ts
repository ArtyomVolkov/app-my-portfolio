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
}