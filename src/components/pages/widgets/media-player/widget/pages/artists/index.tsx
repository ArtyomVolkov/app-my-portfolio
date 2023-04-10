import React from 'react';
import { useSelector } from 'react-redux';

import Artists from '../../components/artists';

import { IStore } from '../../store';
import artistsActions from '../../store/actions/artists';

const ArtistsPage = () => {
  const artists = useSelector((store: IStore) => store.artists);

  return (
    <Artists
      artists={artists}
      actions={artistsActions}
    />
  );
}

export default ArtistsPage;
