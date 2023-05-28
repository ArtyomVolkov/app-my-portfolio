import http from '../services/http';

export const getFavoriteTracks = async () => {
  return await http.get('https://api.spotify.com/v1/me/tracks');
};

export const isFavoriteTrack = async (ids = []) => {
  return await http.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids.join(',')}`);
};

export const addTrackToFavorite = async (ids = []) => {
  return await http.put(`https://api.spotify.com/v1/me/tracks`, {
    ids
  });
};

export const removeTrackFromFavorite = async (ids = []) => {
  return await http.delete(`https://api.spotify.com/v1/me/tracks?ids=${ids.join(',')}`);
};
