import React from 'react';
import { useSelector } from 'react-redux';

import Artist from '../../../components/artists/artist';

import { IStore } from '../../../store';
import artistsActions from '../../../store/actions/artists';

const ArtistPage = ({ backButtonText }) => {
  const artist = useSelector((store: IStore) => store.artists.activeArtist);

  return (
    <Artist
      artist={artist}
      actions={artistsActions}
      backButtonText={backButtonText}
    />
  );
}

export default ArtistPage;
