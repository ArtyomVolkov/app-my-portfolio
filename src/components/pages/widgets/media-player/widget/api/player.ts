import http from '../services/http';

export const transferPlayback = async (deviceId) => {
  return await http.put('https://api.spotify.com/v1/me/player', {
    device_ids: [deviceId]
  });
};

export const setPlayTrack = async (token, contextURI = '', uris = []) => {
  const payload: { uris?: string[], offset?: { uri: string }, context_uri?: string } = {};

  if (!contextURI && uris) {
    payload.uris = [...uris];
  } else {
    payload.context_uri = contextURI;
    payload.offset = {
      uri: uris.join(',')
    };
  }
  return await http.put('https://api.spotify.com/v1/me/player/play', payload);
};
