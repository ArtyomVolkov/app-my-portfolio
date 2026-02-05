import { create } from "zustand";

export interface IAppStore {
  layout: {
    fullWidth: boolean;
  };
  toggleFullWidth: () => void;
  setFullWidth: (value: boolean) => void;
}

export const useAppStore = create<IAppStore>((set) => ({
  layout: {
    fullWidth: true,
  },
  toggleFullWidth: () => {
    set((state) => ({
      layout: { ...state.layout, fullWidth: !state.layout.fullWidth },
    }))
  },
  setFullWidth: (value: boolean) =>
    set(() => ({
      layout: { fullWidth: value },
    })),
}));

export default {
  useAppStore,
};
