export const getUserInfo = async (token) => {

  const resp = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  return resp.json();
};