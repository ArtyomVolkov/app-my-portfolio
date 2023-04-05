export interface IUser {
  name: string,
  image: string,
  email: string,
  country: string,
  followers: number,
  product: string,
  uri: string,
  spotifyURL: string,
}

export interface ILoading {
  loading: boolean,
  setLoading?: (loading: boolean) => void,
}

export interface IArtist {
  id: string,
  name: string,
  image: string,
  genres: Array<string>,
  followers: number,
  totalAlbums?: number,
}

export interface IAlbum {
  id: string,
  uri: string,
  name: string,
  image: string,
  releaseDate: string,
  totalTracks: number,
  label?: string,
}

export interface IPlaylist {
  id: string,
  uri: string,
  name: string,
  image: string,
  totalTracks: number,
}

export interface ITrack {
  id: string,
  name: string,
  duration_ms: number
  artists: string,
  album: string,
  image: string,
  uri?: string,
}
