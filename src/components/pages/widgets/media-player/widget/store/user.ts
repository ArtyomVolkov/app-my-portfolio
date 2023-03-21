import { create } from 'zustand';

import { IArtist, ILoading, ITrack, IUser } from '../shared/interfaces/music-store';

export interface IUserStore extends ILoading {
  user: IUser,
  topTracks: Array<ITrack>,
  topArtists: Array<IArtist>,
  setUserData: (data: IUser) => void,
  setTopArtists: (data: Array<IArtist>) => void,
  setTopTracks: (data: Array<ITrack>) => void,
}

export const useUserData = create<IUserStore>((set) => ({
  loading: false,
  user: null,
  topTracks: null,
  topArtists: null,
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setUserData: (data) => {
    set((state) => ({
      ...state,
      user: data,
    }))
  },
  setTopTracks: (data) => {
    set((state) => ({
      ...state,
      topTracks: data,
    }));
  },
  setTopArtists: (data) => {
    set((state) => ({
      ...state,
      topArtists: data,
    }));
  }
}));