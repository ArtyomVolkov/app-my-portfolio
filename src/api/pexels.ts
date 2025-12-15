const API = "https://api.pexels.com/v1/search";

export const getImages = async (page: number, perPage: number) => {
  try {
    const ressp = await fetch(
      `${API}?query=nature&orientation=landscape&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );
    if (ressp.ok) {
      const data = await ressp.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching images from Pexels API:", error);
    return null;
  }
};
