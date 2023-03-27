import http from '../services/http';

export const getUserInfo = async () => {
  return await http.get('https://api.spotify.com/v1/me');
};

export const getTopItems = async (type = 'artists') => {
  return await http.get(`https://api.spotify.com/v1/me/top/${type}?offset=0&limit=15&time_range=short_term`);
};

export const getPlaylists = async () => {
  return await http.get(`https://api.spotify.com/v1/me/playlists?limit=20`);
};

export const getPlaylist = async (playListId) => {
  return await http.get(`https://api.spotify.com/v1/playlists/${playListId}`);
};
