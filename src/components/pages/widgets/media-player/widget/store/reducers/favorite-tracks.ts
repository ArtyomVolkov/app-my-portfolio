import { createSlice } from '@reduxjs/toolkit';

import { ILoading, ITrack } from '../../shared/interfaces/music-store';

export interface IFavoriteTracksStore extends ILoading {
  tracks: Array<ITrack>
}

export const initialState: IFavoriteTracksStore = {
  loading: false,
  tracks: null,
};

const favoriteTracks = createSlice({
  name: 'favoriteTracks',
  initialState,
  reducers: {
    setLoading: (state: IFavoriteTracksStore, data: { payload: boolean }) => {
      return {
        ...state,
        loading: data.payload,
      };
    },
    setTracks: (state: IFavoriteTracksStore, data: { payload: Array<ITrack> }) => {
      return {
        ...state,
        tracks: data.payload,
      }
    }
  }
});

export const actions = favoriteTracks.actions;

export default favoriteTracks.reducer;
