import store from '../../store';
import { actions } from '../reducers/player';
import playerActions from '../../store/actions/player';

import { setPlayTrack } from '../../api/player';

const onSetActiveTrack = async (context, tracks, trackURI = null) => {
  const { track, repeat } = store.getState().player;

  if (track.uri === trackURI) {
    playerActions.onTogglePlay();
    return;
  }
  const trackItemIndex = tracks.findIndex(({ uri }) => trackURI === uri);

  if (trackItemIndex < 0) {
    return;
  }
  const trackItem = tracks[trackItemIndex];
  const trackUris = !context ? tracks.map(({ uri }) => uri) :[trackURI];

  store.dispatch(
    actions.setPlayState({
      paused: true,
      shuffle: false,
      repeat
    })
  );
  store.dispatch(
    actions.setTrack({
      loading: true,
      id: trackItem.id,
      position: 0,
      uri: trackItem.uri,
      artists: trackItem.artists,
      name: trackItem.name,
      duration: trackItem.duration,
      album: trackItem.album,
    })
  );

  try {
    await setPlayTrack(context, trackUris, trackItemIndex);
    const { track } = store.getState().player;

    store.dispatch(actions.setTrack({
      ...track,
      loading: false,
    }));
  } catch (e) {
    const { track } = store.getState().player;

    store.dispatch(actions.setTrack({
      ...track,
      loading: false,
    }));
  }
};

export default {
  onSetActiveTrack,
}
