import { transferPlayback } from '../../api/player';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import store from '../../store';
import { actions } from '../reducers/player';

import SpotifyPlayer from '../../services/spotify-player';

const onTogglePlay = () => {
  SpotifyPlayer.togglePlay().then();
};

const onPauseTrack = () => {
  SpotifyPlayer.pauseTrack().then();
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

const onToggleShuffle = async () => {
  const { shuffle, paused, repeat } = store.getState().player;

  store.dispatch(actions.setPlayState({
    paused: paused,
    shuffle: !shuffle,
    repeat: repeat,
  }));
  SpotifyPlayer.toggleShuffle(!shuffle).then();
};

const onChangeRepeat = async () => {
  const { shuffle, paused, repeat } = store.getState().player;
  const repeatMode = repeat === 2 ? 0 : 2;

  store.dispatch(actions.setPlayState({
    paused: paused,
    shuffle: shuffle,
    repeat: repeatMode,
  }));
  await SpotifyPlayer.toggleRepeat(repeatMode);
};

const setTransferPlayback = async (id) => {
  const { deviceId } = store.getState().player;

  await transferPlayback(id);
  if (!deviceId) {
    store.dispatch(actions.setInitialize());
  }
};

const setPlaybackChange = (data) => {
  if (!data) {
    return;
  }
  const { initialized, track } = store.getState().player;

  if (!initialized) {
    store.dispatch(actions.setInitialize());
  }
  if (data.loading || track?.loading || !data.track_window.current_track) {
    return;
  }
  // TODO: prevent double update (check data props); check fast track select
  store.dispatch(
    actions.setPlayState({
      paused: data.paused,
      shuffle: data.shuffle,
      repeat: data.repeat_mode
    })
  );
  store.dispatch(
    actions.setTrack({
      id: data.track_window.current_track.id,
      uri: data.track_window.current_track.uri,
      loading: data.loading,
      position: data.position,
      duration: data.duration,
      name: data.track_window.current_track.name,
      artists: getTrackArtists(data.track_window.current_track.artists),
      album: {
        name: data.track_window.current_track.album.name,
        image: getImageSrc(data.track_window.current_track.album.images, 300)
      },
    })
  );
};

export default {
  setTransferPlayback,
  setPlaybackChange,
  onTogglePlay,
  onToggleShuffle,
  onChangeRepeat,
  onPauseTrack,
  onPlayNext,
  onPlayPrevious,
  onChangeVolume,
  onChangeSeek
}