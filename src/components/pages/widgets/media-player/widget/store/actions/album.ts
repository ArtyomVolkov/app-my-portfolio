import { getAlbum } from '../../api/albums';

import { useAuthData } from '../../store';
import { useAlbumData } from '../../store/album';

import { getImageSrc, getTrackArtists } from '../../utils/common';

export const useAlbumActions = () => {
  const { token } = useAuthData();
  const { album, setLoading, setAlbum, setAlbumTracks } = useAlbumData();

  const onFetchData = async (albumId) => {
    if (album && album.id === albumId) {
      return;
    }
    setLoading(true);

    try {
      const data = await getAlbum(token, albumId);
      const albumImage = getImageSrc(data.images);

      setAlbum({
        id: data.id,
        name: data.name,
        label: data.label,
        image: albumImage,
        releaseDate: data.release_date,
        totalTracks: data.total_tracks
      });
      setAlbumTracks(data.tracks.items.map((item) => ({
        id: item.id,
        name: item.name,
        duration_ms: item.duration_ms,
        artists: getTrackArtists(item.artists),
        album: data.name,
        image: albumImage,
      })));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    onFetchData,
  }
};