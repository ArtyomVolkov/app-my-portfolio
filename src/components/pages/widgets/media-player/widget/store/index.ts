import { create } from 'zustand';

import { getAccessToken, saveAccessToken } from '../services/auth-token';

interface IPlayerLayout {
  fullWidth: boolean,
  toggleWidth: () => void,
}

interface IPlayerAuthData {
  token: string,
  setToken: (token) => void,
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

export const useAuthData = create<IPlayerAuthData>((set) => ({
  token: getAccessToken(), // by default
  setToken: (token) => {
    // encrypted and store value in cookies
    saveAccessToken(token);

    set((state) => ({
      ...state,
      token
    }));
  }
}));
