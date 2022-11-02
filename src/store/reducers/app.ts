import { createSlice } from '@reduxjs/toolkit';

export interface App {
  version: string,
  loading: boolean,
  fullWidth: boolean,
}

export const initialState: App = {
  version: '0.0.1',
  loading: false,
  fullWidth: false,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, data) => {
      return { ...state, loading: data.payload };
    },
    toggleFullWidth: (state) => {
      return { ...state, fullWidth: !state.fullWidth };
    },
    resetData: () => {
      return {...initialState };
    },
  }
});

export const actions = app.actions;

export default app.reducer;