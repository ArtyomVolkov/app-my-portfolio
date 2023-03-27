import http from '../services/http';

export const getFavoriteTracks = async () => {
  return await http.get('https://api.spotify.com/v1/me/tracks');
};