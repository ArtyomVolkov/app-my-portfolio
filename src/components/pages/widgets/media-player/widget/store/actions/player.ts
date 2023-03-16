import { useRef } from 'react';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import { useAuthData } from '../../store';
import { usePlayerData } from '../../store/player';

import { setPlayTrack, transferPlayback } from '../../api/player';

export const usePlayerActions = () => {
  const scriptRef = useRef(null);
  const player = useRef<Spotify.Player>(null);
  const { token } = useAuthData();
  const { setLoading, setTrack, setPlayState, getStore } = usePlayerData();

  const onInit = () => {
    if (!token) {
      return;
    }
    onInitListeners();
    createScript();

    document.body.appendChild(scriptRef.current);
  };

  const onDestroy = () => {
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }
    onRemoveListeners();
  };

  const onError = ({ message }) => {
    console.error(message);
  };

  const onReady = ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    getPlayerState(device_id).then();
  };

  const onInitListeners = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      player.current = new Spotify.Player({
        name: 'A.Volkov Player Widget',
        volume: 0.75,
        getOAuthToken: (cb) => cb(token)
      });
      player.current.addListener('ready', onReady);
      player.current.addListener('initialization_error', onError);
      player.current.addListener('authentication_error', onError);
      player.current.addListener('player_state_changed', onPlayerStateChange);
      player.current.connect().then();
    }
  };

  const onRemoveListeners = () => {
    if (!player.current) {
      return;
    }
    player.current.removeListener('ready', onReady);
    player.current.removeListener('initialization_error', onError);
    player.current.removeListener('authentication_error', onError);
    player.current.removeListener('player_state_changed', onPlayerStateChange);
    player.current.disconnect();
    window.onSpotifyWebPlaybackSDKReady = null;
  };

  const getPlayerState = async (id) => {
    await transferPlayback(token, id);
  };

  const onPlayerStateChange = (data) => {
    if (!data) {
      return;
    }
    const { loading } = getStore();

    if (loading !== data.loading) {
      setLoading(data.loading);
    }
    // TODO: prevent double update (check data props)
    setPlayState(data.paused);
    setTrack({
      position: data.position,
      duration: data.duration,
      name: data.track_window.current_track.name,
      artists: getTrackArtists(data.track_window.current_track.artists),
      album: {
        name: data.track_window.current_track.album.name,
        image: getImageSrc(data.track_window.current_track.album.images, 300)
      },
    });
  };

  const onSetPlayTrack = async (trackURI) => {
    await setPlayTrack(token, trackURI);
  };

  const onTogglePlay = () => {
    player.current.togglePlay().then();
  };

  const onPlayNext = () => {
    player.current.nextTrack().then();
  };

  const onPlayPrevious = () => {
    player.current.previousTrack().then();
  };

  const onChangeVolume = (value) => {
    player.current.setVolume(value).then();
  };

  const onChangePosition = (value) => {
    player.current.seek(value).then();
  };

  const createScript = () => {
    scriptRef.current = document.createElement('script');
    scriptRef.current.src = 'https://sdk.scdn.co/spotify-player.js';
    scriptRef.current.async = true;
  };

  return {
    onInit,
    onDestroy,
    onPlayNext,
    onPlayPrevious,
    onTogglePlay,
    onChangeVolume,
    onChangePosition,
    onSetPlayTrack,
  }
};