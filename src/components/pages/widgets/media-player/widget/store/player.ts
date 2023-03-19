import { create } from 'zustand';

interface ITrackData {
  loading: boolean,
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

interface IPlayer {
  initialized: boolean,
  paused: boolean,
  shuffle: boolean,
  repeat: number,
  track: ITrackData,
  setPlayState: ({ shuffle, paused, repeat }: { shuffle: boolean, paused: boolean, repeat: number }) => void,
  setTrack: (track: ITrackData) => void,
  setInitialize: (value: boolean) => void,
  getStore: () => ({
    initialized: boolean,
    paused: boolean,
    shuffle: boolean,
    track: ITrackData,
  }),
}

export const usePlayerData = create<IPlayer>((set, get) => ({
  initialized: false,
  paused: true,
  loading: true,
  shuffle: false,
  repeat: 0,
  track: {
    loading: false,
    name: null,
    artists: null,
    duration: 0,
    position: 0,
    album: {
      name: null,
      image: null,
    },
  },
  setInitialize: (initialized) => {
    set((state) => ({
      ...state,
      initialized,
    }));
  },
  setTrack: (track) => {
    set((state) => ({
      ...state,
      track,
    }));
  },
  setPlayState: ({ shuffle, paused, repeat }) => {
    set((state) => ({
      ...state,
      shuffle,
      repeat,
      paused,
    }));
  },
  getStore: () => {
    const { paused, shuffle, track, initialized } = get();
    return {
      initialized, paused, shuffle, track
    }
  }
}));
