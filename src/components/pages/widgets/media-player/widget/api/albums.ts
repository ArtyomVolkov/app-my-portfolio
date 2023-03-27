import http from '../services/http';

export const getAlbum = async (albumId) => {
  return await http.get(`https://api.spotify.com/v1/albums/${albumId}`);
};

export const getUsersAlbums = async () => {
  return await http.get('https://api.spotify.com/v1/me/albums');
};
