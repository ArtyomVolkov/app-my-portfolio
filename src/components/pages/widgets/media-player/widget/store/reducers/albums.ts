import { createSlice } from '@reduxjs/toolkit';

import { ILoading, IAlbum, ITrack } from '../../shared/interfaces/music-store';

export interface IAlbumsStore extends ILoading {
  data: Array<IAlbum>,
  activeAlbum: {
    loading: boolean,
    album: IAlbum,
    tracks: Array<ITrack>
  }
}

export const initialState: IAlbumsStore = {
  loading: false,
  data: null,
  activeAlbum: {
    loading: false,
    album: null,
    tracks: null,
  },
};

const albums = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setLoading: (state, data: { payload: boolean }) => {
      return {
        ...state,
        loading: data.payload,
      }
    },
    setAlbums: (state, data: { payload: Array<IAlbum> }) => {
      return {
        ...state,
        data: data.payload,
      }
    },
    setActiveAlbum: (state, data: { payload: { loading: boolean, album: IAlbum, tracks: Array<ITrack> } }) => {
      return {
        ...state,
        activeAlbum: data.payload,
      }
    }
  }
});

export const actions = albums.actions;

export default albums.reducer;
