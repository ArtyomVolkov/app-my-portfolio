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
      src="https://a-volkov-spotify-player.netlify.app/#/"
      title="Spotify App"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      allowFullScreen
    ></iframe>
    // <section className={styles.spotifyApp}>
    //   <p className={styles.description}>
    //     Listen to your favorite music on Spotify.
    //   </p>
    //   <a
    //     href="https://a-volkov-spotify-player.netlify.app/#/"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Open Spotify App
    //   </a>
    // </section>
  );
};

export default SpotifyApp;
