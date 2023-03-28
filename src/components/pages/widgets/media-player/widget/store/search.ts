import { create } from 'zustand';

import { ILoading, IAlbum, IArtist } from '../shared/interfaces/music-store';

interface ISearch extends ILoading {
  search: string,
  searchType: string,
  albums: {
    data: IAlbum[]
  },
  artists: {
    data: IArtist[]
  },
  playlists: {
    data: any[]
  },
  tracks: {
    data: []
  },
  setAllResult: (data: { albums: any, artists: any, playlists: any, tracks: any }) => void,
  setAlbums: (data) => void,
  setArtists: (data) => void,
  setPlaylists: (data) => void,
  setTracks: (data) => void,
  setSearch: (value: string) => void,
  setSearchType: (type: string) => void,
  getState: () => ({
    loading: boolean,
    search: string,
    searchType: string,
  }),
}

export const useSearchData = create<ISearch>((set, get) => ({
  loading: false,
  search: '',
  albums: null,
  artists: null,
  playlists: null,
  tracks: null,
  searchType: 'all',
  setLoading: (loading) => {
    set(() => ({
      loading,
    }));
  },
  setSearch: (value) => {
    set(() => ({
      search: value,
    }));
  },
  setSearchType: (value) => {
    set(() => ({
      searchType: value,
    }));
  },
  setAllResult: (data) => {
    set(() => ({
      albums: data.albums,
      artists: data.artists,
      playlists: data.playlists,
      tracks: data.tracks
    }));
  },
  setArtists: (data) => {
    set(() => ({
      artists: data,
    }));
  },
  setAlbums: (data) => {
    set(() => ({
      albums: data,
    }));
  },
  setPlaylists: (data) => {
    set(() => ({
      playlists: data,
    }));
  },
  setTracks: (data) => {
    set(() => ({
      tracks: data,
    }));
  },
  getState: () => {
    const state = get();

    return {
      loading: state.loading,
      search: state.search,
      searchType: state.searchType,
    }
  }
}));
