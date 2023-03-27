import http from '../services/http';

export const searchData = async (search, type) => {
  return await http.get(`https://api.spotify.com/v1/search?q=${search}&type=${type}`);
};
