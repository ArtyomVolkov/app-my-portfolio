const API = 'https://api.pexels.com/v1/search'
const API_KEY = 'BmbfNRvHgMVEzF9ayEeSYNOefT6v2RwnQK6TX9Jpd2AgFg79fYVJ5ROn';

export const getImages = async (page: number, perPage: number) => {
  return await fetch(`${API}?query=nature&page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: API_KEY
    }
  }).then((data) => data.json());
};
