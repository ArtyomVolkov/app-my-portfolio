import { create } from 'zustand';

import { ILoading, ITrack } from '../shared/interfaces/music-store';

interface IFavoriteTracksStore extends ILoading {
  tracks: Array<ITrack>,
  setTracks: (data: Array<ITrack>) => void,
}

export const useFavoriteTracksData = create<IFavoriteTracksStore>((set) => ({
  loading: false,
  tracks: null,
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setTracks: (data) => {
    set((state) => ({
      ...state,
      tracks: data,
    }));
  }
}));