import { getAlbum, getUsersAlbums } from '../../api/albums';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import store from '../../store';
import sharedActions from '../../store/actions/shared';
import { actions } from '../reducers/albums';

const onFetchAlbums = async () => {
  const { albums } = store.getState();

  if (albums.data) {
    return;
  }
  store.dispatch(actions.setLoading(true));

  try {
    const { data } = await getUsersAlbums();
    const albums = data.items.map(({ album }) => ({
      id: album.id,
      name: album.name,
      image: getImageSrc(album.images),
      releaseDate: album.release_date,
      totalTracks: album.total_tracks,
      label: album.label,
    }));

    store.dispatch(actions.setAlbums(albums));
    store.dispatch(actions.setLoading(false));
  } catch (e) {
    store.dispatch(actions.setLoading(false));
  }
};

const onFetchAlbum = async (albumId) => {
  const activeAlbum = store.getState().albums.activeAlbum;

  if (activeAlbum.album && activeAlbum.album.id === albumId) {
    return;
  }

  store.dispatch(
    actions.setActiveAlbum({
      ...activeAlbum,
      loading: true,
    })
  );
  try {
    const { data } = await getAlbum(albumId);
    const albumImage = getImageSrc(data.images);

    store.dispatch(
      actions.setActiveAlbum({
        loading: false,
        album: {
          id: data.id,
          uri: data.uri,
          name: data.name,
          label: data.label,
          image: albumImage,
          releaseDate: data.release_date,
          totalTracks: data.total_tracks
        },
        tracks: data.tracks.items.map((item) => ({
          id: item.id,
          uri: item.uri,
          name: item.name,
          duration: item.duration_ms,
          artists: getTrackArtists(item.artists),
          album: {
            name: data.name,
            image: albumImage,
          },
        }))
      })
    );
  } catch (e) {
    store.dispatch(
      actions.setActiveAlbum({
        ...activeAlbum,
        loading: false,
      })
    );
  }
}

const onSetPlayTrack = async (trackURI) => {
  const activeAlbum = store.getState().albums.activeAlbum;

  await sharedActions.onSetActiveTrack(activeAlbum.album.uri, activeAlbum.tracks, trackURI);
};

export default {
  onFetchAlbums,
  onFetchAlbum,
  onSetPlayTrack,
}