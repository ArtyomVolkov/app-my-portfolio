import { makeAutoObservable } from 'mobx';

export interface IAppStore {
  layout: {
    fullWidth: boolean,
  },
  toggleFullWidth: () => void,
}

class AppStore implements IAppStore {
  public layout = {
    fullWidth: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  public toggleFullWidth = () => {
    this.layout.fullWidth = !this.layout.fullWidth;
  }
}

export default new AppStore();
