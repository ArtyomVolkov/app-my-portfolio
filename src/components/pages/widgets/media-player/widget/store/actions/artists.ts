import { getAlbum } from '../../api/albums';
import { getArtist, getArtistAlbums, getArtists } from '../../api/artists';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import store from '../../store';
import sharedActions from '../../store/actions/shared';

import { actions } from '../reducers/artists';

const onFetchArtists = async () => {
  const { artists } = store.getState();

  if (artists.data) {
    return;
  }
  store.dispatch(actions.setLoading(true));

  try {
    const { data } = await getArtists();
    const artists = data.artists.items.map((item) => ({
      id: item.id,
      name: item.name,
      followers: item.followers.total,
      image: getImageSrc(item.images)
    }));
    store.dispatch(actions.setArtists(artists));
  } catch (e) {
    store.dispatch(actions.setLoading(false));
  }
};

const onFetchArtist = async (artistId) => {
  const { activeArtist } = store.getState().artists;

  if (activeArtist.data && activeArtist.data.id === artistId) {
    return;
  }
  store.dispatch(actions.setActiveArtist({
    loading: true,
    data: null,
    albums: null
  }));

  try {
    const artist = await getArtist(artistId);
    const albums = await getArtistAlbums(artistId);

    store.dispatch(actions.setActiveArtist({
      loading: false,
      data: {
        id: artist.data.id,
        name: artist.data.name,
        genres: artist.data.genres,
        followers: artist.data.followers.total,
        totalAlbums: albums.data.total,
        image: getImageSrc(artist.data.images)
      },
      albums: albums.data.items.map((item) => ({
        id: item.id,
        name: item.name,
        releaseDate: item.release_date,
        totalTracks: item.total_tracks,
        image: getImageSrc(item.images),
      }))
    }));
  } catch (e) {
    store.dispatch(actions.setActiveArtist({
      loading: false,
      data: null,
      albums: null
    }));
  }
};

const onFetchArtistAlbum = async (albumId) => {
  const { activeArtistAlbum } = store.getState().artists;

  if (activeArtistAlbum.data && activeArtistAlbum.data.id === albumId) {
    return;
  }
  store.dispatch(actions.setActiveArtistAlbum({
    loading: true,
    data: null,
    tracks: null
  }));
  try {
    const { data } = await getAlbum(albumId);
    const albumImage = getImageSrc(data.images);

    store.dispatch(actions.setActiveArtistAlbum({
      loading: false,
      data: {
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
    }));
  } catch (e) {
    store.dispatch(actions.setActiveArtistAlbum({
      loading: true,
      data: null,
      tracks: null
    }));
  }
};

const onSetPlayTrack = async (trackURI) => {
  const { activeArtistAlbum } = store.getState().artists;

  await sharedActions.onSetActiveTrack(activeArtistAlbum.data.uri, activeArtistAlbum.tracks, trackURI);
};

export default {
  onFetchArtists,
  onFetchArtist,
  onFetchArtistAlbum,
  onSetPlayTrack,
}