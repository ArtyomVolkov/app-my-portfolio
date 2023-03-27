import { getRefreshToken } from '../services/auth-token';

export const fetchAccessToken = async (code) => {
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

export const fetchRefreshToken = async () => {
  const refreshToken = getRefreshToken();

  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${window.btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`,
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: [
      'grant_type=refresh_token',
      `refresh_token=${refreshToken}`,
      `client_id=${process.env.CLIENT_ID}`,
    ].join('&')
  });
  return resp.json();
};