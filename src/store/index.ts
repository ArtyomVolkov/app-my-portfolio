import { configureStore } from '@reduxjs/toolkit';

import app from '@store/reducers/app';

export default configureStore({
  reducer: {
    app,
  }
});
