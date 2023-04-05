import { createSlice } from '@reduxjs/toolkit';

import { ILoading, IUser, IArtist, ITrack } from '../../shared/interfaces/music-store';

export interface IUserStore extends ILoading {
  data: IUser,
  topTracks: Array<ITrack>,
  topArtists: Array<IArtist>,
}

export const initialState: IUserStore = {
  loading: false,
  data: null,
  topTracks: null,
  topArtists: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state: IUserStore, data: { payload: boolean }) => {
      return {
        ...state,
        loading: data.payload,
      }
    },
    setUserData: (state: IUserStore, data: { payload: IUser }) => {
      return {
        ...state,
        data: data.payload
      }
    },
    setTopArtists: (state: IUserStore, data: { payload: Array<IArtist> }) => {
      return {
        ...state,
        topArtists: data.payload,
      }
    },
    setTopTracks: (state: IUserStore, data: { payload: Array<ITrack> }) => {
      return {
        ...state,
        topTracks: data.payload
      }
    }
  }
});

export const actions = user.actions;

export default user.reducer;
