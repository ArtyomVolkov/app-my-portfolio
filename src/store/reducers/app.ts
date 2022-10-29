import { createSlice } from '@reduxjs/toolkit';

interface appState {
  version: string,
  loading: boolean,
}

export const initialState: appState = {
  version: '0.0.1',
  loading: false,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, data) => {
      return { ...state, loading: data.payload };
    },
    resetData: () => {
      return {
        version: '0.0.1',
        loading: false,
      }
    },
  }
});

export const actions = app.actions;

export default app.reducer;