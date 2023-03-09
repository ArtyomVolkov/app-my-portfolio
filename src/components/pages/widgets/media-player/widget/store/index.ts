import { create } from 'zustand';

import { getAccessToken, saveAccessToken } from '../services/auth-token';

export interface ILoading {
  loading: boolean,
  setLoading: (loading: boolean) => void,
}

interface IPlayerLayout {
  fullWidth: boolean,
  toggleWidth: () => void,
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

interface IPlayerAuthData {
  token: string,
  setToken: (token) => void,
}

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

interface IUser {
  user: any,
  setUserData: (data) => void,
}

export const useUserData = create<IUser>((set) => ({
  user: null,
  setUserData: (data) => {
    set((state) => ({
      ...state,
      user: data,
    }))
  }
}));