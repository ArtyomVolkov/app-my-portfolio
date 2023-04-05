import { getFavoriteTracks } from '../../api/tracks';
import { getImageSrc, getTrackArtists } from '../../utils/common';
import { useSharedActions } from '../../store/actions/shared';

import { useFavoriteTracksData } from '../../store/tracks';
import { useUserData } from '../../store/user';

export const useFavoriteTracksActions = () => {
  const { onSetActiveTrack } = useSharedActions();
  const user = useUserData((state) => state.user);
  const { tracks, setLoading, setTracks } = useFavoriteTracksData((state) => ({
    tracks: state.tracks,
    setTracks: state.setTracks,
    setLoading: state.setLoading,
  }));

  const onFetchData = async () => {
    if (tracks) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await getFavoriteTracks();
      setTracks(data.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        duration_ms: track.duration_ms,
        album: track.album.name,
        artists: getTrackArtists(track.artists),
        image: getImageSrc(track.album.images, 200),
        uri: track.uri,
      })));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onSetPlayTrack = async (trackURI) => {
    await onSetActiveTrack(`${user.uri}:collection`, tracks, trackURI);
  };

  return {
    onFetchData,
    onSetPlayTrack
  };
}