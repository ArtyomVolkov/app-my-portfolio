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
  return resp.json();
};

export const setPlayTrack = async (token, trackURI) => {
  const resp = await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      uris: [trackURI]
    }),
  });
  if (resp.status === 202) {
    return null;
  }
  return resp.json();
};
