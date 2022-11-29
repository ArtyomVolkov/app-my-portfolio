import { makeAutoObservable } from 'mobx';

export interface IAppStore {
  layout: {
    fullWidth: boolean,
  },
  toggleFullWidth: () => void,
  setFullWidth: (value: boolean) => void,
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

  public setFullWidth = (value: boolean) => {
    this.layout.fullWidth = value;
  }
}

export default new AppStore();
