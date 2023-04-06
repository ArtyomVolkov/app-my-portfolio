import { createSlice } from '@reduxjs/toolkit';

import { ILoading, ITrack } from '../../shared/interfaces/music-store';

export interface IPlayerStore extends ILoading {
  initialized: boolean,
  deviceId: string,
  error: boolean,
  paused: boolean,
  shuffle: boolean,
  repeat: number,
  track: ITrack,
}

export const initialState: IPlayerStore = {
  deviceId: null,
  loading: false,
  error: false,
  initialized: false,
  paused: false,
  shuffle: false,
  repeat: 0,
  track: null,
};

const player = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setLoading: (state: IPlayerStore, data: { payload: boolean }) => {
      return {
        ...state,
        loading: data.payload,
      }
    },
    setInitialize: (state: IPlayerStore) => {
      return {
        ...state,
        initialized: true,
      }
    },
    setDeviceId: (state, data: { payload: string }) => {
      return {
        ...state,
        deviceId: data.payload
      }
    },
    setError: (state: IPlayerStore) => {
      return {
        ...state,
        error: true,
      }
    },
    setPlayState: (state: IPlayerStore, data: { payload: Pick<IPlayerStore, 'shuffle'|'paused'|'repeat'> }) => {
      return {
        ...state,
        shuffle: data.payload.shuffle,
        paused: data.payload.paused,
        repeat: data.payload.repeat,
      }
    },
    setTrack: (state: IPlayerStore, data: { payload: ITrack }) => {
      return {
        ...state,
        track: data.payload,
      }
    },
  },
});

export const actions = player.actions;

export default player.reducer;
