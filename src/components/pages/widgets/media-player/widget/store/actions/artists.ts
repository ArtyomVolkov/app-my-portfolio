import { getArtists } from '../../api/artists';
import { getImageSrc } from '../../utils/common';

import { useArtistsData } from '../../store/artists';

export const useArtistsActions = () => {
  const { artists, setLoading, setArtists } = useArtistsData();

  const onFetchArtists = async () => {
    if (artists) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await getArtists();
      const artists = data.artists.items.map((item) => ({
        id: item.id,
        name: item.name,
        image: getImageSrc(item.images)
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