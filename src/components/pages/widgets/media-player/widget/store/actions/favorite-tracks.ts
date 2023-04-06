import store from '../../store';
import { actions } from '../reducers/favorite-tracks';
import sharedActions from './shared';

import { getFavoriteTracks } from '../../api/tracks';
import { getImageSrc, getTrackArtists } from '../../utils/common';

const onFetchFavoriteTracks = async () => {
  const { tracks } = store.getState().favoriteTracks;

  if (tracks) {
    return;
  }
  store.dispatch(actions.setLoading(true));

  try {
    const { data } = await getFavoriteTracks();

    store.dispatch(
      actions.setTracks(
        data.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          uri: track.uri,
          duration: track.duration_ms,
          artists: getTrackArtists(track.artists),
          album: {
            name: track.album.name,
            image: getImageSrc(track.album.images, 200),
          },
        }))
      )
    );
    store.dispatch(actions.setLoading(false));
  } catch (e) {
    store.dispatch(actions.setLoading(false));
  }
};

const onSetPlayTrack = async (trackURI) => {
  const { user, favoriteTracks } = store.getState();

  await sharedActions.onSetActiveTrack(`${user.data.uri}:collection`, favoriteTracks.tracks, trackURI);
}

export default {
  onSetPlayTrack,
  onFetchFavoriteTracks,
};