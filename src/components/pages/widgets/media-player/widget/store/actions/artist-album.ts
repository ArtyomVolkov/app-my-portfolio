import { getAlbum } from '../../api/albums';

import { useArtistAlbum } from '../../store/artist-album';

import { useSharedActions } from './shared';
import { getImageSrc, getTrackArtists } from '../../utils/common';

export const useArtistAlbumActions = () => {
  const { album, tracks, setLoading, setAlbum, setAlbumTracks } = useArtistAlbum();
  const { onSetActiveTrack } = useSharedActions();

  const onFetchData = async (albumId) => {
    if (album && album.id === albumId) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await getAlbum(albumId);
      const albumImage = getImageSrc(data.images);

      setAlbum({
        id: data.id,
        uri: data.uri,
        name: data.name,
        label: data.label,
        image: albumImage,
        releaseDate: data.release_date,
        totalTracks: data.total_tracks
      });
      setAlbumTracks(data.tracks.items.map((item) => ({
        id: item.id,
        uri: item.uri,
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

  const onSetPlayTrack = async (trackURI) => {
    await onSetActiveTrack(album.uri, tracks, trackURI);
  };

  return {
    onFetchData,
    onSetPlayTrack,
  }
};