import { getFavoriteTracks } from '../../api/tracks';
import { getTrackArtists, getImageSrc } from '../../utils/common';

import { useAuthData } from '../../store';
import { useFavoriteTracksData } from '../../store/tracks';

export const useFavoriteTracksActions = () => {
  const { token } = useAuthData();
  const { tracks, setLoading, setTracks } = useFavoriteTracksData();

  const onFetchData = async () => {
    if (tracks) {
      return;
    }
    setLoading(true);

    try {
      const data = await getFavoriteTracks(token);
      setTracks(data.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        duration_ms: track.duration_ms,
        album: track.album.name,
        artists: getTrackArtists(track.artists),
        image: getImageSrc(track.album.images, 200),
      })));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    onFetchData
  };
}