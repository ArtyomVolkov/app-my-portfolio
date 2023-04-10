import { createSlice } from '@reduxjs/toolkit';

import { ILoading, IAlbum, IArtist, ITrack } from '../../shared/interfaces/music-store';

export interface IArtistsStore extends ILoading {
  data: Array<IArtist>,
  activeArtist: {
    loading: boolean,
    data: IArtist,
    albums: Array<IAlbum>
  },
  activeArtistAlbum: {
    loading: boolean,
    data: IAlbum,
    tracks: Array<ITrack>,
  }
}

export const initialState: IArtistsStore = {
  loading: false,
  data: null,
  activeArtist: {
    loading: false,
    data: null,
    albums: null,
  },
  activeArtistAlbum: {
    loading: false,
    data: null,
    tracks: null,
  }
};

const artists = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setLoading: (state, data: { payload: boolean }) => {
      return {
        ...state,
        loading: data.payload,
      }
    },
    setArtists: (state, data: { payload: Array<IArtist> }) => {
      return {
        ...state,
        loading: false,
        data: data.payload,
      }
    },
    setActiveArtist: (state, data: { payload: { loading: boolean, data: IArtist, albums: Array<IAlbum> } }) => {
      return {
        ...state,
        activeArtist: data.payload,
      }
    },
    setActiveArtistAlbum: (state, data: { payload: { loading: boolean, data: IAlbum, tracks: Array<ITrack> } }) => {
      return {
        ...state,
        activeArtistAlbum: data.payload,
      }
    }
  }
});

export const actions = artists.actions;

export default artists.reducer;
