import http from '../services/http';
import RequestAbort, { ERequest } from '../services/request-abort';

export const getDevices = async () => {
  return await http.get('https://api.spotify.com/v1/me/player/devices')
}

export const transferPlayback = async (deviceId) => {
  return await http.put('https://api.spotify.com/v1/me/player', {
    device_ids: [deviceId]
  });
};

export const toggleShuffle = async (deviceId, shuffle) => {
  return await http.put(`https://api.spotify.com/v1/me/player/shuffle?state=${shuffle}`, {
    device_id: deviceId
  });
};

export const toggleRepeat = async (deviceId, repeat) => {
  return await http.put(`https://api.spotify.com/v1/me/player/repeat?state=${repeat}&device_id=${deviceId}`);
};

export const setPlayTrack = async (contextURI = '', uris = [], position = 0) => {
  RequestAbort.cancelPendingRequests(ERequest.SET_PLAY_TRACK);

  const payload: { uris?: string[], offset?: { uri?: string, position?: number }, context_uri?: string } = {};

  if (!contextURI && uris) {
    payload.uris = [...uris];
    payload.offset = { position };
  } else {
    payload.context_uri = contextURI;
    payload.offset = {
      uri: uris.join(',')
    };
  }
  return await http.put('https://api.spotify.com/v1/me/player/play', payload, {
    signal: RequestAbort.setRequest(ERequest.SET_PLAY_TRACK).signal
  });
};

