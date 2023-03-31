import http from '../services/http';

export const getArtists = async () => {
  return await http.get(`https://api.spotify.com/v1/me/following?type=artist`);
};

export const getArtist = async (artistId) => {
  return await http.get(`https://api.spotify.com/v1/artists/${artistId}`);
};

export const getArtistAlbums = async (artistId) => {
  return await http.get(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`);
};