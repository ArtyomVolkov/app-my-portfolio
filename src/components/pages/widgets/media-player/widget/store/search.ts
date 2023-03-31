import { create } from 'zustand';

import { ILoading, IAlbum, IArtist, ITrack, IPlaylist } from '../shared/interfaces/music-store';

export enum ESearchType {
  all = 'all',
  album = 'album',
  artist = 'artist',
  playlist = 'playlist',
  track = 'track'
}

interface ISearch extends ILoading {
  search: string,
  searchType: string,
  all: {
    search: string,
  },
  albums: {
    search: string,
    data: IAlbum[]
  },
  artists: {
    search: string,
    data: IArtist[]
  },
  playlists: {
    search: string,
    data: IPlaylist[]
  },
  tracks: {
    search: string,
    data: ITrack[]
  },
  setAllResult: (data: { all: any, albums: any, artists: any, playlists: any, tracks: any }) => void,
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
    all: {
      search: string,
    },
    albums: {
      search: string,
      data: IAlbum[]
    },
    artists: {
      search: string,
      data: IArtist[]
    },
    playlists: {
      search: string,
      data: any[]
    },
    tracks: {
      search: string,
      data: ITrack[]
    },
  }),
}

export const useSearchData = create<ISearch>((set, get) => ({
  loading: false,
  search: '',
  all: null,
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
      all: {
        search: data.all.search,
      },
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
      all: state.all,
      albums: state.albums,
      artists: state.artists,
      playlists: state.playlists,
      tracks: state.tracks,
    }
  }
}));
