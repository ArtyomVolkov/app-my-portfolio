import { createSlice } from '@reduxjs/toolkit';

export interface IAppStore {
  fullScreen: boolean,
  fullWidth: boolean,
}

export const initialState: IAppStore = {
  fullScreen: false,
  fullWidth: false,
};

const playerLayout = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleWidth: (state: IAppStore) => {
      return {
        ...state,
        fullWidth: !state.fullWidth
      }
    },
    toggleFullScreen: (state: IAppStore) => {
      return {
        ...state,
        fullScreen: !state.fullScreen
      }
    }
  }
});

export const actions = playerLayout.actions;

export default playerLayout.reducer;
