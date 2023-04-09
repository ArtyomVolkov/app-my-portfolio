import { getPlaylist, getPlaylists } from '../../api/user';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import store from '../../store';
import sharedActions from '../../store/actions/shared';

import { actions } from '../reducers/playlists';

const onFetchPlaylists = async () => {
  const { playlists } = store.getState();

  if (playlists.data) {
    return;
  }
  store.dispatch(actions.setLoading(true));

  try {
    const { data } = await getPlaylists();
    const playlists = data.items.map((item) => ({
      id: item.id,
      udi: item.uri,
      name: item.name,
      image: getImageSrc(item.images, 300),
      totalTracks: item.tracks.total,
    }));

    store.dispatch(actions.setPlaylists(playlists));
    store.dispatch(actions.setLoading(false));
  } catch (e) {
    store.dispatch(actions.setLoading(false));
  }
};

const onFetchPlaylist = async (playlistId) => {
  const activePlaylist = store.getState().playlists.activePlaylist;

  if (activePlaylist.playlist && activePlaylist.playlist.id === playlistId) {
    return;
  }

  store.dispatch(
    actions.setActivePlaylist({
      ...activePlaylist,
      loading: true,
    })
  );
  try {
    const { data } = await getPlaylist(playlistId);

    store.dispatch(
      actions.setActivePlaylist({
        loading: false,
        playlist: {
          id: data.id,
          uri: data.uri,
          name: data.name,
          image: getImageSrc(data.images),
          totalTracks: data.tracks.total,
          followers: data.followers.total,
          public: data.public,
          owner: data.owner.display_name,
        },
        tracks: data.tracks.items.map(({ track }) => ({
          id: track.id,
          uri: track.uri,
          name: track.name,
          duration: track.duration_ms,
          artists: getTrackArtists(track.artists),
          album: {
            name: track.album.name,
            image: getImageSrc(track.album.images),
          },
        }))
      })
    );
  } catch (e) {
    store.dispatch(
      actions.setActivePlaylist({
        ...activePlaylist,
        loading: false,
      })
    );
  }
}

const onSetPlayTrack = async (trackURI) => {
  const activePlaylist = store.getState().playlists.activePlaylist;

  await sharedActions.onSetActiveTrack(activePlaylist.playlist.uri, activePlaylist.tracks, trackURI);
};

export default {
  onFetchPlaylists,
  onFetchPlaylist,
  onSetPlayTrack,
}
