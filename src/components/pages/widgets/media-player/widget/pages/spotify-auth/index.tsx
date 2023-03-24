import React, { useLayoutEffect } from 'react';

const MediaPlayerAuthCallback = () => {
  useLayoutEffect(() => {
    sendAuthData();
  }, []);

  const sendAuthData = () => {
    const hash = location.search.replace('?', '').split('&');
    const data = hash.reduce((previous, current) => {
      const [key, value] = current.split('=');

      if (!key) {
        return previous;
      }

      previous[key] = value;
      return previous;
    }, {});

    if (window.opener && Object.keys(data).length > 0) {
      window.opener.postMessage({
        ...data,
        authType: 'spotify-auth'
      }, '*');
    }
    window.close();
  }

  return null;
}

export default MediaPlayerAuthCallback;
