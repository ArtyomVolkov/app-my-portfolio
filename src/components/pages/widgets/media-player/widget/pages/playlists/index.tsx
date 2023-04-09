import React from 'react';
import { useSelector } from 'react-redux';

import Playlists from '../../components/playlists';

import playListsActions from '../../store/actions/playlists';
import { IStore } from '../../store';

const PlayListsPage = () => {
  const playlists = useSelector((store: IStore) => store.playlists);

  return (
    <Playlists
      playlists={playlists}
      actions={playListsActions}
    />
  );
}

export default PlayListsPage;
