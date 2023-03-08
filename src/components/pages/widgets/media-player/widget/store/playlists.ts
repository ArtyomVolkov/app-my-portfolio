import { create } from 'zustand';

interface IPlaylists {
  loading: boolean,
  playlists: Array<any>,
  pagination: {},
  setPlaylists: (data) => void,
  setLoading: (loading: boolean) => void,
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

