import { useEffect, useState } from 'react';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss';

const SPOTYFY_APP_URI = import.meta.env.VITE_SPOTIFY_APP_URI;

type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];

const SpotifyApp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  const onMessage = (event: MessageEvent<JSONValue>) => {
    console.log('Received message from iframe:', event.data);
  };

  return (
    <iframe
      className={mergeClassNames([
        styles.spotifyApp,
        loading && styles.loading,
      ])}
      src={SPOTYFY_APP_URI}
      onLoad={() => setLoading(false)}
      title="Spotify App"
      allow="autoplay; encrypted-media; fullscreen;"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      allowFullScreen
    ></iframe>
  );
};

export default SpotifyApp;
