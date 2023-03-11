import { create } from 'zustand';

import { ILoading, IArtist } from '../shared/interfaces/music-store';

interface IArtists extends ILoading {
  artists: Array<IArtist>,
  setArtists: (data) => void,
}

export const useArtistsData = create<IArtists>((set) => ({
  loading: false,
  artists: null,
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setArtists: (data) => {
    set((state) => ({
      ...state,
      artists: data,
    }));
  }
}));
