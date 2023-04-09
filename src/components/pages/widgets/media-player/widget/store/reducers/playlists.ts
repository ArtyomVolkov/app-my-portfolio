import { createSlice } from '@reduxjs/toolkit';

import { ILoading, ITrack, IPlaylist, IPlaylistInfo } from '../../shared/interfaces/music-store';

export interface IPlaylistsStore extends ILoading {
  data: Array<IPlaylist>,
  activePlaylist: {
    loading: boolean,
    playlist: IPlaylistInfo,
    tracks: Array<ITrack>
  }
}

export const initialState: IPlaylistsStore = {
  loading: false,
  data: null,
  activePlaylist: {
    loading: false,
    playlist: null,
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
    setPlaylists: (state, data: { payload: Array<IPlaylist> }) => {
      return {
        ...state,
        data: data.payload,
      }
    },
    setActivePlaylist: (state, data: { payload: { loading: boolean, playlist: IPlaylistInfo, tracks: Array<ITrack> } }) => {
      return {
        ...state,
        activePlaylist: data.payload,
      }
    }
  }
});

export const actions = albums.actions;

export default albums.reducer;
