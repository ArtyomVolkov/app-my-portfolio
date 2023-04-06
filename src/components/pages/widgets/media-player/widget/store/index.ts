import { configureStore } from '@reduxjs/toolkit';

import app, { IAppStore } from './reducers/app';
import user, { IUserStore } from './reducers/user';
import albums, { IAlbumsStore } from './reducers/albums';
import player, { IPlayerStore } from './reducers/player';
import favoriteTracks, { IFavoriteTracksStore } from './reducers/favorite-tracks';

export interface IStore {
  app: IAppStore,
  user: IUserStore,
  albums: IAlbumsStore,
  player: IPlayerStore,
  favoriteTracks: IFavoriteTracksStore,
}

export default configureStore<IStore>({
  reducer: {
    app,
    user,
    albums,
    player,
    favoriteTracks,
  }
});
