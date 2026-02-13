import { create } from "zustand";

type Theme = 'light' | 'dark' | 'light-grey' | 'dark-grey' | null;

export interface IAppStore {
  layout: {
    fullWidth: boolean;
  };
  theme: Theme;
  toggleFullWidth: () => void;
  setFullWidth: (value: boolean) => void;
  setTheme: (theme: Theme) => void;
}

export const useAppStore = create<IAppStore>((set) => ({
  theme: window.localStorage.getItem('app-theme') as Theme || 'light',
  layout: {
    fullWidth: true,
  },
  toggleFullWidth: () => {
    set((state) => ({
      layout: { ...state.layout, fullWidth: !state.layout.fullWidth },
    }))
  },
  setTheme: (theme) =>{
    window.localStorage.setItem('app-theme', theme || '');
    document.documentElement.setAttribute('data-theme', theme || '');
    
    set(() => ({ theme }));
  },
  setFullWidth: (value: boolean) =>
    set(() => ({
      layout: { fullWidth: value },
    })),
}));

export default {
  useAppStore,
};
