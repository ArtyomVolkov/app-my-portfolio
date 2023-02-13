const API = 'https://api.pexels.com/v1/search'
const API_KEY = 'BmbfNRvHgMVEzF9ayEeSYNOefT6v2RwnQK6TX9Jpd2AgFg79fYVJ5ROn';

export const getImages = async (search: string = 'nature') => {
  return await fetch(`${API}?query=${search}&per_page=${10}`, {
    headers: {
      Authorization: API_KEY
    }
  }).then((data) => data.json());
};
