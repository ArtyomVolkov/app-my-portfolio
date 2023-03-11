import { create } from 'zustand';

import { ITrack, ILoading } from '../shared/interfaces/music-store';

export interface IPlaylistData {
  id: string,
  public: boolean,
  name: string,
  image: string,
  followers: number,
  owner: string,
  totalTracks: number
}

interface IPlaylist<PL> extends ILoading {
  playlist: PL,
  tracks: Array<ITrack>,
  pagination: {},
  setPlaylist: (data: IPlaylistData) => void,
  setPlaylistTracks: (data: Array<ITrack>) => void,
}

export const usePlaylistData = create<IPlaylist<IPlaylistData>>((set) => ({
  loading: false,
  playlist: null,
  tracks: [],
  pagination: {},
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setPlaylist: (data) => {
    set((state) => ({
      ...state,
      playlist: data,
    }));
  },
  setPlaylistTracks: (data) => {
    set((state) => ({
      ...state,
      tracks: data,
    }));
  }
}));
