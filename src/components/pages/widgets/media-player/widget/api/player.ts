export const transferPlayback = async (token, deviceId) => {
  const resp = await fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      device_ids: [deviceId]
    }),
  });

  if (resp.status === 202) {
    return null;
  }
  return await resp.json();
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
  const resp = await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (resp.status === 202) {
    return null;
  }
  return await resp.json();
};
