const API = 'https://api.pexels.com/v1/search'

export const getImages = async (page: number, perPage: number) => {
  return await fetch(`${API}?query=nature&orientation=landscape&page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY
    }
  }).then((data) => data.json());
};
