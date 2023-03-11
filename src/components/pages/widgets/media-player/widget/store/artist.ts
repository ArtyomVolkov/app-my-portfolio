import { create } from 'zustand';

import { ILoading, IArtist, IAlbum } from '../shared/interfaces/music-store';

interface IArtistStore extends ILoading {
  setArtist: (data: IArtist) => void,
  setAlbums: (data: Array<IAlbum>) => void,
  artist: IArtist,
  albums: Array<IAlbum>
}

export const useArtistData = create<IArtistStore>((set) => ({
  loading: false,
  artist: null,
  albums: null,
  setArtist: (data) => {
    set((state) => ({
      ...state,
      artist: data,
    }));
  },
  setAlbums: (data) => {
    set((state) => ({
      ...state,
      albums: data,
    }));
  },
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
}));