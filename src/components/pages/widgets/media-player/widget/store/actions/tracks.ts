import { setPlayTrack } from '../../api/player';
import { getFavoriteTracks } from '../../api/tracks';
import { getTrackArtists, getImageSrc } from '../../utils/common';

import { usePlayerActions } from './player';

import { useAuthData } from '../../store';
import { usePlayerData } from '../../store/player';
import { useFavoriteTracksData } from '../../store/tracks';
import { useUserData } from '../../store/user';

export const useFavoriteTracksActions = () => {
  const { onTogglePlay } = usePlayerActions();
  const { token } = useAuthData();
  const { user } = useUserData();
  const { setTrack, track } = usePlayerData();
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
        uri: track.uri,
      })));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onSetPlayTrack = async (trackURI) => {
    if (track.uri === trackURI) {
      onTogglePlay();
      return;
    }
    const trackItem = tracks.find(({ uri }) => trackURI === uri);

    if (!trackItem) {
      return;
    }
    setTrack({
      loading: true,
      uri: trackItem.uri,
      artists: trackItem.artists,
      name: trackItem.name,
      position: 0,
      duration: trackItem.duration_ms,
      album: {
        name: trackItem.album,
        image: trackItem.image,
      },
    });
    await setPlayTrack(token, `${user.uri}:collection`, [trackURI]);
  };

  return {
    onFetchData,
    onSetPlayTrack
  };
}