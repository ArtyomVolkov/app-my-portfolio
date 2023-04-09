import React from 'react';
import { useSelector } from 'react-redux';

import Playlist from '../../../components/playlists/playlist';

import playListActions from '../../../store/actions/playlists';
import { IStore } from '../../../store';

const PlayList = () => {
  const activePlaylist = useSelector((store: IStore) => store.playlists.activePlaylist);

  return (
    <Playlist
      loading={activePlaylist.loading}
      playlist={activePlaylist.playlist}
      tracks={activePlaylist.tracks}
      actions={playListActions}
    />
  );
}

export default PlayList;