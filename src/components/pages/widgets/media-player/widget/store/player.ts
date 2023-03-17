import { create } from 'zustand';

import { ILoading } from '../shared/interfaces/music-store';

interface ITrackData {
  name: string,
  artists: string,
  duration: number,
  position: number,
  album: {
    name: string,
    image: string,
  },
  uri?: string,
}

interface IPlayer extends ILoading {
  paused: boolean,
  shuffle: boolean,
  track: ITrackData,
  setPlayState: (value: boolean) => void,
  setTrack: (track: ITrackData) => void,
  getStore: () => ({
    loading: boolean,
    paused: boolean,
    shuffle: boolean,
    track: ITrackData,
  }),
}

export const usePlayerData = create<IPlayer>((set, get) => ({
  paused: true,
  loading: true,
  shuffle: false,
  track: {
    name: null,
    artists: null,
    duration: 0,
    position: 0,
    album: {
      name: null,
      image: null,
    },
  },
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setTrack: (track) => {
    set((state) => ({
      ...state,
      track,
    }));
  },
  setPlayState: (paused) => {
    set((state) => ({
      ...state,
      paused,
    }));
  },
  getStore: () => {
    const { paused, loading, shuffle, track,  } = get();
    return {
      paused, loading, shuffle, track
    }
  }
}));
