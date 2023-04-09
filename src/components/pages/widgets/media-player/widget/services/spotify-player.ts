import { getAccessToken } from './auth-token';
import { fetchRefreshToken } from '../api/auth';
import { toggleShuffle, toggleRepeat } from '../api/player';
import { KMRepeatMode } from '../shared/enums/player';

class SpotifyPlayer {
  private script: any;
  private deviceId: string;
  public instance: Spotify.Player = null;

  private createScript = () => {
    this.script = document.createElement('script');
    this.script.src = 'https://sdk.scdn.co/spotify-player.js';
    this.script.async = true;
  };

  private getOAuthToken = async (cb) => {
    const { access_token } = await fetchRefreshToken();
    cb(access_token);
  };

  public initialize = (onInit) => {
    const token = getAccessToken();

    if (!token) {
      return;
    }
    if (this.instance) {
      return;
    }
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.instance = new Spotify.Player({
        name: 'A.Volkov Player Widget',
        volume: 0.75,
        getOAuthToken: this.getOAuthToken
      });
      this.instance.connect().then(() => {
        onInit(this.instance);
      }).catch(onInit);
    }
    this.createScript();
    document.body.appendChild(this.script);
  };

  public destroy = () => {
    // for manual remove from DOM (Spotify SDK doesn't remove iframe after destroy function)
    const iFrame = document.querySelector('iframe[src^="https://sdk.scdn.co/"]');

    this.instance?.disconnect();
    window.onSpotifyWebPlaybackSDKReady = null;

    if (this.script) {
      document.body.removeChild(this.script);
    }
    if (iFrame) {
      document.body.removeChild(iFrame);
    }
    this.script = null;
    this.instance = null;
  };

  public setDeviceId = (id) => {
    this.deviceId = id;
  }

  public getDeviceId = () => {
    return this.deviceId;
  }

  public addEventListener = (name, callback) => {
    this.instance?.addListener(name, callback);
  };

  public removeEventListener = (name, callback) => {
    this.instance?.removeListener(name, callback);
  };

  public pauseTrack = async () => {
    await this.instance.pause();
  }

  public togglePlay = async () => {
    await this.instance.togglePlay();
  }

  public toggleShuffle = async (shuffle) => {
    await toggleShuffle(this.deviceId, shuffle);
  }

  public toggleRepeat = async (mode) => {
    await toggleRepeat(this.deviceId, KMRepeatMode[mode]);
  }

  public nextTrack = async () => {
    await this.instance.nextTrack();
  }

  public previousTrack = async () => {
    await this.instance.previousTrack();
  }

  public setVolume = async (value: number) => {
    await this.instance.setVolume(value);
  }

  public seek = async (duration: number) => {
    await this.instance.seek(duration);
  }
}

export default new SpotifyPlayer();