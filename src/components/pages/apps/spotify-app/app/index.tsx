import React, { useEffect, useState } from "react";

import styles from "./style.module.scss";
import { mergeClassNames } from "@utils/common";

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
    document.addEventListener("message", onMessage);

    return () => {
      document.removeEventListener("message", onMessage);
    };
  }, []);

  const onMessage = (event: MessageEvent<JSONValue>) => {
    console.log("Received message from iframe:", event.data);
  };

  return (
    <iframe
      className={mergeClassNames([
        styles.spotifyApp,
        loading && styles.loading,
      ])}
      src={process.env.SPOTIFY_APP_URI}
      onLoadStart={() => setLoading(true)}
      onLoad={() => setLoading(false)}
      title="Spotify App"
      allow="autoplay; encrypted-media; fullscreen;"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      allowFullScreen
    ></iframe>
  );
};

export default SpotifyApp;
