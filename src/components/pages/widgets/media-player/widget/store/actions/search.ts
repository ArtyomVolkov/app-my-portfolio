import store from '../../store';
import { actions } from '../reducers/search';

import { searchData } from '../../api/search';
import { getImageSrc, getTrackArtists } from '../../utils/common';

const onSearchAll = async () => {
  const { search } = store.getState();

  if (!search.term) {
    return;
  }
  store.dispatch(actions.setLoading(true));

  try {
    const { data } = await searchData(search.term, 'album,artist,playlist,track');

    store.dispatch(actions.setSearchResult({
      findByTerm: search.term,
      albums: data.albums.items.map((album) => ({
        id: album.id,
        name: album.name,
        image: getImageSrc(album.images),
        releaseDate: album.release_date,
        totalTracks: album.total_tracks,
        label: album.label,
      })),
      artists: data.artists.items.map((item) => ({
        id: item.id,
        name: item.name,
        followers: item.followers.total,
        image: getImageSrc(item.images)
      })),
      playlists: data.playlists.items.map((item) => ({
        id: item.id,
        udi: item.uri,
        name: item.name,
        image: getImageSrc(item.images, 300),
        totalTracks: item.tracks.total,
      })),
      tracks: data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        uri: track.uri,
        duration: track.duration_ms,
        artists: getTrackArtists(track.artists),
        album: {
          name: track.album.name,
          image: getImageSrc(track.album.images, 200),
        },
      })),
    }));
  } catch (e) {
    store.dispatch(actions.setLoading(false));
  }
};

const onChangeSearchType = async (searchType) => {
  const { search } = store.getState();

  store.dispatch(actions.setSearchType(searchType));

  if (search.term === search.findByTerm) {
    return;
  }
  await onSearchAll();
};

const onChangeSearchTerm = (e) => {
  store.dispatch(actions.setSearchTerm(e.target.value));
};

export default {
  onSearchAll,
  onChangeSearchTerm,
  onChangeSearchType,
}