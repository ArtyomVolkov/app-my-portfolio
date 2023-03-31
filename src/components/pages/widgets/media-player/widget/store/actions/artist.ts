import { getArtist, getArtistAlbums } from '../../api/artists';

import { useArtistData } from '../../store/artist';

import { getImageSrc } from '../../utils/common';

export const useArtistActions = () => {
  const { artist, setLoading, setArtist, setAlbums } = useArtistData();

  const onFetchArtist = async (artistId) => {
    if (artist && artist.id === artistId) {
      return;
    }
    setLoading(true);

    try {
      const artist = await getArtist(artistId);
      const albums = await getArtistAlbums(artistId);

      setArtist({
        id: artist.data.id,
        name: artist.data.name,
        genres: artist.data.genres,
        followers: artist.data.followers.total,
        totalAlbums: albums.data.total,
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