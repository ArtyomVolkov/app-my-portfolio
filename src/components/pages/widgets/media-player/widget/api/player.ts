import http from '../services/http';

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
  return await http.put('https://api.spotify.com/v1/me/player/play', payload);
};

