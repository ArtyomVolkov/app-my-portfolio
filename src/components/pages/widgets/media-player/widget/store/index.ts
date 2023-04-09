import { configureStore } from '@reduxjs/toolkit';

import app, { IAppStore } from './reducers/app';
import user, { IUserStore } from './reducers/user';
import albums, { IAlbumsStore } from './reducers/albums';
import player, { IPlayerStore } from './reducers/player';
import favoriteTracks, { IFavoriteTracksStore } from './reducers/favorite-tracks';
import playlists, { IPlaylistsStore } from './reducers/playlists';

export interface IStore {
  app: IAppStore,
  user: IUserStore,
  albums: IAlbumsStore,
  player: IPlayerStore,
  playlists: IPlaylistsStore,
  favoriteTracks: IFavoriteTracksStore,
}

export default configureStore<IStore>({
  reducer: {
    app,
    user,
    albums,
    player,
    playlists,
    favoriteTracks,
  }
});
