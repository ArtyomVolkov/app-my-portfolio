import { searchData } from '../../api/search';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import { ESearchType, useSearchData } from '../../store/search';

export const useSearchActions = () => {
  const actions = useSearchData((state) => ({
    setLoading: state.setLoading,
    setSearch: state.setSearch,
    setSearchType: state.setSearchType,
    getState: state.getState,
    setAllResult: state.setAllResult,
    setTracks: state.setTracks,
    setAlbums: state.setAlbums,
    setArtists: state.setArtists,
    setPlaylists: state.setPlaylists
  }));

  const searchByTracks = async () => {
    const { search, tracks } = actions.getState();

    if (tracks?.search === search) {
      return;
    }

    actions.setLoading(true);
    const { data } = await searchData(search, ESearchType.track);

    actions.setTracks({
      search,
      data: data.tracks.items.map((item) => ({
        id: item.id,
        uri: item.uri,
        name: item.name,
        duration_ms: item.duration_ms,
        album: item.album.name,
        artists: getTrackArtists(item.artists),
        image: getImageSrc(item.album.images, 100),
      }))
    });
    actions.setLoading(false);
  };

  const searchByAlbums = async () => {
    const { search, albums } = actions.getState();

    if (albums?.search === search) {
      return;
    }

    actions.setLoading(true);
    const { data } = await searchData(search, ESearchType.album);

    actions.setAlbums({
      search,
      data: data.albums.items.map((item: { [key: string]: any }) => ({
        id: item.id,
        uri: item.uri,
        name: item.name,
        image: getImageSrc(item.images),
        releaseDate: item.release_date,
        totalTracks: item.total_tracks,
      }))
    });
    actions.setLoading(false);
  };

  const searchByArtists = async () => {
    const { search, artists } = actions.getState();

    if (artists?.search === search) {
      return;
    }

    actions.setLoading(true);
    const { data } = await searchData(search, ESearchType.artist);

    actions.setArtists({
      search,
      data: data.artists.items.map((item) => ({
        id: item.id,
        uri: item.uri,
        name: item.name,
        followers: item.followers.total,
        image: getImageSrc(item.images)
      }))
    });
    actions.setLoading(false);
  }

  const searchByPlaylists = async () => {
    const { search, playlists } = actions.getState();

    if (playlists?.search === search) {
      return;
    }

    actions.setLoading(true);
    const { data } = await searchData(search, ESearchType.playlist);

    actions.setPlaylists({
      search,
      data: data.playlists.items.map((item) => ({
        id: item.id,
        uri: item.uri,
        name: item.name,
        image: getImageSrc(item.images),
        totalTracks: item.tracks.total
      }))
    });
    actions.setLoading(false);
  };

  const searchByAll = async () => {
    const { search, all } = actions.getState();

    if (all?.search === search) {
      return;
    }

    actions.setLoading(true);
    const { data } = await searchData(search, 'album,artist,playlist,track');

    actions.setAllResult({
      all: {
        search,
      },
      albums: {
        data: data.albums.items.map((item: { [key: string]: any }) => ({
          id: item.id,
          name: item.name,
          image: getImageSrc(item.images),
          releaseDate: item.release_date,
          totalTracks: item.total_tracks,
        }))
      },
      artists: {
        data: data.artists.items.map((item) => ({
          id: item.id,
          name: item.name,
          followers: item.followers.total,
          image: getImageSrc(item.images)
        }))
      },
      playlists: {
        data: data.playlists.items.map((item) => ({
          id: item.id,
          name: item.name,
          image: getImageSrc(item.images),
          totalTracks: item.tracks.total,
        }))
      },
      tracks: {
        data: data.tracks.items.map((item) => ({
          id: item.id,
          name: item.name,
          duration_ms: item.duration_ms,
          album: item.album.name,
          artists: getTrackArtists(item.artists),
          image: getImageSrc(item.album.images, 100),
          uri: item.uri,
        }))
      },
    });
    actions.setLoading(false);
  };

  const onSearch = async () => {
    const { loading, search, searchType } = actions.getState();

    if (loading || !search) {
      return;
    }
    switch (searchType) {
      case ESearchType.artist: {
        return searchByArtists();
      }
      case ESearchType.album: {
        return searchByAlbums();
      }
      case ESearchType.playlist: {
        return searchByPlaylists();
      }
      case ESearchType.track: {
        return searchByTracks();
      }
      case ESearchType.all: {
        return searchByAll();
      }
      default:
        return null;
    }
  };

  const onChangeSearch = (e) => {
    const { search } = actions.getState();

    if (search !== e.target.value) {
      actions.setSearch(e.target.value);
    }
  };

  const onChangeSearchType = (type) => {
    const { searchType } = actions.getState();

    if (searchType !== type) {
      actions.setSearchType(type);
    }
  };

  return {
    onSearch,
    onChangeSearch,
    onChangeSearchType,
  };
};
