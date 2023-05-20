import { configureStore } from '@reduxjs/toolkit';

import app, { IAppStore } from './reducers/app';
import user, { IUserStore } from './reducers/user';
import albums, { IAlbumsStore } from './reducers/albums';
import player, { IPlayerStore } from './reducers/player';
import favoriteTracks, { IFavoriteTracksStore } from './reducers/favorite-tracks';
import playlists, { IPlaylistsStore } from './reducers/playlists';
import artists, { IArtistsStore } from './reducers/artists';
import search, { ISearchStore } from './reducers/search';

export interface IStore {
  app: IAppStore,
  user: IUserStore,
  search: ISearchStore,
  albums: IAlbumsStore,
  player: IPlayerStore,
  artists: IArtistsStore,
  playlists: IPlaylistsStore,
  favoriteTracks: IFavoriteTracksStore,
}

export default configureStore<IStore>({
  reducer: {
    app,
    user,
    search,
    albums,
    player,
    artists,
    playlists,
    favoriteTracks,
  }
});
