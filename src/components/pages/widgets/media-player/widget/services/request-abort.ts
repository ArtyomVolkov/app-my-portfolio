export enum ERequest {
  SET_PLAY_TRACK = 'SET_PLAY_TRACK',
}

class RequestAbort {
  private readonly requests: any;

  constructor() {
    this.requests = new Map();
  }

  private cancelRequests = (name) => {
    if (!this.requests.get(name)) {
      return;
    }

    this.requests.get(name).forEach((item) => {
      item.abort();
    });
    this.clear(name);
  };

  public onCancelRequest = (name) => {
    this.cancelRequests(name);
  };

  public setRequest = (name) => {
    const abortController = new AbortController();

    if (!this.requests.get(name)) {
      this.requests.set(name, [abortController]);
    } else {
      this.requests.get(name).push(abortController);
    }

    return abortController;
  };

  public cancelPendingRequests = (name) => {
    const requests = this.requests.get(name);

    if (requests) {
      this.requests.get(name).forEach((item, index) => {
        if (index < requests.length) {
          item.abort();
        }
      });
    }
  }

  public clear = (name, full = true) => {
    if (!this.requests.get(name)) {
      return;
    }

    if (full) {
      this.requests.delete(name);
      return;
    }

    if (this.requests.get(name).length > 1) {
      this.requests.get(name).shift();
    } else {
      this.requests.delete(name);
    }
  };
}

export default new RequestAbort();