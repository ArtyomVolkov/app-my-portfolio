import { setPlayTrack, transferPlayback } from '../../api/player';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import { useAuthData } from '../../store';
import { usePlayerData } from '../../store/player';

import SpotifyPlayer from '../../services/spotify-player';

export const usePlayerActions = () => {
  const { token } = useAuthData();
  const { setInitialize, setTrack, setPlayState, getStore } = usePlayerData();

  const setTransferPlayback = async (id) => {
    await transferPlayback(token, id);
  };

  const setPlaybackChange = (data) => {
    if (!data) {
      return;
    }
    const { initialized } = getStore();

    if (!initialized) {
      setInitialize(true);
    }
    // TODO: prevent double update (check data props)
    setPlayState({
      paused: data.paused,
      shuffle: data.shuffle,
      repeat: data.repeat_mode
    });
    setTrack({
      loading: data.loading,
      position: data.position,
      duration: data.duration,
      name: data.track_window.current_track.name,
      artists: getTrackArtists(data.track_window.current_track.artists),
      album: {
        name: data.track_window.current_track.album.name,
        image: getImageSrc(data.track_window.current_track.album.images, 300)
      },
      uri: data.track_window.current_track.uri
    });
  };

  const onSetPlayTrack = async (trackURI) => {
    const { paused, track } = getStore();

    if (!paused && track.uri === trackURI) {
      return;
    }
    setTrack({
      ...track,
      uri: trackURI,
    });
    await setPlayTrack(token, trackURI);
  };

  const onTogglePlay = () => {
    SpotifyPlayer.togglePlay().then();
  };

  const onPlayNext = () => {
    SpotifyPlayer.nextTrack().then();
  };

  const onPlayPrevious = () => {
    SpotifyPlayer.previousTrack().then();
  };

  const onChangeVolume = (value) => {
    SpotifyPlayer.setVolume(value).then();
  };

  const onChangeSeek = (duration) => {
    SpotifyPlayer.seek(duration).then();
  };

  return {
    setTransferPlayback,
    setPlaybackChange,
    onPlayNext,
    onPlayPrevious,
    onTogglePlay,
    onChangeVolume,
    onChangeSeek,
    onSetPlayTrack,
  }
};