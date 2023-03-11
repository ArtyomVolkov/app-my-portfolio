import { create } from 'zustand';

import { ILoading, ITrack, IUser } from '../shared/interfaces/music-store';

export interface IUserStore extends ILoading {
  user: IUser,
  topTracks: Array<ITrack>
  setUserData: (data: IUser) => void,
  setTopTracks: (data: Array<ITrack>) => void,
}

export const useUserData = create<IUserStore>((set) => ({
  loading: false,
  user: null,
  topTracks: null,
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
  }
}));