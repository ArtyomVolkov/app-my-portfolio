import { create } from 'zustand';

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
  token: null,
  setToken: (token) => {
    set((state) => ({
      ...state,
      loading: false,
      token
    }));
  },
  getStore: () => {
    const { token } = get();

    return {
      token,
    };
  }
}));
