import store from '../../store';
import { actions } from '../reducers/favorite-tracks';
import sharedActions from './shared';

import { addTrackToFavorite, getFavoriteTracks, isFavoriteTrack, removeTrackFromFavorite } from '../../api/tracks';
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
};

const onCheckIsFavorite = async (track): Promise<boolean> => {
  const { data } = await isFavoriteTrack([track.id]);

  return data[0];
};

const onAddTrackToFavorite = async (track) => {
  const { favoriteTracks } = store.getState();

  try {
    await addTrackToFavorite([track.id]);

    store.dispatch(actions.setTracks([track, ...favoriteTracks.tracks]));
  } catch (e) {
    return e;
  }
};

const onRemoveTrackToFavorite = async (track) => {
  const { favoriteTracks } = store.getState();

  try {
    const tracks = favoriteTracks.tracks.filter((item) => item.id !== track.id);
    await removeTrackFromFavorite([track.id]);

    store.dispatch(actions.setTracks(tracks));
  } catch (e) {
    return e;
  }
};

export default {
  onSetPlayTrack,
  onCheckIsFavorite,
  onAddTrackToFavorite,
  onRemoveTrackToFavorite,
  onFetchFavoriteTracks,
};