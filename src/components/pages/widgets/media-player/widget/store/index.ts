import { configureStore } from '@reduxjs/toolkit';

import app, { IAppStore } from './reducers/app';
import user, { IUserStore } from './reducers/user';

export interface IStore {
  app: IAppStore,
  user: IUserStore,
}

export default configureStore<IStore>({
  reducer: {
    app,
    user,
  }
});
