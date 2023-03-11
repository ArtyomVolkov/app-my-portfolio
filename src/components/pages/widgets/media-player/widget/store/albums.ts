import { create } from 'zustand';

import { ILoading, IAlbum } from '../shared/interfaces/music-store';

interface IArtists extends ILoading {
  albums: Array<IAlbum>,
  setAlbums: (data: Array<IAlbum>) => void,
}

export const useAlbumsData = create<IArtists>((set) => ({
  loading: false,
  albums: null,
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setAlbums: (data) => {
    set((state) => ({
      ...state,
      albums: data,
    }));
  }
}));
