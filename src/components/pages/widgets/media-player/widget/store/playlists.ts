import { create } from 'zustand';

import { ILoading } from '../store';

interface IPlaylists extends ILoading {
  playlists: Array<any>,
  pagination: {},
  setPlaylists: (data) => void,
}

export const usePlaylistsData = create<IPlaylists>((set) => ({
  loading: false,
  playlists: [],
  pagination: {},
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setPlaylists: (data) => {
    set((state) => ({
      ...state,
      playlists: data,
    }));
  }
}));

