import { create } from 'zustand';

export interface IPlaylistData {
  id: string,
  public: boolean,
  name: string,
  images: Array<{ url: string }>,
  followers: {
    total: number,
  }
  owner: {
    display_name: string,
  },
  tracks: {
    total: number,
  }
}

export interface ITrack {
  id: string,
  name: string,
  album: any,
  artists: any,
  duration_ms: number
}

interface IPlaylist<PL> {
  loading: boolean,
  playlist: PL,
  tracks: Array<ITrack>,
  pagination: {},
  setLoading: (loading: boolean) => void,
  setPlaylist: (data: PL) => void,
  setPlaylistTracks: (data) => void,
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
