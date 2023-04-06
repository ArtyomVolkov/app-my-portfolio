import React from 'react';
import { useSelector } from 'react-redux';

import Albums from '../../components/albums';

import { IStore } from '../../store';
import albumsActions from '../../store/actions/albums';

const AlbumsPage = () => {
  const albums = useSelector((store: IStore) => store.albums);

  return (
    <Albums
      albums={albums}
      actions={albumsActions}
    />
  );
}

export default AlbumsPage;
