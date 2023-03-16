import { create } from 'zustand';

import { getAccessToken } from '../services/auth-token';

interface IPlayerLayout {
  fullWidth: boolean,
  toggleWidth: () => void,
}

interface IPlayerAuthData {
  token: string,
  setToken: (token) => void,
  getStore: () => {
    token: string,
  },
}

export const useLayoutData = create<IPlayerLayout>((set) => ({
  fullWidth: false,
  toggleWidth: () => {
    set((state) => {
      return {
        ...state,
        fullWidth: !state.fullWidth
      }
    })
  }
}));

export const useAuthData = create<IPlayerAuthData>((set, get) => ({
  token: getAccessToken(),
  setToken: (token) => {
    set((state) => ({
      ...state,
      loading: false,
      token
    }));
  },
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  getStore: () => {
    const { token } = get();

    return {
      token,
    };
  }
}));
