import { getArtist, getArtistAlbums } from '../../api/artists';

import { useAuthData } from '../../store';
import { useArtistData } from '../../store/artist';

import { getImageSrc } from '../../utils/common';

export const useArtistActions = () => {
  const { token } = useAuthData();
  const { artist, setLoading, setArtist, setAlbums } = useArtistData();

  const onFetchArtist = async (artistId) => {
    if (artist && artist.id === artistId) {
      return;
    }
    setLoading(true);

    try {
      const artist = await getArtist(artistId);
      const albums = await getArtistAlbums(token, artistId);

      setArtist({
        id: artist.data.id,
        name: artist.data.name,
        genres: artist.data.genres,
        followers: artist.data.followers.total,
        totalAlbums: artist.data.total,
        image: getImageSrc(artist.data.images)
      });
      setAlbums(albums.data.items.map((item) => ({
        id: item.id,
        name: item.name,
        releaseDate: item.release_date,
        totalTracks: item.total_tracks,
        image: getImageSrc(item.images),
      })));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    onFetchArtist,
  }
};