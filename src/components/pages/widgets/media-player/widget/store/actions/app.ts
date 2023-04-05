import store from '../../store';
import { actions } from '../reducers/app';

const toggleWidth = () => {
  store.dispatch(actions.toggleWidth());
};

const toggleFullScreen = () => {
  store.dispatch(actions.toggleFullScreen());
}

export default {
  toggleWidth,
  toggleFullScreen,
};