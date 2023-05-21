import { createSlice } from '@reduxjs/toolkit';

import { ESearchType } from '../../shared/enums/search';
import { ILoading, IArtist, ITrack, IAlbum, IPlaylist } from '../../shared/interfaces/music-store';

export interface ISearchStore extends ILoading {
  term: string,
  findByTerm?: string,
  searchType: ESearchType,
  artists: Array<IArtist>,
  albums: Array<IAlbum>,
  playlists: Array<IPlaylist>,
  tracks: Array<ITrack>,
}

export const initialState: ISearchStore = {
  loading: false,
  searchType: ESearchType.All,
  term: '',
  findByTerm: '',
  albums: null,
  artists: null,
  playlists: null,
  tracks: null,
};

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state, data: { payload: boolean }) => {
      return {
        ...state,
        loading: data.payload,
      }
    },
    setSearchTerm: (state, data: { payload: string }) => {
      return {
        ...state,
        term: data.payload,
      }
    },
    setSearchType: (state, data: { payload: ESearchType }) => {
      return {
        ...state,
        searchType: data.payload,
      }
    },
    setSearchResult: (state, data: { payload: any }) => {
      return {
        ...state,
        loading: false,
        findByTerm: data.payload.findByTerm,
        albums: data.payload.albums,
        artists: data.payload.artists,
        playlists: data.payload.playlists,
        tracks: data.payload.tracks,
      }
    },
  }
});

export const actions = search.actions;

export default search.reducer;