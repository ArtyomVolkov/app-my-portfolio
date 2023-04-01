import { usePlayerData } from '../player';

import { usePlayerActions } from './player';
import { setPlayTrack } from '../../api/player';

export const useSharedActions = () => {
  const { setTrack, getStore, setPlayState } = usePlayerData();
  const { onTogglePlay } = usePlayerActions();

  const onSetActiveTrack = async (context, tracks, trackURI = null) => {
    const { track } = getStore();

    if (track.uri === trackURI) {
      onTogglePlay();
      return;
    }
    const trackItemIndex = tracks.findIndex(({ uri }) => trackURI === uri);

    if (trackItemIndex < 0) {
      return;
    }
    const trackItem = tracks[trackItemIndex];
    const trackUris = !context ? tracks.map(({ uri }) => uri) :[trackURI];

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
      await setPlayTrack(context, trackUris, trackItemIndex);
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
