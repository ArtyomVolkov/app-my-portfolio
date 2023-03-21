import { useAuthData } from '../index';
import { usePlayerData } from '../player';

import { usePlayerActions } from './player';
import { setPlayTrack } from '../../api/player';

export const useSharedActions = () => {
  const { token } = useAuthData();
  const { setTrack, getStore, setPlayState } = usePlayerData();
  const { onTogglePlay } = usePlayerActions();

  const onSetActiveTrack = async (context, tracks, trackURI = null) => {
    const { track } = getStore();

    if (track.uri === trackURI) {
      onTogglePlay();
      return;
    }
    const trackItem = tracks.find(({ uri }) => trackURI === uri);

    if (!trackItem) {
      return;
    }

    setPlayState({
      paused: true,
      shuffle: false,
      repeat: 0
    });
    setTrack({
      loading: true,
      position: 0,
      uri: trackItem.uri,
      artists: trackItem.artists,
      name: trackItem.name,
      duration: trackItem.duration_ms,
      album: {
        name: trackItem.album,
        image: trackItem.image,
      },
    });
    try {
      await setPlayTrack(token, context, [trackURI]);
      const { track } = getStore();

      setTrack({
        ...track,
        loading: false,
      });
    } catch (e) {
      const { track } = getStore();
      setTrack({
        ...track,
        loading: false,
      });
    }
  };

  return {
    onSetActiveTrack
  }
};
