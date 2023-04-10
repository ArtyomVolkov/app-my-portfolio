import React from 'react';
import { useSelector } from 'react-redux';

import ArtistAlbum from '../../../../components/artists/artist/album';

import { IStore } from '../../../../store';
import artistsActions from '../../../../store/actions/artists';

interface IArtistAlbum {
  backButtonText?: string
}

const Album: React.FC<IArtistAlbum> = ({ backButtonText }) => {
  const activeArtistAlbum = useSelector((store: IStore) => store.artists.activeArtistAlbum);

  return (
    <ArtistAlbum
      album={activeArtistAlbum}
      backButtonText={backButtonText}
      actions={artistsActions}
    />
  );
}

export default Album;
