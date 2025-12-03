import React, { useEffect } from "react";

import styles from "./style.module.scss";

const SpotifyApp = () => {
  useEffect(() => {
    document.addEventListener("message", onMessage);

    return () => {
      document.removeEventListener("message", onMessage);
    };
  }, []);

  const onMessage = (event) => {
    console.log("Received message from iframe:", event.data);
  };

  return (
    <iframe
      className={styles.spotifyApp}
      src={process.env.SPOTIFY_APP_URI}
      title="Spotify App"
      allow="autoplay; encrypted-media; fullscreen;"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      allowFullScreen
    ></iframe>
  );
};

export default SpotifyApp;
