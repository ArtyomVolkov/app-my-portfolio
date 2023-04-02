import { create } from 'zustand';

interface IPlayerLayout {
  fullScreen: boolean,
  fullWidth: boolean,
  toggleWidth: () => void,
  toggleFullScreen: () => void,
}

export const useLayoutData = create<IPlayerLayout>((set) => ({
  fullWidth: false,
  fullScreen: false,
  toggleFullScreen: () => {
    set((state) => ({
      fullScreen: !state.fullScreen
    }));
  },
  toggleWidth: () => {
    set((state) => ({
      fullWidth: !state.fullWidth
    }))
  }
}));
