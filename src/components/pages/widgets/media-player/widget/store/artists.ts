import { create } from 'zustand';

interface IArtis {
  id: string,
  name: string,
  images: Array<{ url: string }>

}

interface IArtists {
  loading: boolean,
  artists: Array<IArtis>,
  setLoading: (loading: boolean) => void,
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
