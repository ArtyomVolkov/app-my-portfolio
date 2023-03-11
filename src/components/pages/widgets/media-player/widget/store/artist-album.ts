import { create } from 'zustand';

import { IAlbum, ITrack, ILoading } from '../shared/interfaces/music-store';

interface IArtistAlbum extends ILoading {
  album: IAlbum,
  tracks: Array<ITrack>,
  setAlbum: (data: IAlbum) => void,
  setAlbumTracks: (data: Array<ITrack>) => void,
}

export const useArtistAlbum = create<IArtistAlbum>((set) => ({
  loading: false,
  album: null,
  tracks: null,
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setAlbum: (album) => {
    set((state) => ({
      ...state,
      album,
    }));
  },
  setAlbumTracks: (tracks) => {
    set((state) => ({
      ...state,
      tracks,
    }));
  },
}));
