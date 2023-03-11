import { getTopItems } from '../../api/user';

import { useAuthData } from '../../store';
import { useUserData } from '../../store/user';
import { getImageSrc, getTrackArtists } from '../../utils/common';

export const useUserActions = () => {
  const { token } = useAuthData();
  const { setLoading, topTracks, setTopTracks } = useUserData();

  const onFetchTopTracks = async () => {
    if (topTracks) {
      return;
    }
    setLoading(true);

    try {
      const topTracks = await getTopItems(token, 'tracks');

      setTopTracks(topTracks.items.map((item) =>({
        id: item.id,
        name: item.name,
        duration_ms: item.duration_ms,
        album: item.album.name,
        artists: getTrackArtists(item.artists),
        image: getImageSrc(item.album.images, 200),
      })));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    onFetchTopTracks,
  }
};
