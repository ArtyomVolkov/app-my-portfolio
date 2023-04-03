import { transferPlayback } from '../../api/player';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import { usePlayerData } from '../../store/player';

import SpotifyPlayer from '../../services/spotify-player';

export const usePlayerActions = () => {
  const { setInitialize, setTrack, setPlayState, getStore } = usePlayerData();

  const setTransferPlayback = async (id) => {
    await transferPlayback(id);
  };

  const setPlaybackChange = (data) => {
    if (!data) {
      return;
    }
    const { initialized, track } = getStore();

    if (!initialized) {
      setInitialize(true);
    }
    if (data.loading || track.loading || !data.track_window.current_track) {
      return;
    }
    // TODO: prevent double update (check data props); check fast track select
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

  const onTogglePlay = () => {
    SpotifyPlayer.togglePlay().then();
  };

  const onToggleShuffle = async () => {
    const { shuffle, paused, repeat }  = getStore();

    setPlayState({
      paused: paused,
      shuffle: !shuffle,
      repeat: repeat,
    });
    SpotifyPlayer.toggleShuffle(!shuffle).then();
  };

  const onChangeRepeat = async () => {
    const { shuffle, paused, repeat }  = getStore();
    const repeatMode = repeat === 2 ? 0 : 2;

    setPlayState({
      paused: paused,
      shuffle: shuffle,
      repeat: repeatMode,
    });
    await SpotifyPlayer.toggleRepeat(repeatMode);
  };

  const onPauseTrack = () => {
    SpotifyPlayer.pauseTrack().then();
  }

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
    onPauseTrack,
    onToggleShuffle,
    onChangeRepeat
  }
};