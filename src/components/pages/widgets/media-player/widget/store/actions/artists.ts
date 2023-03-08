import { getArtists } from '../../api/artists';

import { useAuthData } from '../../store';
import { useArtistsData } from '../../store/artists';

export const useArtistsActions = () => {
  const { token } = useAuthData();
  const { artists, setLoading, setArtists } = useArtistsData();

  const onFetchArtists = async () => {
    if (artists) {
      return;
    }
    setLoading(true);

    try {
      const data = await getArtists(token);
      const artists = data.artists.items.map((item) => ({
        id: item.id,
        name: item.name,
        images: item.images
      }));

      setLoading(false);
      setArtists(artists);
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    onFetchArtists,
  }
};