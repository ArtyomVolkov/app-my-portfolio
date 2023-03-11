import { getUsersAlbums } from '../../api/albums';
import { getImageSrc } from '../../utils/common';

import { useAuthData } from '../../store';
import { useAlbumsData } from '../../store/albums';

export const useArtistsActions = () => {
  const { token } = useAuthData();
  const { albums, setLoading, setAlbums } = useAlbumsData();

  const onFetchAlbums = async () => {
    if (albums) {
      return;
    }
    setLoading(true);

    try {
      const data = await getUsersAlbums(token);
      const albums = data.items.map(({ album }) => ({
        id: album.id,
        name: album.name,
        image: getImageSrc(album.images),
        releaseDate: album.release_date,
        totalTracks: album.total_tracks,
        label: album.label,
      }));
      setAlbums(albums);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    onFetchAlbums,
  }
};