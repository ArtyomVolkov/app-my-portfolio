import React, { useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import PlaylistPlayRoundedIcon from '@mui/icons-material/PlaylistPlayRounded';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';

import ScrollViewGradient from '@shared/components/scroll-view';
import Loader from '../../../../components/loader';
import Header from '../../../../components/header';
import TrackList from '../../../../components/track-list';
import MediaBanner from '../../../../components/cards/media-banner';

import { useArtistAlbum } from '../../../../store/artist-album';
import { useArtistAlbumActions } from '../../../../store/actions/artist-album';

import styles from './style.module.scss';

interface IArtistAlbum {
  backButtonText?: string
}

const ArtistAlbum: React.FC<IArtistAlbum> = ({ backButtonText }) => {
  const params = useParams<{ artistId: string, albumId: string }>();
  const { onFetchData, onSetPlayTrack } = useArtistAlbumActions();
  const { loading, album, tracks } = useArtistAlbum();

  useEffect(() => {
    onFetchData(params.albumId).then();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (!album || !tracks) {
      return null;
    }
    return (
      <>
        <MediaBanner image={album.image} title={album.name} className={styles.header}>
          <label className={styles.label}>{ album.label }</label>
          <div className={styles.details}>
            <div className={styles.tracksCount}>
              <PlaylistPlayRoundedIcon />
              <label>{ `${album.totalTracks} Tracks` }</label>
            </div>
            <div className={styles.releaseDate}>
              <InsertInvitationRoundedIcon />
              <span>{ moment(album.releaseDate).format('LL') }</span>
            </div>
          </div>
        </MediaBanner>
        <div className={styles.tracks}>
          <p className={styles.title}>Tracks</p>
          <TrackList
            data={tracks}
            trackNamePriority="track"
            onSetPlayTrack={onSetPlayTrack}
          />
        </div>
      </>
    );
  };

  return (
    <div className={styles.artistAlbum}>
      <Header title={backButtonText || `Back to Artist's Albums`} useHistory />
      <div className={styles.body}>
        <ScrollViewGradient gateHeight={30}>
          {
            renderContent()
          }
        </ScrollViewGradient>
      </div>
    </div>
  );
}

export default ArtistAlbum;
