import Typography from '@shared/components/ui-kit/typography';
import Button from '@shared/components/ui-kit/button';

import styles from './style.module.scss';

const SpotifyApp = () => {
  const onOpenApp = () => {
    window.open('https://a-volkov-spotify-player.netlify.app/', '_blank');
  };

  return (
    <div className={styles.SpotifyApp}>
      <Typography variant="h5" lineBreak>
        According to CSP (Content Security Policy) restrictions, Spotify Web
        Player cannot be embedded in an iframe.
      </Typography>
      <Typography variant="p" lineBreak>
        You can open the Spotify Web Player in a new tab by clicking the button
        below.
      </Typography>
      <Button variant="outlined" color="primary" onClick={onOpenApp}>
        Open App
      </Button>
    </div>
  );
};

export default SpotifyApp;
