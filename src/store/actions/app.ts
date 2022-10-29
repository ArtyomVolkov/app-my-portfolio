import store from '@store/index';
import { actions } from '@store/reducers/app';

export const getState = () => {
  return store.getState().app;
}

export const setLoading = (data) => {
  const { loading } = {...store.getState().app};

  if (loading !== data) {
    store.dispatch(actions.setLoading(data));
  }
};

const resetData = () => {
  store.dispatch(actions.resetData());
}

export default {
  getState,
  resetData,
  setLoading,
};
