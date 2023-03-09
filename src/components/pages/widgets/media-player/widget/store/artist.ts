import { create } from 'zustand';

import { ILoading } from '../store';

interface IArtistData {
  id: string,
  name: string,
  image: string,
  genres: Array<string>,
  followers: number,
  totalAlbums: number,
}

interface IArtistAlbum {
  id: string,
  name: string,
  releaseDate: string,
  totalTracks: number,
  image: string,
}

interface IArtist extends ILoading {
  setArtist: (data: IArtistData) => void,
  setAlbums: (data: Array<IArtistAlbum>) => void,
  artist: IArtistData,
  albums: Array<IArtistAlbum>
}

export const useArtistData = create<IArtist>((set) => ({
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