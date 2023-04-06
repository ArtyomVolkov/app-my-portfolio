import React from 'react';
import { useSelector } from 'react-redux';

import ArtistAlbum from '../../../components/albums/album';

import { IStore } from '../../../store';
import albumsActions from '../../../store/actions/albums';

const Album = () => {
  const activeAlbum = useSelector((store: IStore) => store.albums.activeAlbum);

  return (
    <ArtistAlbum
      loading={activeAlbum.loading}
      album={activeAlbum.album}
      tracks={activeAlbum.tracks}
      actions={albumsActions}
      backButtonText="Back to Albums page"
    />
  )
}

export default Album;