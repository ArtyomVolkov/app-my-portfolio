import React, { useEffect } from 'react';

import TrackBar from './track-bar';
import TrackActions from './track-actions';
import TrackOptions from './track-options';

import { useAuthData } from '../../store';
import { usePlayerData } from '../../store/player';
import { useUserData } from '../../store/user';

import { usePlayerActions } from '../../store/actions/player';
import { mergeClassNames } from '@utils/common';

import SpotifyPlayer from '../../services/spotify-player';

import styles from './style.module.scss';

const Player = () => {
  const { token } = useAuthData();
  const { user } = useUserData();
  const { initialized, paused, track } = usePlayerData();
  const { setTransferPlayback, setPlaybackChange, onTogglePlay, onPlayNext, onPlayPrevious, onChangeVolume, onChangeSeek } = usePlayerActions();

  useEffect(() => {
    SpotifyPlayer.initialize(token, onInitialized);
  }, [token]);

  useEffect(() => {
    return () => {
      SpotifyPlayer.removeEventListener('ready', onReady);
      SpotifyPlayer.removeEventListener('not_ready', onNotReady);
      SpotifyPlayer.removeEventListener('autoplay_failed', onAutoPlayFailed);
      SpotifyPlayer.removeEventListener('account_error', onError);
      SpotifyPlayer.removeEventListener('playback_error', onError);
      SpotifyPlayer.removeEventListener('initialization_error', onError);
      SpotifyPlayer.removeEventListener('authentication_error', onError);
      SpotifyPlayer.removeEventListener('player_state_changed', onPlayerStateChange);
      SpotifyPlayer.destroy();
    }
  }, []);

  const onInitialized = (data) => {
    console.log(data);
    SpotifyPlayer.addEventListener('ready', onReady);
    SpotifyPlayer.addEventListener('not_ready', onNotReady);
    SpotifyPlayer.addEventListener('account_error', onError);
    SpotifyPlayer.addEventListener('playback_error', onError);
    SpotifyPlayer.addEventListener('initialization_error', onError);
    SpotifyPlayer.addEventListener('authentication_error', onError);
    SpotifyPlayer.addEventListener('autoplay_failed', onAutoPlayFailed);
    SpotifyPlayer.addEventListener('player_state_changed', onPlayerStateChange);
  };

  const onReady = async (data) => {
    console.log('Ready with Device ID', data);
    await setTransferPlayback(data.device_id);
  };

  const onNotReady = async ({ device_id }) => {
    console.log('Not Ready with Device ID', device_id);
  };

  const onAutoPlayFailed = () => {
    console.log('Autoplay is not allowed by the browser autoplay rules');
  };

  const onError = ({ message }) => {
    console.error(message);
  };

  const onPlayerStateChange = (data) => {
    setPlaybackChange(data);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={mergeClassNames([styles.player, !initialized && styles.loading])}>
      <div className={styles.songMedia}>
        <div className={styles.songImage}>
          <img
            src={track.album.image || "https://findicons.com/files/icons/2455/web_icons/48/music.png"}
            alt="player-icon"
          />
        </div>
        <div className={styles.captions}>
          <label className={styles.trackName}>{ track.name }</label>
          <label className={styles.trackArtists}>{ track.artists }</label>
        </div>
      </div>
      <div className={styles.trackPanel}>
        <TrackActions
          paused={paused}
          onPlay={onTogglePlay}
          onPlayNext={onPlayNext}
          onPlayPrevious={onPlayPrevious}
        />
        <TrackBar
          paused={paused}
          loading={track.loading}
          duration={track.duration}
          position={track.position}
          changePosition={onChangeSeek}
        />
      </div>
      <div className={styles.trackOptions}>
        <TrackOptions
          changeVolume={onChangeVolume}
        />
      </div>
    </div>
  );
}

export default Player;
