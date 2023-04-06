import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import TrackBar from './track-bar';
import TrackActions from './track-actions';
import TrackOptions from './track-options';

import { IStore } from '../../store';
import playerActions from '../../store/actions/player';

import { mergeClassNames } from '@utils/common';

import SpotifyPlayer from '../../services/spotify-player';

import styles from './style.module.scss';

const Player = () => {
  const user = useSelector((store: IStore) => store.user.data);
  const player = useSelector((store: IStore) => store.player);

  useEffect(() => {
    if (user) {
      SpotifyPlayer.initialize(onInitialized);
    }
  }, [user]);

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

  const onInitialized = () => {
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
    SpotifyPlayer.setDeviceId(data.device_id);
    try {
      await playerActions.setTransferPlayback(data.device_id);
    } catch (e) {
      console.log(e);
    }
  };

  const onNotReady = async ({ device_id }) => {
    console.log('Not Ready with Device ID', device_id);
  };

  const onAutoPlayFailed = () => {
    console.log('Autoplay is not allowed by the browser autoplay rules');
  };

  const onError = (message) => {
    console.log(message);
  };

  const onPlayerStateChange = (data) => {
    playerActions.setPlaybackChange(data);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={mergeClassNames([styles.player, !player.initialized && styles.loading])}>
      <div className={styles.songMedia}>
        <div className={styles.songImage}>
          {
            player.track?.album.image && (
              <img
                src={player.track.album.image}
                alt="player-icon"
              />
            )
          }
        </div>
        <div className={styles.captions}>
          <label className={styles.trackName}>{ player.track?.name }</label>
          <label className={styles.trackArtists}>{ player.track?.artists }</label>
        </div>
      </div>
      <div className={styles.trackPanel}>
        <TrackActions
          onPlay={playerActions.onTogglePlay}
          onPlayNext={playerActions.onPlayNext}
          onToggleShuffle={playerActions.onToggleShuffle}
          onChangeRepeat={playerActions.onChangeRepeat}
          onPlayPrevious={playerActions.onPlayPrevious}
        />
        <TrackBar
          paused={player.paused}
          trackUri={player.track?.uri}
          loading={player.track?.loading}
          duration={player.track?.duration}
          position={player.track?.position}
          changePosition={playerActions.onChangeSeek}
        />
      </div>
      <div className={styles.trackOptions}>
        <TrackOptions
          changeVolume={playerActions.onChangeVolume}
        />
      </div>
    </div>
  );
}

export default Player;
